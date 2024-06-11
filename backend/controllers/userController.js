const ApiFeatures = require("../utils/apiFeatuers")
const User = require("../Models/userModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail.js")
const cloudinary = require("cloudinary")
const crypto = require("crypto")
//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars", 
        width: 150,
        crop: "scale"
    })
    
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }
    });
    sendToken(user, 201, res)
})

//login user
exports.loginUser = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body
        console.log(email,password)
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & password", 400))
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorHandler("Invalid Email and Password", 401))
        }
        const isPasswordMatched = await user.comparePassword(password)
        
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email and Password", 401))
        }
        sendToken(user, 200, res);
    }
)
//log out 

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
})

//logout password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.email) {
        return next(new ErrorHandler("Please Enter Email", 500));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.FRONTENT_URL}/password/reset/${resetToken}`;
    const message = `Your password Reset Token is  :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it`;
    try { 
        await sendEmail({
            email: user.email,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    
    const resetPasswordToken = crypto 
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
   
    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.json({success:true})
    sendToken(user, 200, res);
});


//user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

//update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesnot match", 400))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res)

})

//update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const img_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(img_id);
        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar);
        newUserData.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });
    await user.save();
    res.status(200).json({
        success: true
    })

})

//get all users(admin)

exports.getAlluser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})


//get single user detail (admin)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User does not exist with id: " + req.params.id))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//update role (admin)

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    await user.save();
    res.status(200).json({
        success: true
    })

})

//delete user profile

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User does not exit with id: " + req.params.id))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })

})


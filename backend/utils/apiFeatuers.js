class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword })

        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        let parseQuery = JSON.parse(queryStr)
    //     const $gte = parseQuery.price.$gte;
    //     const $lte = parseQuery.price.$lte
    //    parseQuery.price.$gte = Number($gte)
    //    parseQuery.price.$lte = Number($lte)
        
        
        this.query = this.query.find(parseQuery);

        return this;
    }

    pagination(resultPerpage) {
        const currentpage = Number(this.queryStr.page) || 1;
        const skip = resultPerpage * (currentpage - 1);
        this.query = this.query.limit(resultPerpage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures;
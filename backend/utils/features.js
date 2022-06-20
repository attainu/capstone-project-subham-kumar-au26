class ApiFeatures {

    /*<--Find product by thier values-->*/
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{}
        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}

        // Remove other fields instead of category
        const removeFields = ['keyword','page','limit'];

        removeFields.forEach(key=>delete queryCopy[key]);

        // filter with price range with mongo aggregation key $gt & $lt
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryCopy));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }
}; 

module.exports = ApiFeatures
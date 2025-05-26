import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }, 
    description : {
        type : String,
    },
    baseUrl : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;

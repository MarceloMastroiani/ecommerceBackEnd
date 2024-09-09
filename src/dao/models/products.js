import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const collection = "Products";

const schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  thumnbnails: {
    type: [String],
    require: true,
  },
  owner: {
    type: String,
    default: "admin",
  },
});

schema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collection, schema);
export default productsModel;

import mongoose from "mongoose";

const { Schema } = mongoose;

const collection = "Carts";

const schema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

schema.pre("find", function () {
  this.populate("products.product");
});
schema.pre("findOne", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;

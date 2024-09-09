import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    enum: ["usuario", "premium", "admin"],
    default: "usuario",
  },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  },
  last_connection: {
    type: Date,
    default: null,
  },
  profile_picture: {
    type: String,
    default: "",
  },
});

schema.pre("find", function () {
  this.populate("cart");
});
schema.pre("findOne", function () {
  this.populate("cart");
});

const userModel = mongoose.model(collection, schema);

export default userModel;

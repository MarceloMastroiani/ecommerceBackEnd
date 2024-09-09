import mongoose from "mongoose";

const { Schema } = mongoose;

const collection = "Ticket";

const schema = new Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
  },
});

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;

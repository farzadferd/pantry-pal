import mongoose from 'mongoose';

// Define the PantryItem schema
const PantryItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: String,
  expiration: Date
});

const PantryItem = mongoose.model('PantryItem', PantryItemSchema);

export default PantryItem;

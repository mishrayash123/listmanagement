import mongoose from 'mongoose';

const CustomPropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    defaultValue: { type: String, required: true }
  });
  
  const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    customProperties: [CustomPropertySchema]
  });

 const ListModel = mongoose.model('Lists', ListSchema);

export default ListModel;
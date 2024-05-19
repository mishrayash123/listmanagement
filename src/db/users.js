import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true,unique:true },
  name: { type: String, required: true },
  city: { type: String },
});

 export const UserModel = mongoose.model('User', UserSchema);

// User Actions
 export const getUsers = () => UserModel.find();
 export const getUserByEmail = (email) => UserModel.findOne({ email });
 export const getUserById = (id) => UserModel.findById(id);
 export const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
 export const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
 export const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);



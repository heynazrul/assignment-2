import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema] },
});

// pre middleware

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // password hashing then save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post middleware
userSchema.post('save', function () {
  console.log(this);
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

userSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

export const User = model<TUser, UserModel>('User', userSchema);

import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();

  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserIntoDB = async (id: number, user: User) => {
  const result = await UserModel.findOneAndUpdate({ userId: id }, user, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await UserModel.findOneAndDelete({ userId: id });
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB
};

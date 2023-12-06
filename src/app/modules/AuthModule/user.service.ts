import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  // create the user to database
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );

  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({ userId: id });
  return result;
};

const updateUserIntoDB = async (id: number, user: TUser) => {
  const result = await User.findOneAndUpdate({ userId: id }, user, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};

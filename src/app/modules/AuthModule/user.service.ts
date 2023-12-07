import { TOrder, TUser } from './user.interface';
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
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );

  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const userExist = await User.isUserExists(id);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.findOne(
    { userId: id },
    {
      _id: 0,
      isDeleted: 0,
    },
  );
  return result;
};

const updateUserIntoDB = async (id: number, user: TUser) => {
  const userExist = await User.isUserExists(id);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.findOneAndUpdate({ userId: id }, user, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    throw new Error('User not found!');
  }

  const result = await User.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const addNewProductToOrder = async (userId: number, newOrders: TOrder) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: newOrders,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
  return result;
};

const getAllOrdersOfSingleUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

const calculateSingleUserTotalPriceOfOrders = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.aggregate([
    //stage 1 find user
    { $match: { userId } },
    //stage 2 get orders
    { $unwind: '$orders' },
    // stage 3 calculate total price
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    //stage 4
    { $project: { _id: 0, totalPrice: 1 } },
  ]);

  if (result.length === 0) {
    throw new Error('No orders found for this user');
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductToOrder,
  getAllOrdersOfSingleUserFromDB,
  calculateSingleUserTotalPriceOfOrders,
};

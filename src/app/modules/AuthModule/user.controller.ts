import { Request, Response } from 'express';
import { UserServices } from './user.service';

import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    //data validation using zod

    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    let errorMessage = err.message;
    let errorCode = err.code;

    if (err.issues && Array.isArray(err.issues)) {
      errorCode = err.issues[0].code;
      errorMessage = err.issues[0].message;
    }
    res.status(500).json({
      success: false,
      message: 'User creation failed!',
      error: {
        code: err.code || errorCode || 404,
        description: errorMessage,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Users fetch failed!',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (isNaN(Number(userId))) {
      throw new Error('Invalid user id');
    }
    const result = await UserServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userUpdatedData = req.body;

    // const userUpdateSchema = userValidationSchema.partial();
    // const zodParsedData = userUpdateSchema.parse(userUpdatedData);
    const result = await UserServices.updateUserIntoDB(
      Number(userId),
      userUpdatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User update failed',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //delete user
    await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User delete failed',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orders } = req.body;
    await UserServices.addNewProductToOrder(Number(userId), orders);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Order creation failed!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getAllOrdersOfSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrdersOfSingleUserFromDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Orders fetch failed!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.calculateSingleUserTotalPriceOfOrders(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addNewOrder,
  getAllOrdersOfSingleUser,
  getTotalPriceOfOrders,
};

import { Request, Response } from 'express';
import { UserServices } from './user.service';

import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    //data validation using zod

    const { user: userData } = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User fetch failed!',
      error: err,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userUpdatedData } = req.body;

    const result = await UserServices.updateUserIntoDB(
      Number(userId),
      userUpdatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User update failed!',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};

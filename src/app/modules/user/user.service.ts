import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserProfileFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUserProfileFromDB = async (userId: string, payload: TUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const fields = [
    'name',
    'email',
    'phone',
    'age',
    'address',
    'isDiabetes',
    'gender',
    'bloodGroup',
  ];

  // Check if the fields exist and are not undefined
  const completedFields = fields.filter((field) => {
    const value = payload[field as keyof TUser];
    return value !== undefined && value !== null; // Count if value is not undefined or null
  }).length;

  const profileCompleteStatus = (completedFields / fields.length) * 100;
  const updatedData = {
    ...payload,
    profileCompleteStatus,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });
  return updatedUser;
};
export const UserServices = {
  getAllUsersFromDB,
  getUserProfileFromDB,
  updateUserProfileFromDB,
};

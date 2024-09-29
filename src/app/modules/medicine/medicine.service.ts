import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TMedicine } from './medicine.interface';
import { Medicine } from './medicine.model';

const addMedicineIntoDB = async (payload: TMedicine) => {
  const result = await Medicine.create(payload);
  return result;
};

const getUserMedicinesFromDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const medicines = await Medicine.find({ userId });

  return medicines;
};

const RemoveUserMedicineFromDB = async (id: string) => {
  const medicine = await Medicine.findById(id);
  if (!medicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found');
  }
  const result = await medicine.deleteOne();
  return result;
};
export const MedicineServices = {
    addMedicineIntoDB,
    getUserMedicinesFromDB,
    RemoveUserMedicineFromDB
};
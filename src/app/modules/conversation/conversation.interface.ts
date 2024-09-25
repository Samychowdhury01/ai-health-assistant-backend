import { Types } from 'mongoose';

export type TConversation = {
  userId: Types.ObjectId;
  messages?: Types.ObjectId[];
};


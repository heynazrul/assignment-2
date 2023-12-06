import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number; //unique
  username: string; //unique
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders ?: TOrder[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}



// export type UserMethod = {
//   isUserExists: (userId: number) => Promise<TUser | null>;
// };

// export type UserModel = Model<TUser, Record<string, never>, UserMethod>;

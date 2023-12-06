import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, 'Street is required.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
});

const orderValidationSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  price: z.number().min(0, 'Price must be a non-negative number.'),
  quantity: z.number().min(0, 'Quantity must be a non-negative number.'),
});

const userValidationSchema = z.object({
  userId: z.number().min(1, 'User ID must be a positive number.'),
  username: z.string().min(1, 'Username is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  fullName: fullNameValidationSchema,
  age: z.number().min(0, 'Age must be a non-negative number.'),
  email: z.string().email('Invalid email format.'),
  isActive: z.boolean(),
  hobbies: z.array(z.string(), { required_error: 'Hobbies are required.' }),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;

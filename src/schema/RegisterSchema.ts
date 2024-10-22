import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string({ required_error: 'Please enter email' }).email({ message: 'Enter valid email' }),
  companyName: z.string({ required_error: 'Please enter Your company name' }),
    // .email({ message: 'Enter valid email' }),
  password: z.string({ required_error: 'Please enter Your password'  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

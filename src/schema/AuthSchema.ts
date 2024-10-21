import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: 'Please enter email' }),
    // .email({ message: 'Enter valid email' }),
  password: z.string({ required_error: 'Please enter Your password'  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

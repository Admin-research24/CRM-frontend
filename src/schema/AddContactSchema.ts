import { z } from "zod";

export const addContactSchema = z.object({
  email: z
    .string({ required_error: "Please enter email" })
    .email({ message: "Enter valid email" }),
  first_name: z.string({ required_error: "Please enter Your first name" }),
  last_name: z.string({ required_error: "Please enter Your last name" }),

  company_name: z.string({ required_error: "Please enter Your company name" }),
  job_title: z.string({ required_error: "Please enter Your job title" }),
  mobile: z
    .string({ required_error: "Please enter Your mobile" })
    .min(10)
    .max(14),
  // work_number: z.string(),
  sales_owner: z.string({ required_error: "please select sales owner" }),
  status: z.string({ required_error: "please select status" }),
});

export type CreateContact = z.infer<typeof addContactSchema>;

export const updateContactSchema = z.object({
  email: z
    .string({ required_error: "Please enter email" })
    .email({ message: "Enter valid email" }),
  first_name: z.string({ required_error: "Please enter Your first name" }),
  last_name: z.string({ required_error: "Please enter Your last name" }),

  company_name: z.string({ required_error: "Please enter Your company name" }),
  job_title: z.string({ required_error: "Please enter Your job title" }),
  mobile: z
    .string({ required_error: "Please enter Your mobile" })
    .min(10)
    .max(14),
  work_number: z.string(),
  sales_owner: z.string({ required_error: "please select sales owner" }),
  status: z.string({ required_error: "please select status" }),
});

export type UpdateContactInput = z.infer<typeof updateContactSchema>;

import { z } from "zod";

export const addCompanySchema = z.object({
  company_name: z.string({ required_error: "Please enter Your company name" }),
  website: z.string({ required_error: "Please enter Your job title" }).url(),
  industry_type: z.string({ required_error: "please select industry type" }),
  employees_count: z.string({
    required_error: "please select employees count",
  }),
  status: z.string({ required_error: "please select status" }),
  mobile: z
    .string({ required_error: "Please enter Your mobile" })
    .min(10)
    .max(10),
  sales_owner: z.string({ required_error: "please select sales owner" }),
  business_type: z.string({required_error:"please select business type"}),
});

export type CreateCompany = z.infer<typeof addCompanySchema>;

export const updateCompanySchema = z.object({
  company_name: z.string({ required_error: "Please enter Your company name" }),
  website: z.string({ required_error: "Please enter Your job title" }).url(),
  industry_type: z.string({ required_error: "please select industry type" }),
  employees_count: z.string({
    required_error: "please select employees count",
  }),
  status: z.string({ required_error: "please select status" }),
  mobile: z
    .string({ required_error: "Please enter Your mobile" })
    .min(10)
    .max(10),
  sales_owner: z.string({ required_error: "please select sales owner" }),
  //   status: z.string({ required_error: "please select status" }),
  business_type: z.string({required_error:"please select business type"}),

});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

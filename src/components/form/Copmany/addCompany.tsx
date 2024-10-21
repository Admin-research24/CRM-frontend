import { useForm } from "react-hook-form";
import { Button } from "../../ui/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/ui/form";
import { Input } from "../../ui/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/ui/select";
import {
  createContactAsync,
  // getContactListAsync,
} from "../../../store/slices/contact";
import { useAppDispatch } from "../../../store/Hooks";
import {
  addCompanySchema,
  CreateCompany,
} from "../../../schema/AddCompanySchema";

export const AddCompanyFrom = () => {
  const dispatch = useAppDispatch();

  const form = useForm<CreateCompany>({
    resolver: zodResolver(addCompanySchema),
    defaultValues: {
      website: "",
      company_name: "",
      industry_type: "",
      mobile: "",
      // work_number: work_number.toString() || "",
      sales_owner: "",
      employees_count: "",
      business_type: "",
    },
  });
  const resetForm = () => {
    // setImagePreview(null);
    form.setValue("company_name", "");
    form.setValue("website", "");
    form.setValue("industry_type", "");
    form.setValue("sales_owner", "");
    form.setValue("mobile", "");
    form.setValue("employees_count", "");
    form.setValue("business_type", "");

    form.reset();
  };
  const onSubmit = async (data: CreateCompany) => {
    const formData = new FormData();

    formData.append("company_name", data.company_name);
    formData.append("industry_type", data.industry_type);
    formData.append("mobile_no", data.mobile);
    formData.append("website", data.website);
    formData.append("owner", data.sales_owner);
    formData.append("employees_count", data.employees_count);
    formData.append("business_type", data.business_type);

    dispatch(createContactAsync(formData)).then(() => {
      const closeModalButton = document.getElementById("close-modal");
      if (closeModalButton) {
        closeModalButton.click();
      }
      // dispatch(getContactListAsync());
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl defaultValue={field.value}>
                <Input
                  className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl defaultValue={field.value}>
                <Input
                  className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile no.</FormLabel>
              <FormControl defaultValue={field.value}>
                <Input
                  className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  type="number"
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="sales_owner"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales owner Name</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sales owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prateek">Prateek</SelectItem>
                    <SelectItem value="anurag">anurag</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="industry_type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry type</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => field.onChange(value)} // Correctly handle the value change
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry type " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Solutions">
                      Tech Solutions
                    </SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="employees_count"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Of Employees</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Click to select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1001-5000">1001-5000</SelectItem>
                    <SelectItem value="5001-10000">5001-10000</SelectItem>
                    <SelectItem value="10000+">10000+</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="business_type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Click to select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Analyts</SelectItem>
                    <SelectItem value="false">Competitor</SelectItem>
                    <SelectItem value="false">Customer</SelectItem>
                    <SelectItem value="false">Integrator</SelectItem>
                    <SelectItem value="false">Investor</SelectItem>
                    <SelectItem value="false">Partner</SelectItem>
                    <SelectItem value="false">Press</SelectItem>
                    <SelectItem value="false">Prospect</SelectItem>
                    <SelectItem value="false">Reseller</SelectItem>
                    <SelectItem value="false">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex items-center gap-5">
          <Button
            className="bg-primary text-white"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Save
          </Button>
          <Button
            className="bg-secondary-foreground text-white"
            disabled={!form.formState.isValid}
            onClick={() => resetForm()}
            type="button"
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
};
{
  /* <FormField
          //   control={form.control}
          name="work_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work no.</FormLabel>
              <FormControl defaultValue={field.value}>
                <Input
                  className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */
}

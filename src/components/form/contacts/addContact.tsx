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
  addContactSchema,
  CreateContact,
} from "../../../schema/AddContactSchema";
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
import { toast } from "react-toastify";

export const AddContact = () => {
  const dispatch = useAppDispatch();

  const form = useForm<CreateContact>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      job_title: "",
      mobile: "",
      // work_number: work_number.toString() || "",
      // sales_owner: "",
      status: "",
    },
  });
  const resetForm = () => {
    // setImagePreview(null);
    form.setValue("first_name", "");
    form.setValue("last_name", "");
    form.setValue("company_name", "");
    form.setValue("email", "");
    form.setValue("job_title", "");
    // form.setValue("sales_owner", "");
    form.setValue("mobile", "");
    form.setValue("status", "");

    form.reset();
  };
  const onSubmit = async (data: CreateContact) => {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("company_name", data.company_name);
    formData.append("job_title", data.job_title);
    formData.append("mobile_no", data.mobile);
    formData.append("email", data.email);
    // formData.append("owner", data.sales_owner);
    formData.append("status", data.status);

    dispatch(createContactAsync(formData)).then(() => {
      toast.success("Contact added successfully");
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          name="company_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => field.onChange(value)} // Correctly handle the value change
                  >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Solution">Tech Solution</SelectItem>
                  </SelectContent>
                </Select>
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
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
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
        {/* <FormField
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
                    <SelectItem value="Rajesh">anurag</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
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
        />
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

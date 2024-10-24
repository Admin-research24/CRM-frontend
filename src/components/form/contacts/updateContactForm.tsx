import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/ui/select';
import { Input } from '../../ui/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../ui/ui/button';
import { UpdateContactInput, updateContactSchema } from '../../../schema/AddContactSchema';
import { Contact, selectContactLoading, updateContactAsync } from '../../../store/slices/contact';
import { useAppDispatch, useAppSelector } from '../../../store/Hooks';


interface IProps {
  contact: Contact;
}

export default function UpdateContactForm({ contact }: IProps) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectContactLoading);

  const {
    first_name,
    last_name,
    email,
    job_title,
    company_name,
    mobile_no,
    // owner,
    status,
  } = contact;
  const form = useForm<UpdateContactInput>({
    resolver: zodResolver(updateContactSchema),
    mode: 'onChange',
    defaultValues: {
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
      company_name: company_name || '',
      job_title: job_title || '',
      mobile: mobile_no || '',
      // sales_owner: owner || '',
      status: status || '',
    },
  });

  const onSubmit = async (data: UpdateContactInput) => {
    const formData = new FormData();

    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('company_name', data.company_name);
    formData.append('job_title', data.job_title);
    formData.append('mobile_no', data.mobile);
    formData.append('status', data.status);

    try {
        await dispatch(updateContactAsync({ form: formData, Id: contact._id }));
        form.reset(); // Reset the form if needed
        const closeModalButton = document.getElementById('close-modal');
        if (closeModalButton) {
            closeModalButton.click();
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};


  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>first Name</FormLabel>
              <FormControl>
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
              <FormControl>
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
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech solutions">Tech Solutions</SelectItem>

                  </SelectContent>
                </Select>
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
              <FormControl>
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
              <FormControl>
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
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                  type="tel"  // Change to 'tel' for phone number
                  placeholder="Enter mobile number"
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

        <div className="flex items-center gap-4 justify-between"></div>

        <div className="flex gap-5">
          <Button
            className="bg-primary text-white"
            disabled={loading } 
            type="submit"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            className="bg-secondary-foreground text-white "
            disabled={!form.formState.isValid}
            // onClick={() =>
            //   form.reset({
            //     offerName: '',
            //     offerDescription: '',
            //     offerCategoryId: '',
            //     offerTypeSelect: '',
            //     offerType: '',

            //     offerImage: new File([], ''),
            //   })
            // }
            type="button"
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
}

{/* <FormField
          name="offerImage"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Offer Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={e => onImageChange(e)}
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                />
              </FormControl>
              {imagePreview && (
                <img
                  src={URL.createObjectURL(imagePreview)}
                  alt="Image Preview"
                  style={{ maxWidth: '30%', marginTop: '10px' }}
                />
              )}
              {image && !imagePreview && (
                <img
                  src={image}
                  alt="Existing Image"
                  style={{ maxWidth: '30%', marginTop: '10px' }}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
import {  useEffect} from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/hook';
import { zodResolver } from '@hookform/resolvers/zod';
// import { UpdateOfferInput, updateOfferSchema } from '../../schema/OfferSchema';
// import {
//   Offer,
//   getOfferListAsync,
//   getOfferListCategoryAsync,
//   selectOfferLoading,
//   updateOfferAsync,
// } from '../../store/slices/offers';
// import { getAllBrandsAsync, selectBrandList } from '../../store/slices/brands';
import { LoadingBtn } from '../../common/LoadingBtn';
import { Button } from '../../ui/ui/button';
import { UpdateContactInput, updateContactSchema } from '../../../schema/AddContactSchema';
import { Contact, selectContactLoading } from '../../../store/slices/contact';
import { useAppDispatch, useAppSelector } from '../../../store/Hooks';
// import {
//   getAllCategoryAndSubcategoryAsync,
//   getParentCategoriesAsync,
//   selectCategoryAndParentCategory,
// } from '../../store/slices/categories';

interface IProps {
  contact: Contact;
}

export default function UpdateContactForm({ contact }: IProps) {
  const dispatch = useAppDispatch();
//   const [imagePreview, setImagePreview] = useState<File | null>(null);
//   const offercategoriesList = useAppSelector(
//     state => state.offers.offerCategories,
//   );
//   const brandList = useAppSelector(selectBrandList);
//   const categoryAndParentList = useAppSelector(selectCategoryAndParentCategory);

  const loading = useAppSelector(selectContactLoading);

  const {
    first_name,
    last_name,
    email,
job_title,
    company_name,
    mobile_no,
    owner,
    status,
  } =contact;
  const form = useForm<UpdateContactInput>({
    resolver: zodResolver(updateContactSchema),
    defaultValues: {
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
      company_name: company_name || '',
      job_title: job_title || '',
      mobile: mobile_no || '',
      sales_owner: owner || '',
      status: status || '',
    },
  });

  const onSubmit = async (data: UpdateContactInput) => {
    const formData = new FormData();

    formData.append('first_name', data.first_name);
    // if (imagePreview) formData.append('image', imagePreview);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('company_name', data.company_name);
    formData.append('job_title', data.job_title);
    formData.append('mobile_no', data.mobile);
    formData.append('owner', data.sales_owner);
    formData.append('status', data.status);


    // dispatch(updateOfferAsync(formData)).then(() => {
    //   const closeModalButton = document.getElementById('close-modal');
    //   if (closeModalButton) {
    //     closeModalButton.click();
    //   }
    //   dispatch(getContactListAsync());
    // });
  };

//   const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImagePreview(event.target.files[0]);
//     }
//   };

//   useEffect(() => {
//     dispatch(getParentCategoriesAsync());
//     dispatch(getAllCategoryAndSubcategoryAsync({}));
//     // dispatch(Fetch(API_URL.GET_ALL_PARENT_CATEGORY));
//     // dispatch(Fetch(API_URL.GET_ALL_CATEGORY_AND_SUBCATEGORY));
//   }, [dispatch]);

  useEffect(() => {
    // dispatch(getAllBrandsAsync());
    // dispatch(getOfferListCategoryAsync());
  }, [dispatch]);

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
          name="sales_owner"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales owner Name</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                //   onValueChange={category => field.onChange(category)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {offercategoriesList.map(category => ( */}
                      <SelectItem value="prateek"
                    //   key={category._id} value={category._id}
                      >
                        Prateek
                      </SelectItem>
                      <SelectItem value="anurag"
                    //   key={category._id} value={category._id}
                      >
                        anurag
                      </SelectItem>
                    {/* ))} */}
                  </SelectContent>
                </Select>
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
                //   onValueChange={category => field.onChange(category)}
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
                  type="number"
                  maxLength={10}
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
                //   onValueChange={category => field.onChange(category)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">true</SelectItem>
                    <SelectItem value="product">false</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center gap-4 justify-between"></div>

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
        <div className="flex gap-5">
          <LoadingBtn isLoading={loading} value="Save" />

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

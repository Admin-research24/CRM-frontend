

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
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/hook';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { UpdateOfferInput, updateOfferSchema } from '../../schema/OfferSchema';
// import {
//   Offer,
//   getOfferListAsync,
//   getOfferListCategoryAsync,
//   selectOfferLoading,
//   updateOfferAsync,
// } from '../../store/slices/offers';
// import { getAllBrandsAsync, selectBrandList } from '../../store/slices/brands';
// import { LoadingBtn } from '../../common/LoadingBtn';
import { Button } from '../../ui/ui/button';
// import { UpdateContactInput, updateContactSchema } from '../../../schema/AddContactSchema';
// import { Contact, selectContactLoading } from '../../../store/slices/contact';
// import { useAppDispatch } from '../../../store/Hooks';
// import {
//   getAllCategoryAndSubcategoryAsync,
//   getParentCategoriesAsync,
//   selectCategoryAndParentCategory,
// } from '../../store/slices/categories';

// interface IProps {
//     // contact: Contact;
// }

export default function EditContactShemaFrom() {
    // const dispatch = useAppDispatch();
   

    // const loading = useAppSelector(selectContactLoading);

    // const {
    //     first_name,
    //     internal_name,
    //     field_type,
    //     tool_tip,
    //     placeholder_text,
    //     group_subgroup,
    //     owner,
    //     status,
    // } = contact;
    const form = useForm({
        // resolver: zodResolver(),
        // defaultValues: {
        //     first_name: first_name || '',
        //     internal_name: internal_name || '',
        //     field_type: field_type || '',
        //     tool_tip: tool_tip || '',
        //     placeholder_text: placeholder_text || '',
        //     group_subgroup: group_subgroup|| '',
        //     // sales_owner: owner || '',
        //     // status: status || '',
        // },
    });

    // const onSubmit = async (data) => {
        // const formData = new FormData();

        // formData.append('first_name', data.first_name);
        // formData.append('last_name', data.internal_name);
        // formData.append('email', data.field_type);
        // formData.append('company_name', data.tool_tip);
        // formData.append('job_title', data.placeholder_text);
        // formData.append('mobile_no', data.group_subgroup);
        // formData.append('owner', data.sales_owner);
        // formData.append('status', data.status);


        // dispatch(updateOfferAsync(formData)).then(() => {
        //   const closeModalButton = document.getElementById('close-modal');
        //   if (closeModalButton) {
        //     closeModalButton.click();
        //   }
        //   dispatch(getContactListAsync());
        // });
    // };

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

    // useEffect(() => {
    //     // dispatch(getAllBrandsAsync());
    //     // dispatch(getOfferListCategoryAsync());
    // }, [dispatch]);

    return (
        <Form {...form}>
            <form className="space-y-4" 
            // onSubmit={form.handleSubmit(onSubmit)}
            >
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
                    name="internal_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interna name</FormLabel>
                            <FormControl>
                                <Input
                                    className="ring-ring  h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="field_type"
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
                    name="Tool_tip"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tool Tip</FormLabel>
                            <FormControl>
                            <Input
                                    className="ring-ring  h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    name="placeholder_text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placeholder Text</FormLabel>
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
                    name="Group_subGroup"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group or sub-group</FormLabel>
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
                    {/* <LoadingBtn isLoading={loading} value="Save" /> */}

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

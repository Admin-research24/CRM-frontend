// contact.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { createContact, deleteContact, getAllCOntact, getCrmHeaderFeild, importContactField, ImportContactFieldData, updateContact, uploadExcelFile } from '../api/contactAPI';

export interface Contact {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  job_title: string;
  mobile_no: string;
  full_name: string;
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  delivery_status_single_mail: any;
  //   sent: {
  //     value: 1,
  //     // sentAt: new Date().toISOString(),
  //   },
  //   opened: {
  //     value: null,
  //     openedAt: null,
  //   },
  //   clicked: {
  //     value: 3,
  //     // clickedAt: new Date().toISOString(),
  //   },
  //   unsubscribed: {
  //     value: 1,
  //     // unsubscribedAt: new Date().toISOString(),
  //   },
  // }, 

}
export interface DeliveryStatus {
  sent: {
    value: number; 
    sentAt?: string; 
  };
  opened: {
    value: number | null; 
    openedAt?: string; 
  };
  clicked: {
    value: number | null; 
    clickedAt?: string; 
  };
  unsubscribed: {
    value: number | null; 
    unsubscribedAt?: string; 
  };
}
interface CrmField {
  name: string;
  field_type: string;
  editable: string;
  value: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface ContactState {
  allContactList: Contact[];
  totalContactGiven: number;
  totalPages: number;
  currentPage: number;
  isContactLoading: boolean;
  ContactMessage: string;
  allCrmfieldList: CrmField[];
  isCrmFieldLoading: boolean;
  CrmFieldMessage: string;
}

const initialState: ContactState = {
  allContactList: [],
  totalContactGiven: 0,
  totalPages: 0,
  currentPage: 1,
  isContactLoading: false,
  ContactMessage: '',
  allCrmfieldList: [],
  isCrmFieldLoading: false,
  CrmFieldMessage: '',
};

export const getContactListAsync = createAsyncThunk(
  'contact/getAllContactList',
  async ({ page, limit, search }: { page: number; limit: number, search:string }) => {
    const res: any = await getAllCOntact(page, limit, search);
    return res.data;
  },
);
export const createContactAsync = createAsyncThunk(
  'contact/createContact',
  async (form: FormData) => {
    const res: any = await createContact(form);
    return res.data;
  },
);

export const deleteContactAsync = createAsyncThunk(
  'cuntact/deleteCustomer',
  async (id: string) => {
    const res: any = await deleteContact(id);
    return res.data;
  },
);
export const updateContactAsync = createAsyncThunk(
  'contact/updateContact',
  async ({ form, Id }: { form: FormData, Id: string }) => {
    const res: any = await updateContact( form, Id);
    return res.data;
  },
);
export const uploadExcelContactAsync = createAsyncThunk(
  'contact/uploadExcelContact',
  async (file: File) => {
    const res: any = await uploadExcelFile(file);
    return res.data;
  }
);

export const getCrmHeaderFieldListAsync = createAsyncThunk(
  'contact/getAllCrnHeaderList',
  async () => {
    const res: any = await getCrmHeaderFeild();
    return res.data;

  },
);

export const importContactFieldAsync = createAsyncThunk(
  'contact/importContactField',
  async (data: ImportContactFieldData) => {
    const res: any = await importContactField(data);
    return res.data;
  }
);
const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactMessage: state => {
      state.ContactMessage = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContactListAsync.pending, state => {
        state.isContactLoading = true;
      })
      .addCase(getContactListAsync.fulfilled, (state, action) => {
        state.allContactList = action.payload.contacts;
        state.totalContactGiven = action.payload.totalContacts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.isContactLoading = false;
      })
      .addCase(getContactListAsync.rejected, state => {
        state.isContactLoading = false;
      })
      .addCase(createContactAsync.rejected, state => {
        state.isContactLoading = false;
      })
      .addCase(createContactAsync.pending, state => {
        state.isContactLoading = true;
      })
      .addCase(createContactAsync.fulfilled, (state, action) => {
        state.allContactList = action.payload.contacts;
        state.isContactLoading = false;
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.allContactList = state.allContactList.filter(
          id => id !== action.payload.data,
        );
        state.ContactMessage = action.payload.message;
        state.isContactLoading = false;
      })
      .addCase(deleteContactAsync.pending, state => {
        state.isContactLoading = true;
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.isContactLoading = false;
        state.ContactMessage = action.error.message || 'Something went wrong';
      })
      .addCase(getCrmHeaderFieldListAsync.pending, state => {
        state.isCrmFieldLoading = true;
      })
      .addCase(getCrmHeaderFieldListAsync.fulfilled, (state, action) => {
        state.allCrmfieldList = action.payload.limitedFieldDataSet;
        state.isCrmFieldLoading = false;
      })
      .addCase(getCrmHeaderFieldListAsync.rejected, state => {
        state.isCrmFieldLoading = false;
      })
      .addCase(updateContactAsync.pending, state => {
        state.isContactLoading = true;
      })  
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        state.allContactList = action.payload.contacts;
        state.isContactLoading = false;
      })
      .addCase(updateContactAsync.rejected, state => {
        state.isContactLoading = false;
      })
      

  },
});

export const selectAllContactGivenList = (state: RootState) => state.contact.allContactList;
export const selectTotalContact = (state: RootState) => state.contact.totalContactGiven;
export const selectTotalPages = (state: RootState) => state.contact.totalPages;
export const selectCurrentPage = (state: RootState) => state.contact.currentPage;
export const selectContactMessage = (state: RootState) => state.contact.ContactMessage;
export const selectContactLoading = (state: RootState) => state.contact.isContactLoading;

export const { clearContactMessage } = ContactSlice.actions;
export default ContactSlice.reducer;

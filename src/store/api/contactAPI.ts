import axios from "axios";
import { API_URL } from "../../constant";
import { useAppDispatch } from "../Hooks";
import { setApiMessage } from "../slices/apiMessage";

export interface ImportContactFieldData {
  matchedFields: Record<string, any>; // Change this to be an object
  responseData: any[];
}
const token = localStorage.getItem('cmsToken');

export function getAllCOntact(page:number, limit:number, search:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_CONTACT_API(page, limit, search),{
          headers: {
            Authorization: `Bearer ${token}`,
            // Admin_id: localStorage.getItem('userId'),
          },
          
        });
        console.log(localStorage.getItem('bearer cmsToken'))
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  // CREATE CONTACT API

  export function createContact(form: FormData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL.POST_ADD_CONTACT_API, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  // DELETE CONTACT API
  
  export function deleteContact(Id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(API_URL.DELETE_CONTACT_API(Id),{
          headers: {
            Authorization: `Bearer ${token}`,
            // Admin_id: localStorage.getItem('userId'),
          },
        });
  
        const dispatch = useAppDispatch();
        dispatch(
          setApiMessage({
            message: 'Deleted Succsess',
            type: 'Success',
          }),
        );
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  // UPLOAD EXCEL API

  export function uploadExcelFile(file: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await axios.post(API_URL.EXCEL_UPLOAD_CONTACT_API, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  // CRM HEADER FIELD API 

  export function getCrmHeaderFeild() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.CRM_FIELD_API,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
        });
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }


  export function importContactField(data: ImportContactFieldData): Promise<{ data: any }> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL.IMPORT_CONTACT_FIELD_API, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }
  

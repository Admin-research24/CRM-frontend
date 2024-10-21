import axios from "axios";
import { API_URL } from "../../constant";
const token = localStorage.getItem('cmsToken');

export function PostNewEmailTemplate(form: FormData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(API_URL.POST_EMAIL_TEMPLATE, form, {
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

  export function GetAllEmailTemplate() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_EMAIL_TEMPLATE, {
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

  export function DeleteEmailTemplate(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(API_URL.DELETE_EMAIL_TEMPLATE(id), {
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

  export function GetSingleEmailTemplate(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(API_URL.GET_SINGLE_EMAIL_TEMPLATE(id), {
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

  export function UpdateEmailTemplate(id: string, form: FormData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(API_URL.UPDATE_EMAIL_TEMPLATE(id), form, {
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


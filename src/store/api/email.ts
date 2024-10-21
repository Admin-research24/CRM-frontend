import axios from "axios";
import { API_URL } from "../../constant";

const token = localStorage.getItem('cmsToken');

export function getConnectMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_CONNECT_MAIL, {
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

// FETCHeMAIL
export function getFetchEMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_FETCH_EMAIL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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

// send Email
export function PostNewEmail(form: FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL.POST_NEW_EMAIL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,

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

// BULK mail
export function PostBulkEmail(form: FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL.POST_BULK_EMAIL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,

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

// inbox
export function getAllInboxMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_INBOX_MAIL, {
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

// drafts
export function getAllDraftMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_DRAFT_MAIL, {
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

// SENT
export function getAllSentMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_SENT_MAIL, {
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

// SPAM
export function getAllSpamMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_SPAM_MAIL, {
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

//ALL-MAIL
export function getAllMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_ALL_MAIL, {
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

// BIN
export function getAllBinMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_BIN_MAIL, {
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

// STARRED
export function getAllStarredMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_STARRED_MAIL, {
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

// IMPORTANT
export function getAllImportantMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_IMPORTANT_MAIL, {
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

// bounce
export function getAllBounceMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_BOUNCE_MAIL, {
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

// reply
export function getAllReplyMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_REPLY_MAIL, {
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

// auto-reply
export function getAllAutoReplyMail() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API_URL.GET_AUTO_REPLY_MAIL, {
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
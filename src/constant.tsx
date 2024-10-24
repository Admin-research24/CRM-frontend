import { ContactEmergencyOutlined, EmailOutlined } from "@mui/icons-material";
import { Building2Icon, LayoutDashboard, Send, Settings } from "lucide-react";

export const DOMAIN = import.meta.env.VITE_SERVER_DOMAIN + "/api";
export const DOMAIN2 = import.meta.env.VITE_SERVER_DOMAIN2 + "/api";
export const DOMAIN3 = import.meta.env.VITE_SERVER_DOMAIN2 ;

export const token = import.meta.env.VITE_ACCESS_TOKEN;

export const API_URL = {
  // GET_ADMING_LOGIN: `${DOMAIN2}/login-admin`,
  POST_REGISTER_USER: `${DOMAIN2}/registerV3`,
  GET_ADMING_LOGIN: `${DOMAIN2}/loginV3`,

  GET_CONTACT_API:(page: number, limit:number, search: string)=> `${DOMAIN2}/contact/get-all-contacts?page=${page}&limit=${limit}&search=${search}`,
  POST_ADD_CONTACT_API: `${DOMAIN2}/add-contact`,
  DELETE_CONTACT_API: (Id: string) => `${DOMAIN2}/contact/del/${Id}`,
  UPDATE_CONTACT_API: (Id: string) => `${DOMAIN2}/contact/update/${Id}`,
  EXCEL_UPLOAD_CONTACT_API: `${DOMAIN2}/data/upload`,
  CRM_FIELD_API: `${DOMAIN2}/crm/get/limited-data`,
  IMPORT_CONTACT_FIELD_API: `${DOMAIN2}/data/upload/submit`,
  
  // Email
  GET_CONNECT_MAIL: `${DOMAIN3}/auth/google`,
  GET_FETCH_EMAIL: `${DOMAIN2}/email/fetchEmail`,
  GET_SENT_IMAP_EMAIL: `${DOMAIN2}/email/SentImap`,
  GET_SPAM_IMAP_EMAIL:  `${DOMAIN2}/email/SpamImap`,
  GET_DRAFT_IMAP_EMAIL: `${DOMAIN2}/email/DraftImap`,
  GET_BIN_IMAP_EMAIL: `${DOMAIN2}/email/BinImap`,
  GET_STARRED_IMAP_EMAIL: `${DOMAIN2}/email/StarredImap`,
  GET_IMPORTANT_IMAP_EMAIL: `${DOMAIN2}/email/ImportantImap`,
  GET_REPLY_IMAP_EMAIL: `${DOMAIN2}/email/ReplyImap`,
  GET_BOUNCE_IMAP_EMAIL: `${DOMAIN2}/email/BounceImap`,
  // POST_SEND_EMAIL: `${DOMAIN2}/email/sendEmail`,
  // GET_CONNECT_MAIL: `${DOMAIN3}/auth/google/callback`,
  POST_NEW_EMAIL:`${DOMAIN2}/email/sendEmail`,
  POST_BULK_EMAIL: `${DOMAIN2}/email/sendEmailBunch`,
  GET_INBOX_MAIL: `${DOMAIN2}/inbox`,
  GET_DRAFT_MAIL: `${DOMAIN2}/drafts`,
  GET_SENT_MAIL: `${DOMAIN2}/sent`,
  GET_SENT_MAIL_API: `${DOMAIN2}/sentemail`,
  GET_SPAM_MAIL: `${DOMAIN2}/spam`,
  GET_ALL_MAIL: `${DOMAIN2}/allMail`,
  GET_BIN_MAIL: `${DOMAIN2}/bin`,
  GET_STARRED_MAIL: `${DOMAIN2}/starred`,
  GET_IMPORTANT_MAIL: `${DOMAIN2}/important`,
  GET_REPLY_MAIL: `${DOMAIN2}/reply`,
  GET_AUTO_REPLY_MAIL: `${DOMAIN2}/AutoReplies`,
  GET_BOUNCE_MAIL: `${DOMAIN2}/bounce`,

  // Email templete
  GET_EMAIL_TEMPLATE: `${DOMAIN2}/getAlltemplates`,
  POST_EMAIL_TEMPLATE: `${DOMAIN2}/createTemplate`,
  DELETE_EMAIL_TEMPLATE: (_id: string) => `${DOMAIN2}/deleteTemplate/${_id}`,
  GET_SINGLE_EMAIL_TEMPLATE: (_id: string) => `${DOMAIN2}/getSingleTemplate/${_id}`,
  UPDATE_EMAIL_TEMPLATE: (_id: string) => `${DOMAIN2}/updateTemplate/${_id}`,
};
console.log(API_URL.GET_CONNECT_MAIL)


export const leftSideBarLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Contact",
    to: "/contact",
    icon: <ContactEmergencyOutlined />,
  },
  {
    label: "Company",
    to: "/company",
    icon: <Building2Icon />,
  },
  {
    label: "Email",
    to: "/conversation",
    icon: <EmailOutlined />,
  },
  {
    label:"sent Logs",
    to:"/sent-logs",
    icon:<Send />
  },
  {
    label: "Settings",
    to: "/leads-contact",
    icon: <Settings />,
    subLinks: [
      {
        label: "Lead, Contact & Account",
        to: "/leads-contact",
      },
      {
        label: "Deals & Pipelines",
        to: "/deals-pipelines",
      },
      {
        label: "Teams",
        to: "/teams",
      },
      {
        label: "Data & Import",
        to: "/import-data",
      },
    ]
  }
];

export const AdminSettingsLeftSideBar = [
  {
    label: "Lead, Contact & Account",
    label2: "Manage the people & companies you sell to",

    to: "/leads-contact",
  },
  {
    label: "Deals & Pipelines",
    label2: "Manage your products, services & sales processes",

    to: "/deals-pipelines",
  },
  {
    label: "Teams & Territories",
    label2: "Create sales team and how they are organized",
    to: "/teams",
  },
  {
    label: "Data & Import",
    label2: "Bring data into CRM From files",
    to: "/import-data",
  },
];

export const ITEM_PER_PAGE = 50;

export type RowType = {
  getIsSelected: () => boolean;
  toggleSelected: (value: boolean) => void;
  getValue: (key: string) => any;
  original: any;
  index: number;
};


// email format
export const Formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "link",
  "emoji",
  "image",
  "icon",
  "width",
  "flex",
  'image', 'video', 'indent', 'align'
];

// Define modules and formats for ReactQuill
export const Modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ['link', 'image', ], 
    [{ 'align': [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};


import { z } from "zod";

export const addConnectMailSchema = z.object({
    email: z.string({ required_error: "Please enter Your email id" }).email(),
    username: z.string({ required_error: "please enter username" }),
    password: z.string({
      required_error: "please enter yout password",
    }),
    imap_server: z.string({ required_error: "please select imap server" }),
    authentication_imaptype: z.string({ required_error: "please select authentication" }),
    smtp_server: z.string({ required_error: "please select imap server" }),
    authentication_smtptype: z.string({ required_error: "please select authentication" }),
    security_mode: z.string({ required_error: "please select security mode" }),
  });
  
  export type CreateConnectMail = z.infer<typeof addConnectMailSchema>;
import { DeleteEmailTemplate, GetAllEmailTemplate, GetSingleEmailTemplate, PostNewEmailTemplate, UpdateEmailTemplate } from "../api/emailTemplateAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface EmailTemplate {
    _id: string;
    user_id: string;
    __t: string;
    template_name: string;
    signature: string;
    isRead: string;
    subject: string;
    from: string;
    date: string;
    text: string;
    html: string;
    attachments: string;
    messageId: string;
    inReplyTo: string;
    references: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
    sentCount:string;
    openedCount:string;
    unsubscribedCount:string;
    repliedCount:string;
    clickedCount:string;
    lastSent:string;
}

export interface EmailTemplateState {
    emailTemplates: EmailTemplate[];
    isEmailTemplateloading: boolean;
    error: string | null;
    singleEmailTemplate: EmailTemplate;
}
const initialState: EmailTemplateState = { emailTemplates: [], isEmailTemplateloading: false, error: null, singleEmailTemplate: {} as EmailTemplate };

export const PostNewEmailTemplateAsync = createAsyncThunk(
    'mailTemplate/newMailTemplate',
    async (form: FormData) => {
        const res: any = await PostNewEmailTemplate(form);
        return res.data;
    },
);

export const GetAllEmailTemplateAsync = createAsyncThunk(
    'mailTemplate/getAllMailTemplate',
    async () => {
        const res: any = await GetAllEmailTemplate();
        return res.data;
    },
);

export const DeleteEmailTemplateAsync = createAsyncThunk(
    'mailTemplate/deleteMailTemplate',
    async (id: string) => {
        const res: any = await DeleteEmailTemplate(id);
        return res.data;
    },
)

export const GetSingleEmailTemplateAsync = createAsyncThunk(
    'mailTemplate/getSingleMailTemplate',
    async (_id: string) => {
        const res: any = await GetSingleEmailTemplate(_id);
        return res.data;
    },
)

export const UpdateEmailTemplateAsync = createAsyncThunk(
    'mailTemplate/updateMailTemplate',
    async ({ form, _id }: { form: FormData, _id: string }) => {
        const res: any = await UpdateEmailTemplate(_id, form);
        return res.data;
    },
)

const EmailTemplate = createSlice({
    name: 'emailTemplate',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(PostNewEmailTemplateAsync.pending, (state) => {
                state.isEmailTemplateloading = true;
            })
            .addCase(PostNewEmailTemplateAsync.fulfilled, (state, action) => {
                state.isEmailTemplateloading = false;
                state.emailTemplates = action.payload;
            })
            .addCase(PostNewEmailTemplateAsync.rejected, (state, action) => {
                state.isEmailTemplateloading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(GetAllEmailTemplateAsync.pending, (state) => {
                state.isEmailTemplateloading = true;
            })
            .addCase(GetAllEmailTemplateAsync.fulfilled, (state, action) => {
                state.isEmailTemplateloading = false;
                state.emailTemplates = action.payload;
            })
            .addCase(GetAllEmailTemplateAsync.rejected, (state, action) => {
                state.isEmailTemplateloading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(DeleteEmailTemplateAsync.pending, (state) => {
                state.isEmailTemplateloading = true;
            })
            .addCase(DeleteEmailTemplateAsync.fulfilled, (state, action) => {
                state.isEmailTemplateloading = false;
                state.emailTemplates = action.payload;
            })
            .addCase(DeleteEmailTemplateAsync.rejected, (state, action) => {
                state.isEmailTemplateloading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(GetSingleEmailTemplateAsync.pending, (state) => {
                state.isEmailTemplateloading = true;
            })
            .addCase(GetSingleEmailTemplateAsync.fulfilled, (state, action) => {
                state.isEmailTemplateloading = false;
                state.singleEmailTemplate = action.payload;
            })
            .addCase(GetSingleEmailTemplateAsync.rejected, (state, action) => {
                state.isEmailTemplateloading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(UpdateEmailTemplateAsync.pending, (state) => {
                state.isEmailTemplateloading = true;
            })
            .addCase(UpdateEmailTemplateAsync.fulfilled, (state, action) => {
                state.isEmailTemplateloading = false;
                state.emailTemplates = action.payload;
            })
            .addCase(UpdateEmailTemplateAsync.rejected, (state, action) => {
                state.isEmailTemplateloading = false;
                state.error = action.error.message || 'An error occurred';
            })
    },
});

export const selectAllEmailTemplate = (state: RootState) => state.emailTemplate.emailTemplates;
export const selectSingleEmailTemplate = (state: RootState) => state.emailTemplate.singleEmailTemplate;
export const { } = EmailTemplate.actions;
export default EmailTemplate.reducer;
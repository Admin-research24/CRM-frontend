import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAutoReplyMail, getAllBinMail, getAllBounceMail, getAllDraftMail, getAllImportantMail, getAllInboxMail, getAllMail, getAllReplyMail, getAllSentLogMail, getAllSentMail, getAllSpamMail, getAllStarredMail, getConnectMail, getFetchEMail, PostNewEmail } from "../api/email";
import { RootState } from "..";

export interface Email {
    _id: string;
    user_id: string;
    __t: string;
    isRead: string;
    subject: string;
    from: string;
    to: To;
    cc: Cc;
    bcc: Bcc;
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
    delivery_status: DeliveryStatus[];
}
interface DeliveryStatus {
    sent: {
      value: number | null;
      sentAt: string | null;
    };
    opened: {
      value: number | null;
      openedAt: string | null;
    };
    clicked: {
      value: number | null;
      clickedAt: string | null;
    };
    unsubscribed: {
      value: number | null;
      unsubscribedAt: string | null;
    };
  }
export interface Draft {
    _id: string;
    user_id: string;
    __t: string;
    isRead: string;
    subject: string;
    from: {
        value: { address: string; name: string; }[];
        text: string;

    };
    to: To;
    cc: Cc;
    bcc: Bcc;
    date: string;
    textBody: string;
    attachments: string;
    messageId: string;
    inReplyTo: string;
    references: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}
export interface Sent {
    _id: string;
    user_id: string;
    __t: string;
    isRead: string;
    subject: string;
    from: {
        value: { address: string; name: string; }[];
        text: string;

    };
    to: To;
    cc: Cc;
    bcc: Bcc;
    date: string;
    textBody: string;
    attachments: string;
    messageId: string;
    inReplyTo: string;
    references: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}
export interface AllMail {
    _id: string;
    user_id: string;
    __t: string;
    isRead: string;
    subject: string;
    from: {
        value: { address: string; name: string; }[];
        text: string;

    };
    to: To;
    cc: Cc;
    bcc: Bcc;
    date: string;
    textBody: string;
    attachments: string;
    messageId: string;
    inReplyTo: string;
    references: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}

interface To {
    value: Value[];
    text: string;
}
interface Value {
    address: string;
    name: string;
}
interface Cc {
    value: {
        address: string;
        name: string;
    }
    text: string;
}
interface Bcc {
    value: {
        address: string;
        name: string;
    }
    text: string;
}

export interface EmailState {
    allInboxMailList: Email[];
    allDraftMailList: Email[];
    allSentMailList: Email[];
    allSpamMailList: Email[];
    allMailList: Email[];
    allBinMailList: Email[];
    allStarredMailList: Email[];
    allImportantMailList: Email[];
    allAutoReplyMailList: Email[];
    allReplyMailList: Email[];
    allBounceMailList: Email[];
    allSentLogList:Email[];
    totalInboxGiven: number;
    isInboxLoading: boolean;
    isDraftLoading: boolean;
    isSentLoading: boolean;
    isSpamLoading: boolean;
    isAllMailLoading: boolean;
    isAllBinMailLoading: boolean;
    isAllStarredMailLoading: boolean;
    isAllImportantMailLoading: boolean;
    isNewMailLoading:boolean;
    isAutoReplyLoading:boolean;
    isReplayLoading:boolean;
    isBounceLoading:boolean;
    isSentMailLogLoading:boolean;
    inboxMessage: string;
    

}

const initialState: EmailState = {
    allInboxMailList: [],
    allDraftMailList: [],
    allSentMailList: [],
    allSpamMailList: [],
    allMailList: [],
    allBinMailList: [],
    allStarredMailList: [],
    allImportantMailList: [],
    allAutoReplyMailList: [],
    allReplyMailList: [],
    allBounceMailList: [],
    allSentLogList: [],
    totalInboxGiven: 0,
    isInboxLoading: false,
    isDraftLoading: false,
    isSentLoading: false,
    isSpamLoading: false,
    isAllMailLoading: false,
    isAllBinMailLoading: false,
    isAllStarredMailLoading: false,
    isAllImportantMailLoading: false,
    isNewMailLoading:false,
    isAutoReplyLoading:false,
    isReplayLoading:false,
    isBounceLoading:false,
    isSentMailLogLoading:false,
    inboxMessage: '',
}


export const getConnectMailAsync = createAsyncThunk(
    'mail/connectMail',
    async () => {
        const res: any = await getConnectMail();
        return res.data;
    },
);
export const getFetchEMailAsync = createAsyncThunk(
    'mail/fetchMail',
    async () => {
        const res: any = await getFetchEMail();
        return res.data;
    },
);

export const PostNewEmailAsync = createAsyncThunk(
    'mail/newMail',
    async (form: FormData) => {
        const res: any = await PostNewEmail(form);
        return res.data;
    },
);

export const getAllInboxMailAsync = createAsyncThunk(
    'mail/inboxMail',
    async () => {
        const res: any = await getAllInboxMail();
        return res.data;
    },
);

export const getAllDraftMailAsync = createAsyncThunk(
    'mail/draftMail',
    async () => {
        const res: any = await getAllDraftMail();
        return res.data;
    },
);

export const getAllSentMailAsync = createAsyncThunk(
    'mail/sentMail',
    async () => {
        const res: any = await getAllSentMail();
        return res.data;
    },
);
export const getAllSentLogMailAsync = createAsyncThunk(
    'mail/sentLogMail',
    async () => {
        const res: any = await getAllSentLogMail();
        return res.data;
    },
);

export const getAllSpamMailAsync = createAsyncThunk(
    'mail/spamMail',
    async () => {
        const res: any = await getAllSpamMail();
        return res.data;
    },
);


export const getAllMailAsync = createAsyncThunk(
    'mail/allMail',
    async () => {
        const res: any = await getAllMail();
        return res.data;
    },
);

export const getAllBinMailAsync = createAsyncThunk(
    'mail/binMail',
    async () => {
        const res: any = await getAllBinMail();
        return res.data;
    },
);

export const getAllStarredMailAsync = createAsyncThunk(
    'mail/starredMail',
    async () => {
        const res: any = await getAllStarredMail();
        return res.data;
    },
);

export const getAllImportantMailAsync = createAsyncThunk(
    'mail/importantMail',
    async () => {
        const res: any = await getAllImportantMail();
        return res.data;
    },
);

export const getAllBounceMailAsync = createAsyncThunk(
    'mail/bounceMail',
    async () => {
        const res: any = await getAllBounceMail();
        return res.data;
    },
);

export const getAllReplyMailAsync = createAsyncThunk(
    'mail/replyMail',
    async () => {
        const res: any = await getAllReplyMail();
        return res.data;
    },
);

export const getAllAutoReplyMailAsync = createAsyncThunk(
    'mail/AutoreplyMail',
    async () => {
        const res: any = await getAllAutoReplyMail();
        return res.data;
    },
);


const EmailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        clearEmailInbox: state => {
            state.inboxMessage = "";
        }
    },

    extraReducers: builder => {
        builder
            .addCase(PostNewEmailAsync.rejected, state => {
                state.isNewMailLoading = false;
            })
            .addCase(PostNewEmailAsync.pending, state => {
                state.isNewMailLoading = true;
            })
            // .addCase(PostNewEmailAsync.fulfilled, (state, action) => {
            //     state.allContactList = action.payload.contacts;
            //     state.isContactLoading = false;
            // })
            .addCase(getAllInboxMailAsync.pending, state => {
                state.isInboxLoading = true;
            })
            .addCase(getAllInboxMailAsync.fulfilled, (state, action) => {
                state.allInboxMailList = action.payload;

            })
            .addCase(getAllInboxMailAsync.rejected, state => {
                state.isInboxLoading = false;
            })
            .addCase(getAllDraftMailAsync.pending, state => {
                state.isDraftLoading = true;
            })
            .addCase(getAllDraftMailAsync.fulfilled, (state, action) => {
                state.allDraftMailList = action.payload;

            })
            .addCase(getAllDraftMailAsync.rejected, state => {
                state.isDraftLoading = false;
            })
            .addCase(getAllSentMailAsync.pending, state => {
                state.isSentLoading = true;
            })
            .addCase(getAllSentMailAsync.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.allSentMailList = action.payload;
                } else {
                    state.allSentMailList = [];
                }
                state.isSentLoading = false;
            })
            .addCase(getAllSentMailAsync.rejected, state => {
                state.isSentLoading = false;
            })
            .addCase(getAllSentLogMailAsync.pending, state => {
                state.isSentMailLogLoading = true;
            })
            .addCase(getAllSentLogMailAsync.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.allSentLogList = action.payload;
                } else {
                    state.allSentLogList = [];
                }
                state.isSentMailLogLoading = false;
            })
            .addCase(getAllSentLogMailAsync.rejected, state => {
                state.isSentMailLogLoading = false;
            })
            .addCase(getAllSpamMailAsync.pending, state => {
                state.isSpamLoading = true;
            })
            .addCase(getAllSpamMailAsync.fulfilled, (state, action) => {
                state.allSpamMailList = action.payload;

            })
            .addCase(getAllSpamMailAsync.rejected, state => {
                state.isSpamLoading = false;
            })
            .addCase(getAllMailAsync.pending, state => {
                state.isAllMailLoading = true;
            })
            .addCase(getAllMailAsync.fulfilled, (state, action) => {
                state.allMailList = action.payload;
            })
            .addCase(getAllMailAsync.rejected, (state) => {
                state.isAllMailLoading = false;
            })
            .addCase(getAllBinMailAsync.pending, (state) => {
                state.isAllBinMailLoading = true;
            })
            .addCase(getAllBinMailAsync.fulfilled, (state, action) => {
                state.allBinMailList = action.payload;
                state.isAllBinMailLoading = false;
            })
            .addCase(getAllBinMailAsync.rejected, (state) => {
                state.isAllBinMailLoading = false;
            })
            .addCase(getAllStarredMailAsync.pending, (state) => {
                state.isAllStarredMailLoading = true;
            })
            .addCase(getAllStarredMailAsync.fulfilled, (state, action) => {
                state.allStarredMailList = action.payload;
                state.isAllStarredMailLoading = false;
            })
            .addCase(getAllStarredMailAsync.rejected, (state) => {
                state.isAllStarredMailLoading = false;
            })
            .addCase(getAllImportantMailAsync.pending, (state) => {
                state.isAllImportantMailLoading = true;
            })
            .addCase(getAllImportantMailAsync.fulfilled, (state, action) => {
                state.allImportantMailList = action.payload;
                state.isAllImportantMailLoading = false;
            })
            .addCase(getAllImportantMailAsync.rejected, (state) => {
                state.isAllImportantMailLoading = false;
            })
            .addCase(getAllAutoReplyMailAsync.pending, (state) => {
                state.isAutoReplyLoading = true;
            })
            .addCase(getAllAutoReplyMailAsync.fulfilled, (state, action) => {
                state.allAutoReplyMailList = action.payload;
                state.isAutoReplyLoading = false;
            })
            .addCase(getAllAutoReplyMailAsync.rejected, (state) => {
                state.isAutoReplyLoading = false;
            })
            .addCase(getAllReplyMailAsync.pending, (state) => {
                state.isReplayLoading = true;
            })
            .addCase(getAllReplyMailAsync.fulfilled, (state, action) => {
                state.allReplyMailList = action.payload;
                state.isReplayLoading = false;
            })
            .addCase(getAllReplyMailAsync.rejected, (state) => {
                state.isReplayLoading = false;
            })
            .addCase(getAllBounceMailAsync.pending, (state) => {
                state.isBounceLoading = true;
            })
            .addCase(getAllBounceMailAsync.fulfilled, (state, action) => {
                state.allBounceMailList = action.payload;
                state.isBounceLoading = false;
            })
            .addCase(getAllBounceMailAsync.rejected, (state) => {
                state.isBounceLoading = false;
            })
    }
})

export const selectAllMailLists = (state: RootState) => [
    ...(state.email.allInboxMailList ?? []),
    ...(state.email.allDraftMailList ?? []),
    ...(state.email.allSentMailList ?? []),
    ...(state.email.allSpamMailList ?? []),
    ...(state.email.allImportantMailList ?? []),
    ...(state.email.allBinMailList ?? []),
    ...(state.email.allStarredMailList ?? []),
    ...(state.email.allAutoReplyMailList ?? []),
    ...(state.email.allReplyMailList ?? []),
    ...(state.email.allBounceMailList ?? []),


];
export const selectAllMailInboxList = (state: RootState) => state.email.allInboxMailList;
export const selectAllMailDraftList = (state: RootState) => state.email.allDraftMailList;
export const selectAllMailSentList = (state: RootState) => state.email.allSentMailList;
export const selectAllMailSpamList = (state: RootState) => state.email.allSpamMailList;
export const selectAllMailList = (state: RootState) => state.email.allMailList;
export const selectAllSentLogList = (state: RootState) => state.email.allSentLogList;

export const selectInboxMailMessage = (state: RootState) => state.email.inboxMessage;
export const selectInboxLoading = (state: RootState) => state.email.isInboxLoading;

export const { clearEmailInbox } = EmailSlice.actions;
export default EmailSlice.reducer;
// MailContent.tsx
import React, { useEffect,  useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/ui/tabs";
import { Separator } from "../../../components/ui/ui/separator";
import { Input } from "../../../components/ui/ui/input";
import { EllipsisVertical, Filter, Search } from "lucide-react";
import { MailList } from "./mailList";
// import { Mail } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/ui/card";
import { Button } from "../../../components/ui/ui/button";
import GmailIcon from "../../../assets/icons8-gmail (1).svg";
import OutLookIcon from "../../../assets/icons8-outlook.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/ui/dialog";
import ConnectGmail from "../../../components/form/Email/connectGmail";
import ConnectOutLook from "../../../components/form/Email/connectOutLook";
import ConnectOther from "../../../components/form/Email/connectOther";
import { Email, getAllAutoReplyMailAsync, getAllBinMailAsync, getAllBounceMailAsync, getAllDraftMailAsync, getAllImportantMailAsync, getAllInboxMailAsync, getAllMailAsync, getAllReplyMailAsync, getAllSentMailAsync, getAllSpamMailAsync, getAllStarredMailAsync, getBinImapEMailAsync, getDraftImapEMailAsync, getFetchEMailAsync, getImportentImapEMailAsync, getSentImapEMailAsync, getSpamImapEMailAsync, getStarredImapEMailAsync } from "../../../store/slices/email";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/ui/table";
import { Badge } from "../../../components/ui/ui/badge";
import { DeleteEmailTemplateAsync, GetAllEmailTemplateAsync } from "../../../store/slices/eTemplate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/ui/dropdown-menu";
import { Checkbox } from "../../../components/ui/ui/checkbox";
import { AlertDialogHeader } from "../../../components/ui/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/ui/select";
import { toast } from "react-toastify";
import UpdateEmailTemplate from "../../../components/form/Email/updateEmailTemplate";
import { get } from "http";

interface MailContentProps {
    activeSection: string;
    mails: Email[];

}

const MailContent: React.FC<MailContentProps> = ({ activeSection, mails, }) => {
    const dispatch = useAppDispatch();

    const inboxMails = useAppSelector((state) => state.email.allInboxMailList);
    const draftMails = useAppSelector((state) => state.email.allDraftMailList);
    const sentMails = useAppSelector((state) => state.email.allSentMailList);
    const spamMails = useAppSelector((state) => state.email.allSpamMailList);
    const allMails = useAppSelector((state) => state.email.allMailList);
    const binMails = useAppSelector((state) => state.email.allBinMailList);
    const starredMails = useAppSelector((state) => state.email.allStarredMailList);
    const importantMails = useAppSelector((state) => state.email.allImportantMailList);
    const replyMails = useAppSelector((state) => state.email.allReplyMailList);
    const autoReplyMails = useAppSelector((state) => state.email.allAutoReplyMailList);
    const bounceMails = useAppSelector((state) => state.email.allBounceMailList);
    // const loading = useAppSelector((state) => state.email.isInboxLoading);
    const emailTemplateList = useAppSelector((state) => state.emailTemplate.emailTemplates);

    useEffect(() => {
        switch (activeSection) {
            case 'Inbox':
                dispatch(getAllInboxMailAsync());
                dispatch(getFetchEMailAsync())
                break;
            case 'Drafts':
                dispatch(getAllDraftMailAsync());
                dispatch(getDraftImapEMailAsync());
                break;
            case 'Sent':
                dispatch(getAllSentMailAsync());
                dispatch(getSentImapEMailAsync)
                break;
            case 'Spam':
                dispatch(getAllSpamMailAsync());
                dispatch(getSpamImapEMailAsync());
                break;
            case 'All Mail':
                dispatch(getAllMailAsync());

                break;
            case 'Trash':
                dispatch(getAllBinMailAsync());
                dispatch(getBinImapEMailAsync());
                break;
            case 'Stared':
                dispatch(getAllStarredMailAsync());
                dispatch(getStarredImapEMailAsync());
                break;
            case 'Important':
                dispatch(getAllImportantMailAsync());
                dispatch(getImportentImapEMailAsync());
                break;
            case 'Email-Templates':
                dispatch(GetAllEmailTemplateAsync());
                break;
            case 'Bounces':
                dispatch(getAllBounceMailAsync());
                break;
            case 'Reply':
                dispatch(getAllReplyMailAsync());
                break;
            case 'AutoReplies':
                dispatch(getAllAutoReplyMailAsync());
                break;
            default:
                break;
        }

    }, [dispatch, activeSection]);

    const handelOnclick = () => {
        dispatch(getFetchEMailAsync())
    }
    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const isAllSelected = emailTemplateList.length === selectedRows.length;

    const handleRowSelect = (_id: string) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(_id)
                ? prevSelectedRows.filter((rowId) => rowId !== _id)
                : [...prevSelectedRows, _id]
        );
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedRows([]);
        } else {
            const allRowIds = emailTemplateList.map((item: any) => item._id);
            setSelectedRows(allRowIds);
        }
    };

    const handleDelete = (_id: string) => {
        dispatch(DeleteEmailTemplateAsync(_id)).then(() => {
            dispatch(GetAllEmailTemplateAsync());
            toast.success("Email template deleted successfully");
        })
    };
    switch (activeSection) {
        case "Awaiting":
            return (
                <div className="p-3">
                    <div>
                        <h2 className="text-xl font-semibold">Connect your Inbox to CRM</h2>
                        <span className="text-xs">Manage your work email in a private inbox that stays in sync with your email provider. You can also add team inboxes. later.</span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-base font-semibold">Select your email provider:</h3>
                        <div className="p-1">
                            <div className="mb-4 p-4 border-l-4 border-blue-500 bg-blue-100 text-blue-700">
                                <span className="font-medium">e.arthur0765@gmail.com</span> is hosted by Gmail. We recommend you select this provider.
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <Card className="text-center">
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="w-full h-full flex flex-col items-center">
                                                <img src={GmailIcon} alt="Gmail" className="w-16 h-16" />
                                                <span>Gmail</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-[80%] ">
                                            <DialogHeader>
                                                <DialogTitle>Connect your Gmail to the CRM</DialogTitle>

                                            </DialogHeader>
                                            <ConnectGmail />
                                            {/* <UpdateContactForm contact={row.original} /> */}
                                        </DialogContent>
                                    </Dialog>

                                </Card>

                                <Card className="text-center">
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="w-full h-full flex flex-col items-center">
                                                {/* <Outlook className="w-16 h-16" /> */}
                                                <img src={OutLookIcon} alt="Gmail" className="w-16 h-16" />
                                                <span className="text-wrap">Microsoft Outlook</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-[80%] ">
                                            <DialogHeader>
                                                <DialogTitle>How do you want to sync your emails?</DialogTitle>

                                            </DialogHeader>
                                            <ConnectOutLook />
                                            {/* <UpdateContactForm contact={row.original} /> */}
                                        </DialogContent>
                                    </Dialog>

                                </Card>

                                <Card className="text-center">
                                    <Dialog >
                                        <DialogTrigger>
                                            <Button variant="ghost" className="w-full h-full flex flex-col items-center">
                                                <img src={GmailIcon} alt="Gmail" className="w-16 h-16" />
                                                <span>Others</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-[80%] ">
                                            <DialogHeader>
                                                <DialogTitle>Connect your Gmail to the CRM</DialogTitle>

                                            </DialogHeader>
                                            < ConnectOther />
                                            {/* <UpdateContactForm contact={row.original} /> */}
                                        </DialogContent>
                                    </Dialog>

                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Inbox":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Inbox({inboxMails.length})</h1>
                        <Button onClick={handelOnclick}>refresh</Button>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <TabsContent value="all" className="m-0">
                        <MailList items={inboxMails} />
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        <MailList items={mails.filter((item) => item && !item.isRead)} />
                    </TabsContent>
                </Tabs>
            );
        case "Drafts":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Drafts({draftMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={draftMails} />
                    {/* <MailList items={mails.filter((item) => item.status === "draft")} /> */}
                </Tabs>
            );
        case "Sent":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Send({sentMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={sentMails} />
                    {/* <MailList items={mails.filter((item) => item.status === "send")} /> */}
                </Tabs>
            );
        case "Trash":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Trash({binMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={binMails} />
                    {/* <MailList items={mails.filter((item) => item.status === "trash")} /> */}
                </Tabs>
            );
        case "Important":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Important({importantMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={importantMails} />
                    {/* <MailList items={mails.filter((item) => item.status === "important")} /> */}
                </Tabs>
            );
        case "Stared":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Stared({starredMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={starredMails} />
                    {/* <MailList items={mails.filter((item) => item.status === "star")} /> */}
                </Tabs>
            );
        case "Spam":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Spam({spamMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={spamMails} />
                </Tabs>
            );
        case "Open":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Open({mails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    {/* <MailList items={mails.filter((item) => item.status === "open")} /> */}
                </Tabs>
            );
        case "Check":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Check({mails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    {/* <MailList items={mails.filter((item) => item.status === "check")} /> */}
                </Tabs>
            );
        case "Bounces":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Bounce({bounceMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={bounceMails} />
                </Tabs>
            );
        case "Reply":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Reply({replyMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={replyMails} />
                </Tabs>
            );
        case "AutoReplies":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Auto Reply({autoReplyMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <MailList items={autoReplyMails} />
                </Tabs>
            );
        case "All Mail":
            return (
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">All Mail({allMails.length})</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All mail
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <TabsContent value="all" className="m-0">
                        <MailList items={allMails} />;
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        {/* <MailList items={mails.filter((item) => item && !item.read)} /> */}
                    </TabsContent>
                </Tabs>
            );
        case "Email-Templates":

            return (
                <div>
                    <Card className="dashboard-05-chunk-3 h-screen">
                        <CardHeader className="px-7">
                            <CardTitle>Email Templates</CardTitle>
                        </CardHeader>
                        <div className="flex items-center justify-between px-4">
                            <div className="relative ml-6 mb-2 flex-1 ">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                />
                            </div>
                            <div className="mr-5">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <div className="flex items-center space-x-2">
                                            <Filter />
                                            <SelectValue placeholder="Select..." />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apple">Created by me</SelectItem>
                                        <SelectItem value="banana">Shared with me</SelectItem>
                                        <SelectItem value="blueberry">Most recent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <CardContent>
                            <Table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="text-center">
                                            <Checkbox
                                                checked={isAllSelected} // Bind to the state
                                                onCheckedChange={handleSelectAll} // Handle "Select All"
                                                className="h-5 w-5"
                                            />
                                        </TableHead>
                                        <TableHead className="font-semibold">Template Name</TableHead>
                                        <TableHead className="hidden sm:table-cell text-center w-[30rem] font-semibold">
                                            Status
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell w-10 font-semibold text-center">
                                            Date
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell text-center font-semibold">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {emailTemplateList.map((item: any) => (
                                        <TableRow
                                            className={`bg-white hover:bg-gray-50 cursor-pointer`}
                                            key={item._id}
                                        >
                                            <TableCell className="text-center">
                                                <Checkbox
                                                    checked={selectedRows.includes(item._id)}
                                                    onCheckedChange={() => handleRowSelect(item._id)}
                                                    className="h-5 w-5"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <div className="font-medium text-blue-600">{item.template_name}</div>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl max-h-[92%] overflow-auto">
                                                        <DialogTitle>Email Template</DialogTitle>
                                                        <AlertDialogHeader>
                                                            {/* Edit Template Content */}
                                                            <UpdateEmailTemplate _id={item._id} />
                                                        </AlertDialogHeader>
                                                    </DialogContent>
                                                </Dialog>

                                                <div className="hidden text-sm text-gray-500 md:inline">
                                                    <p>
                                                        Created by: <span className="font-medium ">admin</span>
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="flex gap-6 justify-between text-center">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Sent</p>
                                                        <p className="font-medium">{item.sentCount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Opened</p>
                                                        <p className="font-medium">{item.openedCount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Clicked</p>
                                                        <p className="font-medium">{item.clickedCount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Replied</p>
                                                        <p className="font-medium">{item.repliedCount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Unsubscribed</p>
                                                        <p className="font-medium">{item.unsubscribedCount}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className="bg-blue-300 text-black">Public</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button className="bg-transparent text-black hover:bg-slate-300 hover:text-black p-2">
                                                            <EllipsisVertical />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Dialog>
                                                                <DialogTrigger>Edit</DialogTrigger>
                                                                <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                                                                    <DialogTitle>Edit Template</DialogTitle>

                                                                    <AlertDialogHeader>
                                                                        {/* Edit Template Content */}
                                                                        {/* <UpdateEmailTemplate _id={item._id} /> */}
                                                                    </AlertDialogHeader>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-500">
                                                            <AlertDialogHeader onClick={() => handleDelete(item._id)} >Delete</AlertDialogHeader>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>


                </div >
            )
        default:
            return <div>Select a section to view emails</div>;
    }
};

export default MailContent;

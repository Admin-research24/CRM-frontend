import {  useState } from 'react';
import Cookies from 'js-cookie';
import Mail from "./Email/mail";
// import { accounts, mails } from "./Email/data";
import { LoaderPinwheel, MessageSquareText } from 'lucide-react';
import { Button } from '../../components/ui/ui/button';
import { Separator } from '../../components/ui/ui/separator';
import SalesSequences from './Sequences/Sequences';
// import { getAllInboxMailAsync } from '../../store/slices/email';
// import { useAppSelector } from '../../store/Hooks';
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/ui/dialog';
import AddEmailTemplate from '../../components/form/Email/addEmailTemplate';

export default function MailPage() {
    const [activeTab, setActiveTab] = useState<'mail' | 'salesSequences'>('mail');
    // const dispatch = useAppDispatch();
    // const mails = useAppSelector((state) => state.email.allInboxMailList)

    const layout = Cookies.get("react-resizable-panels:layout:mail");
    const collapsed = Cookies.get("react-resizable-panels:collapsed");

    const defaultLayout = layout ? JSON.parse(layout) : undefined;
    const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

    const buttonStyle = 'flex gap-2 items-center px-4 py-2 rounded-lg transition-colors';
    const activeButtonStyle = ' text-white';
    const inactiveButtonStyle = 'bg-gray-200 text-gray-700 hover:bg-gray-300';

    return (
        <>
            <div className='flex p-4 justify-between'>
                <div className='flex gap-3  items-center'>
                    <Button
                        className={`${buttonStyle} ${activeTab === 'mail' ? activeButtonStyle : inactiveButtonStyle}`}
                        onClick={() => setActiveTab('mail')}
                    >
                        <MessageSquareText /> Conversation
                    </Button>
                    <Button
                        className={`${buttonStyle} ${activeTab === 'salesSequences' ? activeButtonStyle : inactiveButtonStyle}`}
                        onClick={() => setActiveTab('salesSequences')}
                    >
                        <LoaderPinwheel /> Sales Sequences
                    </Button>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button >
                            Emial Template
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="h-[80%] max-w-[50%] overflow-scroll">
                        <DialogHeader>
                            <DialogTitle>Emial Template</DialogTitle>
                        </DialogHeader>
                        <AddEmailTemplate/>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            <div className="flex flex-col p-1">
                {activeTab === 'mail' && (
                    <Mail
                        // accounts={accounts}
                        // mails={mails}
                        defaultLayout={defaultLayout}
                        defaultCollapsed={defaultCollapsed}
                        navCollapsedSize={4}
                    />
                )}
                {activeTab === 'salesSequences' && (
                    <SalesSequences />
                )}

            </div>
        </>
    );
}

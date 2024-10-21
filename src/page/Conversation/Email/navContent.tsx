// DropdownNavigation.tsx
import React, { useState } from 'react';
import { ChevronDown, Box, CalendarCheck2, BookDashed, Inbox, Send, Trash2, File, MessagesSquare, AlertCircle, MousePointerClick, Mails, MailOpen, Star, MailSearch, Bookmark, MailPlus, Mailbox } from 'lucide-react';
import { Nav } from './nav';
import { Separator } from '../../../components/ui/ui/separator';
import ComposeEmail from '../../../components/common/ComposeEmail';
import { useAppSelector } from '../../../store/Hooks';

interface DropdownNavigationProps {
    isCollapsed: boolean;
    activeSection: string;
    isDropdownOpen: number | null;
    handleToggleDropdown: (index: number) => void;
    handleDropdownItemClick: (section: string) => void;
    handleNavClick: (section: string) => void;

}

const DropdownNavigation: React.FC<DropdownNavigationProps> = ({
    isCollapsed,
    activeSection,
    isDropdownOpen,
    handleToggleDropdown,
    handleDropdownItemClick,
    handleNavClick
}) => {
    const [openCompose, setOpenCompose] = useState(false);
    const mails = useAppSelector((state) => state.email.allInboxMailList);
    const draftMails = useAppSelector((state) => state.email.allDraftMailList);
    const sentMails = useAppSelector((state) => state.email.allSentMailList)
    const spamMails = useAppSelector((state) => state.email.allSpamMailList)
    const allMails = useAppSelector((state) => state.email.allMailList)
    const binMails = useAppSelector((state) => state.email.allBinMailList);
    const starredMails = useAppSelector((state) => state.email.allStarredMailList);
    const importantMails = useAppSelector((state) => state.email.allImportantMailList);
    const replyMails = useAppSelector((state) => state.email.allReplyMailList);
    const autoReplyMails = useAppSelector((state) => state.email.allAutoReplyMailList);
    const bounceMails = useAppSelector((state) => state.email.allBounceMailList);    
    

    const handleOpenCompose = () => {
        setOpenCompose(true);
    };

    const handleCloseCompose = () => {
        setOpenCompose(false);
    };
    // useEffect(() => {
    //     switch (activeSection) {
    //         case 'Inbox':
    //             dispatch(getAllInboxMailAsync());
    //             break;
    //         case 'Drafts':
    //             dispatch(getAllDraftMailAsync());
    //             break;
    //         case 'Sent':
    //             dispatch(getAllSentMailAsync());
    //             break;
    //         case 'Spam':
    //             dispatch(getAllSpamMailAsync());
    //             break;
    //         case 'All Mail':
    //             dispatch(getAllMailAsync());
    //             break;
    //         case 'Trash':
    //             dispatch(getAllBinMailAsync());
    //             break;
    //         case 'Stared':
    //             dispatch(getAllStarredMailAsync());
    //             break;
    //         case 'Important':
    //             dispatch(getAllImportantMailAsync());
    //             break;
    //         default:
    //             break;
    //     }
    // }, [activeSection, dispatch]);

    return (
        <>
            <Nav
                isCollapsed={isCollapsed}
                activeSection={activeSection}
                links={[
                    {
                        title: "Awaiting Response",
                        label: '',
                        icon: Inbox,
                        variant: "ghost",
                        onClick: () => handleNavClick("Awaiting"),
                    },
                    {
                        title: "Inbox",
                        label: `${mails.length}`,
                        icon: Inbox,
                        variant: "ghost",
                        onClick: () => handleNavClick("Inbox"),
                    },
                    {
                        title: "Drafts",
                        label: `${draftMails.length}`,
                        icon: File,
                        variant: "ghost",
                        onClick: () => handleNavClick("Drafts"),
                    },
                    {
                        title: "Sent",
                        label: `${sentMails.length}`,
                        icon: Send,
                        variant: "ghost",
                        onClick: () => handleNavClick("Sent"),
                    },
                    {
                        title: "Trash",
                        label: `${binMails.length}`,
                        icon: Trash2,
                        variant: "ghost",
                        onClick: () => handleNavClick("Trash"),
                    },
                    {
                        title: "New Mail",
                        label: "",
                        icon: MailPlus,
                        variant: "ghost",
                        onClick: handleOpenCompose,
                    },
                    {
                        title: "Email Templates",
                        label: "",
                        icon: Mailbox,
                        variant: "ghost",
                        onClick: () => handleNavClick("Email-Templates"),
                    },
                ]}
            />
            <Separator />
            <ComposeEmail open={openCompose} handleClose={handleCloseCompose} />

            <Nav
                isCollapsed={isCollapsed}
                activeSection={activeSection}
                links={[
                    {
                        title: "Important",
                        label: `${importantMails.length}`,
                        icon: Bookmark,
                        variant: "ghost",
                        onClick: () => handleNavClick("Important"),
                    },
                    {
                        title: "Starred",
                        label: `${starredMails.length}`,
                        icon: Star,
                        variant: "ghost",
                        onClick: () => handleNavClick("Stared"),
                    },
                    {
                        title: "Spam",
                        label: `${spamMails.length}`,
                        icon: AlertCircle,
                        variant: "ghost",
                        onClick: () => handleNavClick("Spam"),
                    },

                ]}
            />
            <Separator />
            <Nav
                isCollapsed={isCollapsed}
                activeSection={activeSection}
                links={[
                    {
                        title: "All Mail",
                        label: `${allMails.length}`,
                        icon: Mails,
                        variant: "ghost",
                        onClick: () => handleNavClick("All Mail"),
                    },
                ]}
            />
            <Separator />

            <div onClick={() => handleToggleDropdown(0)} className="m-0">
                <Nav
                    isCollapsed={isCollapsed}
                    activeSection={activeSection}
                    links={[
                        {
                            title: "Bulk Mail",
                            label: <ChevronDown
                                className={`ml-auto h-4 w-4 transition-transform duration-200 ${isDropdownOpen === 0 ? 'rotate-180' : ''}`}
                            />,
                            icon: MessagesSquare,
                            variant: "ghost",
                        },
                    ]}
                />
            </div>
            {isDropdownOpen === 0 && (
                <>
                    <Nav
                        isCollapsed={isCollapsed}
                        activeSection={activeSection}
                        links={[
                            {
                                title: "Bulk Mail Metrics",
                                label: "",
                                icon: Box,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Bulk Mail Metrics"),
                            },
                            {
                                title: "Bulk Mail Schedule",
                                label: "",
                                icon: CalendarCheck2,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Bulk Mail Schedule"),
                            },
                            {
                                title: "Bulk Mail Draft",
                                label: "",
                                icon: BookDashed,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Bulk Mail Draft"),
                            },
                        ]}
                    />
                    <Separator />
                </>
            )}
            <div onClick={() => handleToggleDropdown(1)} className="m-0">
                <Nav
                    isCollapsed={isCollapsed}
                    activeSection={activeSection}
                    links={[
                        {
                            title: "Email Tracking",
                            label: <ChevronDown
                                className={`ml-auto h-4 w-4 transition-transform duration-200 ${isDropdownOpen === 1 ? 'rotate-180' : ''}`}
                            />,
                            icon: MailSearch,
                            variant: "ghost",
                        },
                    ]}
                />
            </div>
            {isDropdownOpen === 1 && (
                <>
                    <Nav
                        isCollapsed={isCollapsed}
                        activeSection={activeSection}
                        links={[
                            {
                                title: "Open",
                                label: "0",
                                icon: MailOpen,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Open"),
                            },
                            {
                                title: "Check",
                                label: "0",
                                icon: MousePointerClick,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Check"),
                            },
                            {
                                title: "Bounces",
                                label:  `${bounceMails.length}`,
                                icon: BookDashed,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Bounces"),
                            },
                            {
                                title: "Reply",
                                label: `${replyMails.length}`,
                                icon: BookDashed,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("Reply"),
                            },
                            {
                                title: "Auto Replies",
                                label: `${autoReplyMails.length}`,
                                icon: BookDashed,
                                variant: "ghost",
                                onClick: () => handleDropdownItemClick("AutoReplies"),
                            },
                            
                        ]}
                    />
                </>
            )}
        </>
    );
};

export default DropdownNavigation;

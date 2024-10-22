import { ColumnDef } from "@tanstack/react-table";
import { RowType } from "../../constant";
import { Contact } from "../../store/slices/contact";
import { useState } from "react";
import ComposeEmail from "../../components/common/ComposeEmail";

export const getSentLogColumns = (handleRowSelect: (row: Contact) => void): ColumnDef<Contact, any>[] => [
    {
        accessorKey: 'select',
        header: ({ table }) => {
            const isAllSelected = table.getIsAllRowsSelected();
            return (
                <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            );
        },
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()} // Check if row is selected
                onChange={(event) => {
                    row.getToggleSelectedHandler()(event); // This should toggle selection properly
                    handleRowSelect(row.original); // Call the row select handler to update selectedContacts
                }}
            />
        ),
    },
    {
        accessorKey: 'idx',
        header: 'Sr No.',
        cell: ({ row }: { row: RowType }) => row.index + 1,
    },
    {
        accessorKey: "to",
        header: "To",

    },
    {
        accessorKey: "to",
        header: "TO",
        cell: ({ row }: { row: RowType }) => {
            const email = row.getValue("to");
            const [isComposeOpen, setComposeOpen] = useState(false);
            const [selectedEmail, setSelectedEmail] = useState<string>("");

            const handleOpenCompose = (email: string) => {
                setSelectedEmail(email);
                setComposeOpen(true);
            };

            const handleCloseCompose = () => {
                setComposeOpen(false);
                setSelectedEmail("");
            };

            return (
                <>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent event from bubbling up
                            handleOpenCompose(email);
                        }}
                        className="text-blue-500 underline"
                    >
                        {email}
                    </a>

                    <ComposeEmail
                        open={isComposeOpen}
                        handleClose={handleCloseCompose}
                        initialTo={selectedEmail}
                    />
                </>
            );
        },
    },
    {
        accessorKey: "from",
        header: "From",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "updated_at",
        header: "Sent At",
    },
    {
        accessorKey: "open",
        header: "Open ",
    }, 
    {
        accessorKey: "opent_at",
        header: "Open At",
    },
    {
        accessorKey: "click",
        header: "Clicked",
    },
    {
        accessorKey: "clicked_at",
        header: "CLicked At",
    },
    {
        accessorKey: "unsubscribe",
        header: "Unsubscribe",
    },
    {
        accessorKey: "Unsubscribe_At",
        header: " Unsubscribe At",
    },
    {
        accessorKey: "bounced",
        header: "Bounced",
    }

]
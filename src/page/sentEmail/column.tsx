import { ColumnDef } from "@tanstack/react-table";
import { RowType } from "../../constant";
import { useState } from "react";
import ComposeEmail from "../../components/common/ComposeEmail";
import { Email } from "../../store/slices/email";

export const getSentLogColumns = (handleRowSelect: (row: Email) => void): ColumnDef<Email, any>[] => [
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
    // {
    //     accessorKey: "to",
    //     header: "To",

    // },
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
        accessorKey: "delivery_status[0].sent.value",
        header: "Sent",
        cell: ({ row }) => row.original.delivery_status[0]?.sent?.value || "0",
      },
      {
        accessorKey: "delivery_status[0].sent.sentAt",
        header: "Sent At",
        cell: ({ row }) => row.original.delivery_status[0]?.sent?.sentAt ? new Date(row.original.delivery_status[0]?.sent?.sentAt).toLocaleString() : "N/A",
      },
      {
        accessorKey: "delivery_status[0].opened.value",
        header: "Opened",
        cell: ({ row }) => row.original.delivery_status[0]?.opened?.value || "0",
      },
      {
        accessorKey: "delivery_status[0].opened.openedAt",
        header: "Opened At",
        cell: ({ row }) => row.original.delivery_status[0]?.opened?.openedAt ? new Date(row.original.delivery_status[0]?.opened?.openedAt).toLocaleString() : "N/A",
      },
      {
        accessorKey: "delivery_status[0].clicked.value",
        header: "Clicked",
        cell: ({ row }) => row.original.delivery_status[0]?.clicked?.value || "0",
      },
      {
        accessorKey: "delivery_status[0].clicked.clickedAt",
        header: "Clicked At",
        cell: ({ row }) => row.original.delivery_status[0]?.clicked?.clickedAt ? new Date(row.original.delivery_status[0]?.clicked?.clickedAt).toLocaleString() : "N/A",
      },
      {
        accessorKey: "delivery_status[0].unsubscribed.value",
        header: "Unsubscribed",
        cell: ({ row }) => row.original.delivery_status[0]?.unsubscribed?.value || "0",
      },
      {
        accessorKey: "delivery_status[0].unsubscribed.unsubscribedAt",
        header: "Unsubscribed At",
        cell: ({ row }) => row.original.delivery_status[0]?.unsubscribed?.unsubscribedAt ? new Date(row.original.delivery_status[0]?.unsubscribed?.unsubscribedAt).toLocaleString() : "N/A",
      },
    

]
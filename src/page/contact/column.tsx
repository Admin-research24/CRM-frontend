import { useState } from "react";
import AlertConfirmation from "../../components/common/AlertConfirmation";
import { Button } from "../../components/ui/ui/button";
import { MdDelete } from 'react-icons/md';
import { TbRestore } from 'react-icons/tb';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/ui/dialog";
import { RowType } from "../../constant";
import UpdateContactForm from "../../components/form/contacts/updateContactForm";
import { useAppDispatch } from "../../store/Hooks";
import { Contact, deleteContactAsync } from "../../store/slices/contact";
import ComposeEmail from "../../components/common/ComposeEmail";
import { ColumnDef } from "@tanstack/react-table";

export const getContactColumns = (
  handleRowSelect: (row: Contact) => void,
  handleSelectAll: (allContacts: Contact[]) => void,
  selectedContacts: { id: string; email: string }[]
): ColumnDef<Contact, any>[] => [
  {
    accessorKey: 'select',
    header: ({ table }) => {
      const allContacts = table.getCoreRowModel().rows.map((row) => row.original);
      const isAllSelected = selectedContacts.length === allContacts.length && allContacts.length > 0;

      return (
        <input
          type="checkbox"
          checked={isAllSelected} 
          onChange={() => handleSelectAll(allContacts)} 
        />
      );
    },
    cell: ({ row }) => {
      const isRowSelected = selectedContacts.some((contact) => contact.id === row.original._id);

      return (
        <input
          type="checkbox"
          checked={isRowSelected}
          onChange={(event) => {
            row.getToggleSelectedHandler()(event); 
            handleRowSelect(row.original); 
          }}
        />
      );
    },
  },
  {
    accessorKey: 'idx',
    header: 'Sr No.',
    cell: ({ row }: { row: RowType }) => row.index + 1,
  },
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }: { row: RowType }) => (
      <span>
        {row.original.first_name} {row.original.last_name}
      </span>
    )
  },
  {
    accessorKey: "company_name",
    header: "Company",
  },
  {
    accessorKey: "work",
    header: "Mobile",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: RowType }) => {
      const email = row.getValue("email");
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
    accessorKey: "sent",
    header: "Sent",
    cell: ({ row }) => {
      const deliveryStatus = row.original.delivery_status_single_mail || [];
      const latestStatus = deliveryStatus.length
      return latestStatus
    },
  },
  {
    accessorKey: "opened",
    header: "Opened",
    cell: ({ row }) => {
      const deliveryStatus = row.original.delivery_status_single_mail || [];
      const latestStatus = deliveryStatus[deliveryStatus.length - 1]?.delivery_status[0];
      return latestStatus?.opened.value || 0; // Return opened value
    },
  },
  {
    accessorKey: "clicked",
    header: "Clicked",
    cell: ({ row }) => {
      const deliveryStatus = row.original.delivery_status_single_mail || [];
      const latestStatus = deliveryStatus[deliveryStatus.length - 1]?.delivery_status[0];
      return latestStatus?.clicked.value || 0; // Return clicked value
    },
  },
  {
    accessorKey: "unsubscribed",
    header: "Unsubscribed",
    cell: ({ row }) => {
      const deliveryStatus = row.original.delivery_status_single_mail || [];
      const latestStatus = deliveryStatus[deliveryStatus.length - 1]?.delivery_status[0];
      return latestStatus?.unsubscribed.value || 0; // Return unsubscribed value
    },
  },
  {
    accessorKey: "job_title",
    header: "Job title",
  },
  {
    accessorKey: "lifecycle_stage",
    header: "Stage",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "linkedin_username",
    header: "LinkedIn",
    cell: ({ row }: { row: RowType }) => {
      const linkedinUsername = row.original.linkedin_username;
      const linkedinUrl = `https://www.linkedin.com/in/${linkedinUsername}`;
      return (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {linkedinUsername}
        </a>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "sales_owner.email",
    header: "Owner",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: RowType }) => {
      const statusValue = row.getValue("status");

      let statusStyle = "";
      let displayText = statusValue;

      switch (statusValue) {
        case "New":
          statusStyle = "text-blue-500";
          break;
        case "Won":
          statusStyle = "text-green-500";
          break;
        case "Qualified":
          statusStyle = "text-yellow-500";
          break;
        default:
          statusStyle = "text-gray-500";
          break;
      }

      return <p className={statusStyle}>{displayText}</p>;
    },
  },
    {
      accessorKey: '_id',
      header: 'Action',
      cell: ({ row }: { row: RowType }) => {
        const dispatch = useAppDispatch();


        const deleteOffer = (id: string) => {
          dispatch(deleteContactAsync(id)).then(() => {
            // dispatch(getContactListAsync({ page: 1, limit: 10 }));
          });
        };



        return (
          <div className="flex gap-2 items-center">
            <Dialog
            >
              <DialogTrigger asChild>
                <Button
                  disabled={row.original.isDeleted}
                  className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center rounded bg-transparent text-gray-900  hover:bg-transparent hover:scale-125 transition-all duration-500 ease-in-out disabled:opacity-30"
                >
                  <EditNoteSharpIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80%] overflow-scroll">
                <DialogHeader>
                  <DialogTitle>Edit Offer</DialogTitle>
                  <DialogDescription>
                    Make changes to your Offer here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>

                <UpdateContactForm contact={row.original} />
              </DialogContent>
            </Dialog>

          <AlertConfirmation
            title="Are you sure?"
            description="This action cannot be undone"
            onConfirm={() => deleteOffer(row.getValue('_id'))}
          >
            {!row.original.isDeleted ? (
              <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center rounded bg-transparent text-destructive hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out">
                <MdDelete size={28} />
              </Button>
            ) : (
              <Button className="font-medium text-3xl text-center py-0.5 px-2 inline-flex items-center rounded bg-transparent text-destructive hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out">
                <TbRestore color="#FF8600" size={28} />
              </Button>
            )}
          </AlertConfirmation>


        </div>
      );
    },
  },
];

    // {
    //   accessorKey: "delivery_status_single_mail",
    //   header: "Email Status",
    //   cell: ({ row }) => {
    //     const deliveryStatus = row.original.delivery_status_single_mail || [];
  
    //     // Get the latest delivery status from the array (if there are multiple)
    //     const latestStatus = deliveryStatus[deliveryStatus.length - 1]?.delivery_status[0];
  
    //     return (
    //       <div>
    //         <div>Sent: {latestStatus?.sent.value || 0}</div>
    //         <div>Opened: {latestStatus?.opened.value || 0}</div>
    //         <div>Clicked: {latestStatus?.clicked.value || 0}</div>
    //         <div>Unsubscribed: {latestStatus?.unsubscribed.value || 0}</div>
    //       </div>
    //     );
    //   },
    // },
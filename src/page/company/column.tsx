import AlertConfirmation from "../../components/common/AlertConfirmation";
import { Button } from "../../components/ui/ui/button";
import { MdDelete } from "react-icons/md";
// import { RiEditBoxLine } from 'react-icons/ri';
import { TbRestore } from "react-icons/tb";
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
import {
  deleteContactAsync,
  // getContactListAsync,
} from "../../store/slices/contact";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../../../ui/ui/dialog';
export const companyColumn = [
  {
    accessorKey: "idx",
    header: "Sr No.",
    cell: ({ row }: { row: RowType }) => row.index + 1,
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },

  //   {
  //     accessorKey: "image",
  //     header: "Image",
  //     cell: ({ row }: { row: RowType }) => (
  //       <div className="h-12 w-12 object-cover overflow-hidden mx-auto border rounded-md">
  //         <img
  //           className="object-cover h-full w-full"
  //           src={ImageDomain + "/" + row.getValue("image")}
  //           alt=""
  //         />
  //       </div>
  //     ),
  //   },
  {
    accessorKey: "company_name",
    header: "Company",
    // cell: info => info.getValue(),

  },
  {
    accessorKey: "mobile_no",
    header: "Owner",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "job_title",
    header: "Job title",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: RowType }) => {
      // Corrected the conditional expression
      if (row.getValue("status") === "true") {
        return <p className="text-green-500">Active</p>;
      } else {
        return <p className="text-red-500">Deactive</p>;
      }
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }: { row: RowType }) => {
      const dispatch = useAppDispatch();

      const deleteOffer = (id: string) => {
        dispatch(deleteContactAsync(id)).then(() => {
          // dispatch(getContactListAsync());
        });
      };
      return (
        <div className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={row.original.isDeleted}
                className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center rounded bg-transparent text-gray-900  hover:bg-transparent hover:scale-125 transition-all duration-500 ease-in-out disabled:opacity-30 "
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
            onConfirm={() => deleteOffer(row.getValue("_id"))}
          >
            {!row.original.isDeleted ? (
              <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center  rounded bg-transparent text-destructive   hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out ">
                <MdDelete size={28} />
              </Button>
            ) : (
              <Button className="font-medium text-3xl text-center py-0.5 px-2 inline-flex items-center  rounded bg-transparent text-destructive   hover:bg-transparent hover:text-destructive hover:scale-125 transition-all duration-500 ease-in-out ">
                <TbRestore color="#FF8600" size={28} />
              </Button>
            )}
          </AlertConfirmation>
        </div>
      );
    },
  },
];

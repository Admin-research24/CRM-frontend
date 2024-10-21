import { AccountTree, WebStories } from "@mui/icons-material";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../../../components/ui/ui/dialog";
import ImportContactPage from "../../../components/form/contacts/ImportContact";
import { AlertDialogHeader } from "../../../components/ui/ui/alert-dialog";
import ImportCompanyPage from "../../../components/form/Copmany/ImportCompany";

export default function ImportDataPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(null); 
    const navigate = useNavigate();

    const handleDialogOpen = (dialogIndex: any) => {
        setOpenDialog(dialogIndex);
    };

    const handleDialogClose = () => {
        setOpenDialog(null);
    };

    const items = [
        {
            icon: <WebStories className="size-9" />,
            title: "Import History",
            description: "Keep track of every import you've ever done, with record-level details",
            path: "/import-history",
        },
        {
            icon: <CircleUserRound className="size-7" />,
            title: "Import Contact",
            description: "Import your Contacts using CSV and Xlsx files",
            dialogIndex: 1,
        },
        {
            icon: <AccountTree className="size-9" />,
            title: "Import Company",
            description: "Import your Company using CSV and Xlsx files",
            dialogIndex: 2,
        },
    ];

    return (
        <div className="">
            <div className="pl-7 pt-5">
                <h1 className="text-xl font-medium">Leads, Contact & Account</h1>
                <p>Manage the people & companies you sell to</p>
            </div>
            <div className="mt-8 flex justify-center gap-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative flex gap-3 p-5 rounded-lg transition-all duration-300 hover:bg-emerald-100 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() =>
                            item.path ? navigate(item.path) : handleDialogOpen(item.dialogIndex)
                        }
                    >
                        <div
                            className={`flex justify-center transition-transform duration-300 ${hoveredIndex === index ? "transform scale-100 items-center" : ""
                                }`}
                        >
                            {item.icon}
                        </div>
                        <div className="flex flex-col items-start">
                            <h3 className="text-base font-normal flex-wrap">{item.title}</h3>
                            <p
                                className={`transition-opacity text-xs duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog for Import Contact */}
            <Dialog open={openDialog === 1} onOpenChange={handleDialogClose}>

                <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                    <AlertDialogHeader>
                        <ImportContactPage />
                    </AlertDialogHeader>
                </DialogContent>
            </Dialog>

            {/* Dialog for Import Company */}
            <Dialog open={openDialog === 2} onOpenChange={handleDialogClose}>

                <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                    <AlertDialogHeader>
                        <ImportCompanyPage /> 
                    </AlertDialogHeader>
                </DialogContent>
            </Dialog>

            
        </div>
    );
}

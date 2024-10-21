import  { useEffect, useState } from "react";
import { AlertDialogHeader } from "../../ui/ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/ui/select";
import ImportContactPage from "../contacts/ImportContact";
import ImportCompanyPage from "../Copmany/ImportCompany";
import { useLocation } from "react-router-dom";
import FileUploadWithProgress from "../../common/dataSubmitEP";

export default function ImportHistoryPage() {
  const location = useLocation();
  const { progressData } = location.state || {};
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (progressData) {
      setShowProgress(true);
    }
  }, [progressData]);
  // State to manage which dialog is open
  const [openDialog, setOpenDialog] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(""); // State to manage the selected value of the dropdown

  // Function to handle dialog open state
  const handleDialogOpen = (dialogType: string) => {
    setOpenDialog(dialogType);
    setSelectedValue(""); // Reset the dropdown selection after dialog opens
  };

  // Function to handle dialog close state
  const handleDialogClose = () => {
    setOpenDialog("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="w-full flex items-center justify-end">
        {/* Dropdown to select import data type */}
        <div className="w-56">
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              setSelectedValue(value); // Update the selected value state
              handleDialogOpen(value); // Open the corresponding dialog
            }}
          >
            <SelectTrigger className="mr-4">
              <SelectValue placeholder="Import Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contact">Import Contact</SelectItem>
              <SelectItem value="company">Import Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dialog for Import Contact */}
      <Dialog open={openDialog === "contact"} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
          <AlertDialogHeader>
            <ImportContactPage />
          </AlertDialogHeader>
        </DialogContent>
      </Dialog>

      {/* Dialog for Import Company */}
      <Dialog open={openDialog === "company"} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <div className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
          <AlertDialogHeader>
            <ImportCompanyPage />
          </AlertDialogHeader>
        </DialogContent>
      </Dialog>

      {/* Progress bar section */}
      <div className="mt-4">
        {progressData && showProgress && <FileUploadWithProgress />}
      </div>
    </div>
  );
}

// import { CorporateFare } from "@mui/icons-material";
import {
  CheckIcon,
  ChevronDown,
  CircleCheck,
  // Contact,
  File,
  FolderUp,
  SeparatorHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/ui/alert-dialog";
import { Select } from "@mui/material";
import { Accept, useDropzone } from "react-dropzone";
import { Progress } from "../../ui/ui/progress";

const steps = [
  { label: "Upload Info" },
  { label: "Review Mapping" },
  { label: "Finalize Import" },
];

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(0);
  // const [selectedOption, setSelectedOption] = useState(null); // Default to null
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showMoreSettings, setShowMoreSettings] = useState(false);

  // for more settings
  const toggleMoreSettings = () => {
    setShowMoreSettings(!showMoreSettings);
  };
  const onDrop = (acceptedFiles:any) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      uploadFile(acceptedFiles[0]);
    }
  };

  const uploadFile = (file:any) => {
    const formData = new FormData();
    formData.append("file", file);

    // Simulate file upload with a timeout (replace this with actual file upload logic)
    setIsUploading(true);
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false); 
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: ".csv,.xlsx",
  //   maxSize: 5 * 1024 * 1024, // 5MB
  // });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    } as Accept, 
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  // const handleSelection = (option) => {
  //   setSelectedOption(option);
  // };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      console.log("Form submitted!");
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFile(null);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  const isPreviewDisabled = () => {
    // Disable the button only if it's step 1 and file is uploaded
    if (currentStep === 0 && file) {
      return false; // This will allow the button to trigger the AlertDialog
    }
    if (currentStep === 1 && file) {
      return false; // This will allow the button to trigger the AlertDialog
    }
    return currentStep === 0; // Disable if it's step 0, otherwise enabled
  };

  const isNextDisabled = () => {
    // if (currentStep === 0) {
    //   return !selectedOption;
    // }
    if (currentStep === 0) {
      return !file || isUploading; // Disable if no file or still uploading
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto m-0 p-0 ">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={`flex items-center justify-center mb-2 p-2 rounded-full ${
                currentStep === index
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 mx-2 ${
                  currentStep > index ? "bg-teal-600" : "bg-gray-200"
                }`}
              >
                {" "}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="my-8">
        {/* {currentStep === 0 && (
          <div>
            <div className="text-center font-bold text-xl">
              Tell us what your file contains
            </div>
            <div className="flex gap-3 mt-8">
              <div
                onClick={() => handleSelection("contacts")}
                className={`w-3/4 flex flex-col items-center justify-center border rounded-md h-48 p-4 cursor-pointer 
                ${
                  selectedOption === "contacts"
                    ? "border-cyan-950"
                    : "border-cyan-400"
                }`}
              >
                <Contact />
                <h3 className="text-lg font-medium">Contacts</h3>
                <p className="text-sm text-center">
                  My files contain information about people
                </p>
              </div>
              <div
                onClick={() => handleSelection("contactsAndCompanies")}
                className={`w-3/4 flex flex-col items-center justify-center border rounded-md h-48 p-4 cursor-pointer 
                ${
                  selectedOption === "contactsAndCompanies"
                    ? "border-cyan-600"
                    : "border-cyan-400"
                }`}
              >
                <div className="flex">
                  <Contact />
                  <CorporateFare />
                </div>
                <h3 className="text-lg font-medium">Contacts and Companies</h3>
                <p className="text-sm text-center">
                  My files contain information about people and their companies
                </p>
              </div>
            </div>
          </div>
        )} */}
        {currentStep === 0 && (
          <div className="">
            <h2 className="text-center font-bold text-2xl ">Upload your file</h2>
            <div className="flex justify-center mt-5">
              <div
                {...getRootProps()}
                className={`w-1/2 flex flex-col items-center justify-center border rounded-md h-48 p-4 border-cyan-400 ${
                  isDragActive ? "bg-cyan-100" : "red"
                }`}
              >
                <input {...getInputProps()} />
                <FolderUp className="w-10 h-10" />
                <Button className="mt-2" onClick={() => {}}>
                  Upload File
                </Button>
                <p className="text-sm font-bold text-slate-500 pt-2">
                  or Drag and Drop here
                </p>
                <p>(Support formats .csv, .xlsx; max file size 5MB)</p>

                {file && (
                  <div className="mt-4 w-full">
                    <p className="text-center text-sm font-bold text-slate-500">
                      {file.name}
                    </p>
                    <Progress
                      value={uploadProgress}
                      className="w-full mt-2"
                      color="cyan"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div>
            <div className="text-center">
              <h2>Review the mapping of your fields</h2>
              <p>
                we've mapped the columns in your file to fields in CRM--Take a
                look
              </p>
              <div>
                <table className="min-w-full text bg-white">
                  <thead>
                    <tr>
                      <th
                        className="py-2 px-4 border-b  border-gray-300 text-center text-gray-600 font-semibold"
                      >
                        Import
                      </th>
                      <th
                        className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold"
                      >
                        <div className="flex gap-1">
                          <File /> CSV column
                        </div>
                      </th>
                      <th
                        className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold"
                      >
                        Mapped
                      </th>
                      <th
                        className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold"
                      >
                        CRM field
                      </th>
                      <th
                        className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold"
                      >
                        Field type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-gray-50">
                      <td
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        <input type="checkbox" />
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        <div>
                          <h2>First Name</h2>
                          <p>Anurag</p>
                        </div>
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        <CircleCheck />
                      </td>
                      <td
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        <Popover
                        // open={open} onOpenChange={setOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              // aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
                              <SeparatorHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search framework..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {/* {frameworks.map((framework) => ( */}
                                  <CommandItem
                                  // key={framework.value}
                                  // value={framework.value}
                                  // onSelect={(currentValue) => {
                                  //   setValue(currentValue === value ? "" : currentValue)
                                  //   setOpen(false)
                                  // }}
                                  >
                                    {/* {framework.label} */}
                                    <CheckIcon
                                    // className={cn(
                                    //   "ml-auto h-4 w-4",
                                    //   value === framework.value ? "opacity-100" : "opacity-0"
                                    // )}
                                    />
                                  </CommandItem>
                                  {/* ))} */}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td
                        // key={cellIndex}
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        text field{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col ">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                Your file is ready to be imported
              </h2>
              <p className="text-gray-500 text-sm">
                Take a quick look at these settingsto make sure nothing is
                missed out
              </p>
            </div>
            <div className="border rounded-lg shadow-md p-10 w-3/4 pl-16 mt-2 ml-20 ">
              <div>
                <p>How do you want to import Contacts</p>
                <Select className="w-80 h-8" />
              </div>
              <div className="flex gap-2 mt-3 mb-3">
                <input type="checkbox" />
                Skip duplicate Contacts if their{" "}
                <Select className="w-32 h-6 border-none" /> matchs
              </div>
              <div>
                <p>Assign sales owner for unassigned Contact</p>
                <Select className="w-80 h-8" />
              </div>
              <h3
                className="mt-2 flex mb-3 cursor-pointer"
                onClick={toggleMoreSettings}
              >
                More settings <ChevronDown />
              </h3>
              <p>
                For the imported Contact, add more details like and lifecycle
                stage
              </p>

              {showMoreSettings && (
                <div className="container">
                  <div>
                    <p>Add tags</p>
                    <Select className="w-80 h-8" />
                  </div>
                  <div>
                    <p>Assign lifecycle stage</p>
                    <Select className="w-80 h-8" />
                  </div>
                  <div>
                    <p>Select SMS subscription status</p>
                    <Select className="w-80 h-8" />
                  </div>
                  <div>
                    <p>Select email subscription status</p>
                    <Select className="w-80 h-8" />
                  </div>
                  <div>
                    <p>Select WhatsApp subscription status</p>
                    <Select className="w-80 h-8" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        {(currentStep === 0 && file) || currentStep === 1 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                disabled={isPreviewDisabled()}
              >
                Previous
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>
                {currentStep === 1
                  ? "Are you sure you want to go to the previous step? This will remove the uploaded file."
                  : "Your field mapping will be discarded and you'll need to upload your file again. Sure you want to go back?"}
              </AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={handlePrevious}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            disabled={isPreviewDisabled()}
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-teal-600 text-white px-4 py-2 rounded"
          disabled={isNextDisabled()}
        >
      {currentStep === 2 ? "Submit" : "Next"}
      </button>
      </div>
    </div>
  );
}

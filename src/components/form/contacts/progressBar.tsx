import { CorporateFare } from "@mui/icons-material";
import {
  CheckIcon,
  ChevronDown,
  CircleCheck,
  Contact,
  File,
  FolderUp,
  SeparatorHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import { useDropzone } from "react-dropzone";
import { Progress } from "../../ui/ui/progress";
import { getCrmHeaderFieldListAsync, importContactFieldAsync, uploadExcelContactAsync } from "../../../store/slices/contact";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const steps = [
  { label: "File Info" },
  { label: "Upload Info" },
  { label: "Review Mapping" },
  { label: "Finalize Import" },
];

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showMoreSettings, setShowMoreSettings] = useState(false);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [responseJson, setResponseJson] = useState<any[]>([]);
  const [selectedFields, setSelectedFields] = useState<SelectedFieldsType>({});
  const [checkedItems, setCheckedItems] = useState<CheckedItemsType>({});
  const [matchedFields, setMatchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const CrmFHeaderFeild = useAppSelector(state => state.contact.allCrmfieldList)
  // console.log(CrmFHeaderFeild)

  // for more settings
  const toggleMoreSettings = () => {
    setShowMoreSettings(!showMoreSettings);
  };

  // upload excel velodation
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        uploadFile(acceptedFiles[0]);
      }
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 10 * 1024 * 1024,  // 10 MB
  });

  // upload file logic
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const response = await dispatch(uploadExcelContactAsync(file)).unwrap();

      const data = response.data[0]
      setResponseData(data);
      const newdata = response.data
      setResponseJson(newdata);
      toast.success("File uploaded successfully");
      setUploadProgress(100);
    }
    catch (error) {
      console.error('Upload failed:', error);
      toast.error(`File upload failed: ${error}`);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }

  };

  // fixed header API call
  useEffect(() => {
    if (responseData) {
      dispatch(getCrmHeaderFieldListAsync());
    }
  }, [responseData, dispatch]);


  // select crm field handle 
  const handleSelectField = (csvColumn: string, selectedField: string) => {
    setSelectedFields(prevState => {
      const updated = { ...prevState, [csvColumn]: selectedField };
      return updated;
    });

    setMatchedFields(prevState => {
      const updated = { ...prevState, [csvColumn]: selectedField };
      return updated;
    });

    setCheckedItems(prevState => {
      const updated = { ...prevState, [csvColumn]: Boolean(selectedField) };
      return updated;
    });
  };

  // auto mapping with jason data and limited header Api
  const autoMatchFields = () => {
    const newAutoMappedFields: { [key: string]: string } = {};  // Define the correct type
    if (!responseData) {
      // If responseData is null or undefined, return early or handle the case.
      return;
    }
    Object.entries(responseData).forEach(([key]) => {
      let match = CrmFHeaderFeild.find(field =>
        field.name.toLowerCase() === key.toLowerCase()
      );


      if (!match) {
        match = CrmFHeaderFeild.find(field => {
          const fieldNameLower = field.name.toLowerCase();
          const keyLower = key.toLowerCase();

          for (let i = 0; i <= fieldNameLower.length - 10; i++) {
            const substring = fieldNameLower.substring(i, i + 3);
            if (keyLower.includes(substring)) {
              return true;
            }
          }
          return false;
        });
      }

      newAutoMappedFields[key] = match ? match.name : '';
    });

    setCheckedItems(prevState => {
      const updatedCheckedItems: { [key: string]: boolean } = prevState ? { ...prevState } : {};
      Object.entries(newAutoMappedFields).forEach(([key, fieldName]) => {
        updatedCheckedItems[key] = !!fieldName;
      });
      return updatedCheckedItems;
    });

    setSelectedFields(newAutoMappedFields);
    setMatchedFields(newAutoMappedFields);

    // console.log('Auto-mapped fields:', newAutoMappedFields);
  };

  // mapping useeffect
  useEffect(() => {
    if (responseData && CrmFHeaderFeild.length > 0) {
      autoMatchFields();
    }
  }, [responseData, CrmFHeaderFeild]);


  // Function to handle checkbox change
  type CheckedItemsType = { [key: string]: boolean };
  type SelectedFieldsType = { [key: string]: string };

  const handleCheckboxChange = (key: string) => {
    setCheckedItems((prevState: CheckedItemsType) => {
      const newState: CheckedItemsType = { ...prevState, [key]: !prevState[key] };

      setMatchedFields((prevMatched: SelectedFieldsType) => ({
        ...prevMatched,
        [key]: newState[key] ? selectedFields[key] : '' // Unset field if unchecked
      }));

      setSelectedFields((prevSelected: SelectedFieldsType) => ({
        ...prevSelected,
        [key]: newState[key] ? selectedFields[key] : '' // Unset field if unchecked
      }));

      return newState;
    });
  };
  // contect and compnay selection
  const handleSelection = (option: any) => {
    setSelectedOption(option);
  };

  // handel submit
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const data = {
        matchedFields,
        responseJson,
        responseData: responseJson

      };

      await dispatch(importContactFieldAsync(data)).then(() => {
        // toast.success("Contact Import Successfully");
        const svgElement = document.querySelector(".lucide-x");
        const closeModalButton = svgElement ? svgElement.closest('button') : null;

        if (closeModalButton) {
          closeModalButton.click();
        } else {
          console.warn("Close button not found");
        }


        // navigate('/import-history', { state: { progressData: response } });
      });
      toast.success("Contact Import Successfully");

      // console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error(`Submission failed: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };




  // next button and submit button
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      handleSubmit();
    }
  };

  // previous button
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFile(null);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  // disable feture
  const isPreviewDisabled = () => {
    if (currentStep === 1 && file) {
      return false;
    }
    if (currentStep === 2 && file) {
      return false;
    }
    return currentStep === 0;
  };

  // next button
  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !selectedOption;
    }
    if (currentStep === 1) {
      return !file || isUploading;

    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto m-0 p-0 ">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={`flex items-center justify-center mb-2 p-2 rounded-full ${currentStep === index
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 mx-2 ${currentStep > index ? "bg-teal-600" : "bg-gray-200"
                  }`}
              >
                {" "}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="my-8">
        {currentStep === 0 && (
          <div>
            <div className="text-center font-bold text-xl">
              Tell us what your file contains
            </div>
            <div className="flex gap-3 mt-8">
              <div
                onClick={() => handleSelection("contacts")}
                className={`w-3/4 flex flex-col items-center justify-center border rounded-md h-48 p-4 cursor-pointer 
                ${selectedOption === "contacts"
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
                ${selectedOption === "contactsAndCompanies"
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
        )}
        {currentStep === 1 && (
          <div className="">
            <h2 className="text-center font-bold text-2xl ">Upload your file</h2>
            <div className="flex justify-center mt-5">
              <div
                {...getRootProps()}
                className={`w-1/2 flex flex-col items-center justify-center border rounded-md h-48 p-4 border-cyan-400 ${isDragActive ? "bg-cyan-100" : "red"
                  }`}
              >
                <input {...getInputProps()} />
                <FolderUp className="w-10 h-10" />
                <Button className="mt-2" onClick={() => { }}>
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
        {currentStep === 2 && (
          <div>
            <div className="text-center">
              <h2>Review the mapping of your fields</h2>
              <p>We've mapped the columns in your file to fields in CRM--Take a look</p>
              <div>
                <table className="min-w-full text bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold">
                        Import
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold">
                        <div className="flex gap-1">
                          <File /> CSV column
                        </div>
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold">
                        Mapped
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold">
                        CRM field
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-center text-gray-600 font-semibold">
                        Field type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData &&
                      Object.entries(responseData).map(([key, value], index) => {
                        const isChecked = checkedItems[key] || false;
                        const isMapped = selectedFields[key] || '';
                        const fieldType = CrmFHeaderFeild.find(field => field.name === isMapped)?.field_type || 'Text field';

                        return (
                          <tr key={index} className="even:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-300">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(key)}
                              />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                              <div>
                                <h2>{key}</h2>
                                <p>{value as string}</p>
                              </div>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                              <CircleCheck style={{ color: isChecked ? 'green' : (isMapped ? 'green' : 'red') }} />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-[200px] justify-between"
                                  >
                                    {isMapped || "Select CRM field"}
                                    <SeparatorHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search CRM field..."
                                      className="h-9"
                                    />
                                    <CommandList>
                                      <CommandEmpty>No CRM field found.</CommandEmpty>
                                      <CommandGroup>
                                        {CrmFHeaderFeild.map((field) => (
                                          <CommandItem
                                            key={field.value}
                                            onSelect={() => handleSelectField(key, field.name)}
                                          >
                                            {field.name}
                                            <CheckIcon
                                              className={`ml-auto h-4 w-4 ${isMapped === field.name ? "opacity-100" : "opacity-0"}`}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300">
                              {fieldType}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
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
        {(currentStep === 1 && file) || currentStep === 2 ? (
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
          {currentStep === 3 ? "Submit" : "Next"}
        </button>
        {isSubmitting && <p>Loading...</p>}
      </div>
    </div>
  );
}

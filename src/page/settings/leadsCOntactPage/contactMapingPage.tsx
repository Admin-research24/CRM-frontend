import { CircleUserRound, Pencil, Search, Trash } from "lucide-react";
import { Button } from "../../../components/ui/ui/button";
import { Add, Edit } from "@mui/icons-material";
import FolderIcon from '@mui/icons-material/Folder';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../../components/ui/ui/dialog";
import { Checkbox } from "../../../components/ui/ui/checkbox";
import { AlertDialogHeader } from "../../../components/ui/ui/alert-dialog";

import  { useState } from 'react';
import AddContactSchemaFrom, { CustomField } from "../../../components/form/settingForm/addcontectShemaFrom";
import AddGroupShemaFrom from "../../../components/form/settingForm/addGroupShemaFrom";
import EditContactShemaFrom from "../../../components/form/settingForm/editContactShemaFrom";

// Define a type for the section object
type Section = {
  id: number;
  name: string;
  type: string;
};

export default function ContactMappingPage() {
  // Specify the type for the sections state
  const [sections, setSections] = useState<Section[]>([]);

  const handleAddField = (field: CustomField) => {
    const fieldId = field.id !== undefined ? field.id : new Date().getTime();

    // Ensure the id is a number
    setSections((prevSections) => [
        ...prevSections,
        { id: fieldId, name: field.name, type: field.type } // Now id is always a number
    ]);
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="flex justify-center ">
        <div className="bg-white p-5 w-3/4">
          <div className="flex justify-between mb-2">
            <div className="flex gap-2 items-center">
              <CircleUserRound className="size-9" />
              <h3 className="text-lg font-medium">Contact</h3>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                  <div className="flex gap-3 items-center font-medium">
                    <Edit />Rename Module
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                <AlertDialogHeader className="">
                  {/* <ImportCompanyPage/> */}
                </AlertDialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <p>Add contacts faster with just the fields you need. Use default fields or add custom fields, and organize them into groups.</p>
        </div>
      </section>
      <section className="flex ml-44 mt-6">
        <div className="flex items-center border border-input bg-background rounded ring-offset-background w-2/5">
          <Search className="ml-5 text-gray-500 font-normal" />
          <input
            placeholder="Search field"
            className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </section>
      <section className="flex ml-44 mt-6">
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            <FolderIcon className="text-yellow-500" />
            <h2 className="text-base font-semibold">Basic Information</h2>
            <Dialog>
              <DialogTrigger>
                <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex items-center bg-transparent hover:bg-transparent hover:scale-105 transition-all duration-100 ease-in-out">
                  <div className="flex gap-3 items-center font-medium">
                    <Pencil className="size-4 ml-1 text-slate-600 cursor-pointer" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                <DialogTitle></DialogTitle>
                <AlertDialogHeader className="">
                  {/* <ImportCompanyPage /> */}
                </AlertDialogHeader>
              </DialogContent>
            </Dialog>
            <Trash className="size-4 ml-1 text-slate-600 cursor-pointer" />
          </div>
          <div className="flex gap-1 pl-[36.5rem]">
            <Dialog>
              <DialogTrigger>
                <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                  <div className="flex gap-3 items-center font-medium">
                    <Add />Add field
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                <DialogTitle>Add field</DialogTitle>
                <AlertDialogHeader className="">
                  <AddContactSchemaFrom onAddField={handleAddField} />
                </AlertDialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                  <div className="flex gap-3 items-center font-medium">
                    <Add />Add group
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                <DialogTitle>Add field</DialogTitle>
                <AlertDialogHeader className="">
                  <AddGroupShemaFrom/>
                </AlertDialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      {sections.map((section) => (
        <section key={section.id} className="newFrom flex ml-44 mt-4">
          <Accordion type="single" collapsible className="w-[85%] bg-white px-2">
            <AccordionItem value={`item-${section.id}`}>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <DragIndicatorIcon className="six" />
                  <TextFieldsIcon />
                  <h2 className="text-sky-700">{section.name}</h2>
                  <div className="flex ml-56 items-center gap-3">
                    <Checkbox /> <h2>Required</h2>
                    <Checkbox /> <h2>Quick-add</h2>
                  </div>
                </div>
                <AccordionTrigger></AccordionTrigger>
              </div>
              <AccordionContent>
                <Dialog>
                  <DialogTrigger>
                    <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                      <div className="flex gap-3 items-center font-medium">
                        <Pencil className="size-4" /> Edit
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
                    <AlertDialogHeader className="">
                      <EditContactShemaFrom />
                      {/* <ImportCompanyPage/> */}
                    </AlertDialogHeader>
                  </DialogContent>
                </Dialog>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      ))}
    </div>
  );
}

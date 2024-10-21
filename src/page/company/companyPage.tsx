import { Add } from "@mui/icons-material";
import { File, Import, ListFilter, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
// import DataTable from "../../components/common/DataTable";
import { AddCompanyFrom } from "../../components/form/Copmany/addCompany";
import { AlertDialogHeader } from "../../components/ui/ui/alert-dialog";
import { Button } from "../../components/ui/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../components/ui/ui/dialog";
// import { companyColumn } from "./column";
import ImportCompanyPage from "../../components/form/Copmany/ImportCompany";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/ui/tabs";
// import {  selectAllContactGivenList } from "../../store/slices/contact";
// import {  useAppSelector } from "../../store/Hooks";
// import AddContact from "../../components/form/contacts/addContact";

export default function CompanyPage() {
  const tableRef = useRef<null>(null);
  // const contactList = useAppSelector(selectAllContactGivenList);
  const [compact, setCompact] = useState(false);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "contacts",
    sheet: "data",
  });
  // const dispatch = useAppDispatch();
  // console.log(contactList);

  // useEffect(() => {
  //   dispatch(getContactListAsync());
  // }, [dispatch]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center   gap-16">
        <h1 className="text-3xl font-bold  text-indigo-950 mb-4">Company()</h1>
        <div className="flex justify-end gap-3">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
            <input
              placeholder="Search"
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Dialog>
            <DialogTrigger>
              <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out " >
                <div className="flex gap-3 items-center font-medium">
                  <Import /> Import Company
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl
         max-h-[92%] overflow-auto">
              <AlertDialogHeader className="">

                <ImportCompanyPage />
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => setCompact(prev => !prev)}

          >
            {compact ? 'Comfortable' : 'Compact'}
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md  ">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={onDownload} size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <div className="p-1">
                <Dialog  >
                  <DialogTrigger>
                    <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded  text-white   hover:scale-105 transition-all duration-100 ease-in-out " >
                      <div className="flex gap-3 items-center font-medium">
                        <Add /> Add Company
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl
         max-h-[92%] overflow-auto">
                    <AlertDialogHeader className="">
                      <DialogTitle className="text-center text-lg font-bold">Add Contact</DialogTitle>
                      {/* <UploadPremiumImage premiumCollections={row.original}/> */}
                      <AddCompanyFrom />
                    </AlertDialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* <DataTable tableRef={tableRef} columns={companyColumn} data={[]} compact={compact} /> */}
        </Tabs>
      </div>
    </div>
  );
}

import { Add } from "@mui/icons-material";
import { File, Import, ListFilter, Search, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import DataTable from "../../components/common/DataTable";
import { AddContact } from "../../components/form/contacts/addContact";
import { AlertDialogHeader } from "../../components/ui/ui/alert-dialog";
import { Button } from "../../components/ui/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../components/ui/ui/dialog";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { Contact, getContactListAsync, selectAllContactGivenList, selectCurrentPage, selectTotalContact } from "../../store/slices/contact";
import ImportContactPage from "../../components/form/contacts/ImportContact";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/ui/tabs";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/ui/dropdown-menu";
import Pagination from "../../components/common/Pagination";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/ui/command";
import FilterPage from "../../components/common/filterPage";
import { debounce } from "@mui/material";
import { getContactColumns } from "./column";
import ComposeBulkEmail from "../../components/common/BulkComposeEmail";
import { toast } from "react-toastify";
import { ITEM_PER_PAGE } from "../../constant";

export default function ContactPage() {
  const tableRef = useRef<null>(null);
  const contactList = useAppSelector(selectAllContactGivenList) || [];
  const totalContacts = useAppSelector(selectTotalContact);
  const currentPage = useAppSelector(selectCurrentPage);
  const [compact, setCompact] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const dispatch = useAppDispatch();
  const [isComposeOpen, setComposeOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<{ id: string; email: string }[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isSelectAllChecked, setSelectAllChecked] = useState(false);


  const handleOpenComposeMultiple = () => {
    if (selectedContacts.length === 0) {
      console.log("No contacts selected");
      toast.warning("Please select at least one contact");
      return;
    }

    const emails = selectedContacts.map((contact) => contact.email);
    setSelectedEmails(emails);
    console.log("Selected Emails:", emails);
    setComposeOpen(true);
  };

  const handleRowSelect = (row: Contact) => {
    setSelectedContacts((prev) => {
      const isAlreadySelected = prev.some((contact) => contact.id === row._id);
      if (isAlreadySelected) {
        return prev.filter((contact) => contact.id !== row._id);
      } else {
        return [...prev, { id: row._id, email: row.email }];
      }
    });
  };
  const handleSelectAll = (allContacts: Contact[]) => {
    if (isSelectAllChecked) {
      setSelectedContacts([]);
    } else {
      const allSelected = allContacts.map((contact) => ({ id: contact._id, email: contact.email }));
      setSelectedContacts(allSelected);
    }
    setSelectAllChecked(!isSelectAllChecked);
  };



  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'contacts',
    sheet: 'data',
  });

  const debouncedSearch = useRef(debounce((newSearchTerm) => {
    setDebouncedSearchTerm(newSearchTerm);
  }, 1000)).current;

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const fetchData = () => {

      dispatch(getContactListAsync({ page: currentPage, limit: ITEM_PER_PAGE, search: debouncedSearchTerm }));
    }
   
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 3000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId);
  }, [dispatch, currentPage, ITEM_PER_PAGE, debouncedSearchTerm]);

  useEffect(() => {
    if (contactList.length === 0) {
        const toastInterval = setInterval(() => {
            toast.warning("Please Login Again, Token expired");
        }, 3000);

        return () => clearInterval(toastInterval);
    }
}, [contactList]);
  const handlePageChange = (page: number) => {
    dispatch(getContactListAsync({ page, limit: ITEM_PER_PAGE, search: debouncedSearchTerm }));
  };


  const filteredContacts = contactList.filter((contact) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'Qualified') return contact.status === 'Qualified';
    if (activeTab === 'new') return contact.status === 'New';
    if (activeTab === 'won') return contact.status === 'Won';
    return true;
  });
  const contactColumn = getContactColumns(handleRowSelect, handleSelectAll, selectedContacts);
  const totalFilteredContacts = filteredContacts.length;
  const totalProducts = filteredContacts.length > 0 ? totalContacts : totalFilteredContacts;


  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-16">
        <h1 className="text-3xl font-bold text-indigo-950 mb-4">Contacts({totalContacts})</h1>
        <div className="flex justify-end gap-3">
          <div className="flex items-center border border-input bg-background rounded ring-offset-background">
            <Search className="ml-5 text-gray-500" />
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Dialog>
            <DialogTrigger>
              <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                <div className="flex gap-3 items-center font-medium">
                  <Import /> Import Contact
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[92%] overflow-auto">
              <AlertDialogHeader>
                <ImportContactPage />
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>

          <Button onClick={() => setCompact(prev => !prev)}>
            {compact ? 'Comfortable' : 'Compact'}
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md h-[37rem]  ">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Qualified">Qualified</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="won">Won</TabsTrigger>
              <TabsTrigger value="lost">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">+ Add more</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 h-80">
                    <div className="flex justify-between p-2">
                      <h2 className="font-medium">Select a View</h2>
                      <Dialog>
                        <DialogTrigger>
                          <Button>Add More</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg ml-[31%] mt-[2%] pt-2 pl-1 pr-1 h-[70%]  overflow-auto">
                          <AlertDialogHeader>
                            <FilterPage />
                          </AlertDialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <DropdownMenuSeparator />
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup className="overflow-y-auto">
                          <CommandItem value="all">All</CommandItem>
                          <CommandItem value="new">New</CommandItem>
                          <CommandItem value="won">Won</CommandItem>
                          <CommandItem value="lost">Lost</CommandItem>
                          <CommandItem value="qualified">Qualified</CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">

              <Button onClick={handleOpenComposeMultiple} variant="outline" size="sm" className="h-8 flex  gap-1 items-center">
                <Send className="h-3.5 w-3.5" />
                Bulk Email
              </Button>

              <ComposeBulkEmail
                open={isComposeOpen}
                handleClose={() => setComposeOpen(false)}
                initialTo={selectedEmails.join(", ")}
              />



              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={onDownload} size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
              </Button>
              <div className="p-1">
                <Dialog>
                  <DialogTrigger>
                    <Button className="font-medium text-xs text-center py-0.5 px-2 inline-flex bg-black items-center rounded text-white hover:scale-105 transition-all duration-100 ease-in-out">
                      <div className="flex gap-3 items-center font-medium">
                        <Add /> Add Contact
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[92%] overflow-auto">
                    <AlertDialogHeader>
                      <DialogTitle className="text-center text-lg font-bold">Add Contact</DialogTitle>
                      <AddContact />
                    </AlertDialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="h-[28rem] overflow-scroll border rounded-lg">

            <DataTable tableRef={tableRef} columns={contactColumn} data={filteredContacts} compact={compact} />
          </div>
          <Pagination
            page={currentPage}
            totalProducts={totalProducts}
            handlePage={handlePageChange}
          />
        </Tabs>
      </div>
    </div>
  );
}

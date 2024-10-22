import { File, Search } from "lucide-react";
import { Button } from "../../components/ui/ui/button";
import { useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import DataTable from "../../components/common/DataTable";
import { getSentLogColumns } from "./column";
import { Contact } from "../../store/slices/contact";

export default function SentMailPage() {
    const [compact, setCompact] = useState(false);
    const tableRef = useRef<null>(null);
    const [selectedContacts, setSelectedContacts] = useState<{ id: string; email: string }[]>([]);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'send-logs',
        sheet: 'data',
    });
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

    const sentLogColumn = getSentLogColumns(handleRowSelect);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex items-center gap-16">
                <h1 className="text-3xl font-bold text-indigo-950 mb-4">Sent Mail()</h1>
                <div className="flex justify-end gap-3">
                    <div className="flex items-center border border-input bg-background rounded ring-offset-background">
                        <Search className="ml-5 text-gray-500" />
                        <input
                            placeholder="Search"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="ring-ring max-w-sm h-10 w-80 font-bold px-3 py-2 text-sm file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
                <Button onClick={() => setCompact(prev => !prev)}>
                    {compact ? 'Comfortable' : 'Compact'}
                </Button>

            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <Button onClick={onDownload} size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                </div>
                {selectedContacts && (
                    <div className="flex justify-center items-center h-48">
                        <h1 className="text-3xl font-bold text-indigo-950 mb-4">Select Contact</h1>
                    </div>
                )
                }
                <DataTable tableRef={tableRef} columns={sentLogColumn} data={[]} compact={compact} />

            </div>
        </div>

    )
}

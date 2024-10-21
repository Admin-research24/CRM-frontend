import { useState } from "react";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/ui/select";
import { Button } from "../../../components/ui/ui/button";
import AddSalesSequences from "../../../components/form/SaleSequences/addSequences";
import { Separator } from "../../../components/ui/ui/separator";

const SalesSequences = () => {
    const [showAddSalesSequences, setShowAddSalesSequences] = useState(false);

    return (
        <div className="p-3 bg-gray-100 min-h-screen">
            {showAddSalesSequences ? (
                <div>
                    <Button
                        className="mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={() => setShowAddSalesSequences(false)}
                    >
                        Back
                    </Button>
                    <AddSalesSequences />
                </div>
            ) : (
                <div>
                    <div className="flex items-center gap-16 mb-4">
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
                            <div className='flex items-center gap-2'>
                                <h2>Showing:</h2>
                                <Select >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select (GMT+00:00) UTC" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="prateek">(GMT+00:00) UTC</SelectItem>
                                        <SelectItem value="anurag">(GMT+00:00) UTC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button onClick={() => setShowAddSalesSequences(true)}>
                                    Add Sequences
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Separator />
                </div>
            )}
        </div>
    );
};

export default SalesSequences;

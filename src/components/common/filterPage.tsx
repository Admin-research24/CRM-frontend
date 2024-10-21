import { CircleMinus, PlusCircle } from "lucide-react";
import { Button } from "../ui/ui/button";
import { Separator } from "../ui/ui/separator";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/ui/command";
import { useState } from "react";

export default function FilterPage() {
    const [showCommandList, setShowCommandList] = useState(false);
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [filterText, setFilterText] = useState("");
    const [isAddFieldVisible, setIsAddFieldVisible] = useState(true);
    const [initialCommandVisible, setInitialCommandVisible] = useState(true);

    const allFields = ["All", "Name", "Email", "Company"];

    const handleItemSelect = (field: string) => {
        if (!selectedFields.includes(field)) {
            setSelectedFields((prev) => [...prev, field]);
        }
        setShowCommandList(false);
        setIsAddFieldVisible(true);
        setInitialCommandVisible(false);
    };

    const handleFilterInputChange = (e: any) => {
        setFilterText(e.target.value);
    };

    const filteredFields = allFields.filter((field) =>
        field.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddFieldClick = () => {
        setIsAddFieldVisible(false);
        setShowCommandList(true);
    };
    const handleFieldDelete = (field: string) => {
        setSelectedFields((prev) => prev.filter((item) => item !== field)); // Remove the selected field
        if (selectedFields.length === 1) {
            setShowCommandList(true); // Show Command input again if it was the last field
            setIsAddFieldVisible(false); // Hide Add Field button if no fields are selected
        }
    };

    return (
        <div>
            <div className="p-0 ml-3">
                {isAddFieldVisible ? (
                    <div className="flex items-center gap-80 p-1">
                        <h2 className="font-medium">Filter</h2>
                        <h2
                            className="flex gap-2 items-center text-blue-700 font-medium cursor-pointer"
                            onClick={handleAddFieldClick}
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Field
                        </h2>
                    </div>
                ) : null}

                {initialCommandVisible || !isAddFieldVisible ? (
                    <Command className="rounded-md w-full md:w-96">
                        <CommandInput
                            placeholder="Search field to filter..."
                            onFocus={() => setShowCommandList(true)}
                        />
                        {showCommandList && (
                            <CommandList>
                                <CommandEmpty>No field found.</CommandEmpty>
                                <CommandGroup heading="Fields">
                                    {allFields.map((field) => (
                                        <CommandItem key={field} onSelect={() => handleItemSelect(field)}>
                                            {field}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        )}
                    </Command>
                ) : null}

                <Separator className="mt-3 w-full" />

                <div className="h-auto mt-4">
                    <h2 className="my-2">Selected Fields:</h2>

                    {selectedFields.length > 0 ? (
                        selectedFields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center justify-between mr-5">
                                    <p className="selected-item font-bold">{field}</p>
                                    <CircleMinus
                                        className="w-4 h-4 cursor-pointer"
                                        onClick={() => handleFieldDelete(field)} // Delete field on click
                                    />                                </div>
                                <Command className="rounded-md w-full md:w-96">
                                    <CommandInput
                                        placeholder={`Search to filter ${field}...`}
                                        value={filterText || ""}
                                        onInput={handleFilterInputChange}
                                    />
                                    {filterText && (
                                        <CommandList>
                                            <CommandEmpty>No field found.</CommandEmpty>
                                            <CommandGroup heading="Fields">
                                                {filteredFields.length > 0 ? (
                                                    filteredFields.map((filteredField) => (
                                                        <CommandItem key={filteredField} onSelect={() => handleItemSelect(filteredField)}>
                                                            {filteredField}
                                                        </CommandItem>
                                                    ))
                                                ) : (
                                                    <CommandEmpty>No matches found.</CommandEmpty>
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    )}
                                </Command>
                            </div>
                        ))
                    ) : (
                        <p>No fields selected yet.</p>
                    )}
                </div>
            </div>

            <div>
                <Separator className="absolute bottom-16 right-3" />
                <Button className="absolute bottom-3 right-3">Apply</Button>
            </div>
        </div>
    );
}

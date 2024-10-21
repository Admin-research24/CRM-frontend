import { Button } from "../../ui/ui/button";
import { Card, CardHeader, CardContent } from "../../ui/ui/card";
import { Checkbox } from "../../ui/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/ui/command";
import  { useState } from "react";

// Define a type for the custom field object
export type CustomField = {
    id?: number; // Optional ID
    name: string;
    type: string; // Make type a required string
};

// Define a type for the onAddField function
type AddContactSchemaFormProps = {
    onAddField?: (field: CustomField) => void;
};

const customFields = [
    { name: "Text field" },
    { name: "Text area" },
    { name: "Number" },
    { name: "Dropdown" },
    { name: "Checkbox" },
    { name: "Radio button" },
    { name: "Date picker" },
    { name: "Lookup" },
    { name: "Multiselect" },
    { name: "Formula" },
    { id: 1, name: "Tags", type: "Lookup" },
    { id: 2, name: "Source", type: "Dropdown" },
    { id: 3, name: "Lifecycle stage", type: "Dropdown" },
    { id: 4, name: "Status", type: "Dropdown" },
    { id: 5, name: "Lost reason", type: "Dropdown" },
    { id: 6, name: "Subscription status", type: "Dropdown" },
    { id: 7, name: "Subscription types", type: "Multiselect" },
    { id: 8, name: "Unsubscribe reason", type: "Dropdown" },
];

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

export default function AddContactSchemaForm({ onAddField }: AddContactSchemaFormProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelect = (frameworkValue: string) => {
        setSelectedValues((prevSelected) =>
            prevSelected.includes(frameworkValue)
                ? prevSelected.filter((value) => value !== frameworkValue)
                : [...prevSelected, frameworkValue]
        );
    };

    const handleSubmit = () => {
        if (onAddField) {
            const newField: CustomField = {
                id: new Date().getTime(), // Ensure it's a number
                name: `New Field ${new Date().getTime()}`,
                type: "Text field", // Example type
            };
            onAddField(newField); // Call with CustomField
        }
    };
    
    return (
        <div className="m-0">
            <div className="flex justify-center">
                <h2>(Or)</h2>
            </div>
            <div className="flex p-3 bg-white rounded-md shadow-md">
                <div className="w-1/2 border-r pr-4">
                    <Card className="h-96">
                        <CardHeader>{/* <Input placeholder="Search by fields" className="w-full" /> */}</CardHeader>
                        <CardContent>
                            <Popover open={true}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={true} className="w-full justify-between hidden">
                                        Select framework...
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-0 ml-2 h-960 p-0 fixed left-44 top-[12rem]">
                                    <Command className="w-[34rem] border-2">
                                        <CommandInput placeholder="Search framework..." />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        value={framework.value}
                                                        onSelect={() => handleSelect(framework.value)}
                                                        className="flex items-center cursor-pointer"
                                                    >
                                                        <Checkbox
                                                            checked={selectedValues.includes(framework.value)}
                                                            onCheckedChange={() => handleSelect(framework.value)}
                                                            className="mr-2"
                                                        />
                                                        {framework.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-1/2 pl-4">
                    <Card className="h-96">
                        <CardHeader>
                            <h2 className="text-lg font-bold">Select a custom field</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4">
                                {customFields.map((field, index) => (
                                    <Button key={index} variant="outline">
                                        {field.name}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-end pt-3 gap-5">
                <Button
                    className="bg-primary text-white"
                    type="button"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
                <Button
                    className="bg-secondary-foreground text-white"
                    type="button"
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}

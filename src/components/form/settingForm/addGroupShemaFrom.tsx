
import { Button } from "../../ui/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/ui/form";
import { Input } from "../../ui/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/ui/select";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../ui/ui/checkbox";
import { useState } from "react";import { z } from "zod";

const schema = z.object({
    sales_owner: z.string().nonempty("Sales Owner is required"),
    group_name: z.string().nonempty("Group Name is required"),
    internal_name: z.string().optional(),
    under_group: z.string().optional(),
});

export default function AddGroupSchemaForm() {
    const [isCustom, setIsCustom] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const form = useForm({
        resolver: zodResolver(schema), // Pass the schema here
        defaultValues: {
            group_name: "",
            internal_name: "",
            under_group: "",
            sales_owner: "", // Ensure this matches your schema
        },
    });

    const { control } = form; // Destructure control from the form object

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };
    return (
        <Form {...form}>
            <form className="space-y-4"
            // onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    name="sales_owner"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sales Owner Name</FormLabel>
                            <FormControl>
                                <div className="flex flex-col">
                                    {isCustom ? (
                                        <Input
                                            value={inputValue}
                                            onChange={(e) => {
                                                setInputValue(e.target.value);
                                                field.onChange(e.target.value);
                                            }}
                                            placeholder="Enter custom sales owner"
                                        />
                                    ) : (
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setInputValue(value); // Update inputValue when a selection is made
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Sales owner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="prateek">Prateek</SelectItem>
                                                <SelectItem value="anurag">Anurag</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                    <Button
                                        type="button"
                                        onClick={() => setIsCustom(!isCustom)}
                                        className="mt-2"
                                    >
                                        {isCustom ? "Switch to Select" : "Switch to Input"}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="internal_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl defaultValue={field.value}>
                                <Input
                                    className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...field}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center">
                    <Checkbox
                        checked={isChecked}
                        onCheckedChange={handleCheckboxChange}
                    />
                    <h1 className="ml-2">Nest this group under</h1>
                </div>
                <FormField
                    name="under_group"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group under</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={!isChecked} // Disable the select when checkbox is unchecked
                                // className={`w-full ${!isChecked ? 'bg-gray-200 cursor-not-allowed' : ''}`} // Optional styling for disabled state
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="prateek">Prateek</SelectItem>
                                        <SelectItem value="anurag">Anurag</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className="flex items-center gap-5">
                    <Button
                        className="bg-primary text-white"
                        // disabled={!form.formState.isValid}
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        className="bg-secondary-foreground text-white"
                        disabled={!form.formState.isValid}
                        // onClick={() => resetForm()}
                        type="button"
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Form>
    )
}



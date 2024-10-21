import { CirclePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/ui/select";

export default function ViewEmailTemplate() {
    return (
            <div className="m-0 p-0">
                <h2 className="font-semibold text-lg">Check conditions</h2>
                <h2 className="font-medium">Send this email if the conditions below are met </h2>
                <div className="p-3 bg-gray-100 rounded-md">
                    <div className="flex flex-col items-center justify-center ">
                        <div className="flex gap-2 text-cyan-700 cursor-pointer">
                            <CirclePlus className="w-4 " />
                            <h2>Add Condition</h2>
                        </div>
                        <span>(In the absence of conditions, this step will be executed for all Contacts in this sequence)</span>

                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-semibold text-lg mb-3">Enter email details</h2>
                    <span className="font-medium">Choose an email template</span>
                    <div className='w-80 mt-2'>
                        <Select >
                            <SelectTrigger>
                                <SelectValue placeholder="Click to select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="prateek">Follow up after a meeting</SelectItem>
                                <SelectItem value="anurag">Follow up active lead</SelectItem>
                                <SelectItem value="anurag">Follow up deal maled as won</SelectItem>
                                <SelectItem value="anurag">Follow up after a meeting</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 mt-2 items-center text-cyan-700 cursor-pointer">
                        <CirclePlus className="w-4 " />
                        <h2>Create email template</h2>
                    </div>

                </div>
            </div>
    )
}

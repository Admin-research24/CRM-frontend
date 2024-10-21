import { ChevronDown, CircleMinus, CirclePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/ui/select";
import React, { useEffect, useState } from "react";
import AddEmailTemplate from "../Email/addEmailTemplate";
import { Button } from "../../ui/ui/button";
import { Separator } from "../../ui/ui/separator";
import { Checkbox } from "../../ui/ui/checkbox";
import { Label } from "../../ui/ui/label";
import { Switch } from "../../ui/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/ui/card";
import { Badge } from "../../ui/ui/badge";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { GetAllEmailTemplateAsync, GetSingleEmailTemplateAsync } from "../../../store/slices/eTemplate";
import UpdateEmailTemplate from "../Email/updateEmailTemplate";
export interface AddEmailSequenceProps {
    onSave: (selectedDays: number | null, templateIds: string[], ) => void;
}
const AddEmailSequence: React.FC<AddEmailSequenceProps> = ({ onSave }) => {
    const [showAddEmailSequences, setShowAddEmailSequences] = useState(false);
    const [showViewEmailTemplate, setShowViewEmailTemplate] = useState(false);
    const [showViewEmailTemplatePage, setShowViewEmailTemplatePage] = useState(false);
    const [addCondition, setAddCondition] = useState(false)
    const [conditions, setConditions] = useState([{ id: 1, selectCondition: false }]);
    const [isAndSelected, setIsAndSelected] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState('new');
    const [selectedDays, setSelectedDays] = useState(1);
    const [templateId, settemplateId] = useState('');
    const [exitConditions, setExitConditions] = useState({
        signature: true,
        clicks: true,
        unsubscribed: true,
    });
    const dispatch = useAppDispatch();
    const emailTemplateList = useAppSelector((state) => state.emailTemplate.emailTemplates);
    const singleEmailTemplete = useAppSelector((state) => state.emailTemplate.singleEmailTemplate);
    // localStorage.setItem("templateId", templateId);
    const [templateIds, setTemplateIds] = useState<string[]>([]); 

    const handleToggleDropdown = (index: number) => {
        setIsDropdownOpen((prev) => (prev === index ? null : index));
    };

    const handleAddCondition = () => {
        setConditions([...conditions, { id: conditions.length + 1, selectCondition: false }]);
    };
    

    const handleConditionChange = (id: any) => {
        setConditions(conditions.map(condition =>
            condition.id === id ? { ...condition, selectCondition: true } : condition
        ));
    };

    const handleRemoveCondition = (id: any) => {
        setConditions(conditions.filter(condition => condition.id !== id));
    };

    const handleSwitchChange = () => {
        
        setIsAndSelected((prev) => !prev);
    };

    const handleTemplateSelection = (templateName: string) => {
        const selectedTemplate = emailTemplateList.find(item => item.template_name === templateName);
        if (selectedTemplate) {
            settemplateId(selectedTemplate._id); 
            setTemplateIds(prev => {
                // Prevent duplicates
                if (!prev.includes(selectedTemplate._id)) {
                    return [...prev, selectedTemplate._id];
                }
                return prev;
            });
            setShowViewEmailTemplate(true);
        } else {
            setShowViewEmailTemplate(false);
        }
    };

    const handleSave = () => {
       

        onSave(selectedDays, templateIds );
        console.log("Template ID in page2:", templateIds);
    };

    useEffect(() => {
        dispatch(GetAllEmailTemplateAsync())
        if (templateId) {
            dispatch(GetSingleEmailTemplateAsync(templateId));
        };
    }, [templateId, dispatch]);
    return (
        <div className=" absolute w-full top-20 left-3 p-3 pr-7 ">
            {showAddEmailSequences ? (
                <div>
                    <Button
                        className="mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={() => setShowAddEmailSequences(false)}
                    >
                        Back
                    </Button>
                    <AddEmailTemplate />
                </div>
            ) : showViewEmailTemplatePage ? (
                <div>
                    <Button
                        className="mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={() => setShowViewEmailTemplatePage(false)}
                    >
                        Back

                    </Button>
                    <UpdateEmailTemplate _id={templateId} />

                </div>
            ) : (
                <div className="m-0 p-0">
                    <h2 className="font-semibold text-lg">Check conditions</h2>
                    <h2 className="font-medium">
                        Send this email if the conditions below are met
                        <select
                            className="m-2 border border-gray-300 rounded p-1"
                            value={selectedDays}
                            onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 100 }, (_, i) => (
                                <option className="h-20" key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        if the conditions below are met
                    </h2>
                    {addCondition ? (
                        <div className="p-3 bg-gray-100 rounded-md">
                            {conditions.length > 1 && (
                                <div className="flex items-center space-x-2 mb-3">
                                    <Label htmlFor="condition-switch">AND</Label>
                                    <Switch
                                        id="condition-switch"
                                        checked={isAndSelected}
                                        onCheckedChange={handleSwitchChange}
                                    />
                                    <Label htmlFor="condition-switch">OR</Label>
                                </div>
                            )}
                            {conditions.map((condition, index) => (
                                <div key={condition.id} >
                                    {index > 0 && (
                                        <div className="relative my-6">
                                            <Separator />
                                            <h2 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 bg-blue-100 text-blue-700 py-1 px-3 rounded-md">
                                                {isAndSelected ? 'OR' : 'AND'}
                                            </h2>
                                        </div>
                                    )}
                                    <div className="flex gap-2 items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <h2 className="bg-slate-950 text-white rounded-full w-6 h-6 text-center mt-2">
                                                {condition.id}
                                            </h2>
                                            <div className="w-60 mt-2">
                                                <Select onValueChange={() => handleConditionChange(condition.id)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Click to select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="source">source</SelectItem>
                                                        <SelectItem value="compaign">compaign</SelectItem>
                                                        <SelectItem value="external_id">External ID</SelectItem>
                                                        <SelectItem value="contact">Contact team</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {condition.selectCondition && (
                                                <div className="flex gap-4">
                                                    <div className="w-32 mt-2">
                                                        <Select>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Click to select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="is_in">is in</SelectItem>
                                                                <SelectItem value="is_not_in">is not in</SelectItem>
                                                                <SelectItem value="is_empty">is empty</SelectItem>
                                                                <SelectItem value="is_not_empty">is not empty</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="w-60 mt-2">
                                                        <Select>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Click to select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="email">Email</SelectItem>
                                                                <SelectItem value="phone">phone</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <CircleMinus className="text-destructive cursor-pointer" onClick={() => handleRemoveCondition(condition.id)} />
                                    </div>

                                </div>

                            ))}
                            {conditions.length < 5 && (
                                <div className="flex gap-3 text-cyan-700 mt-2 cursor-pointer" onClick={handleAddCondition}>
                                    <CirclePlus className="w-4" />
                                    <h2>Add Condition</h2>
                                </div>
                            )
                            }

                        </div>
                    ) : (
                        <div className="p-3 bg-gray-100 rounded-md">
                            <div className="flex flex-col items-center justify-center " onClick={() => setAddCondition(true)}>
                                <div className="flex gap-2 text-cyan-700 cursor-pointer">
                                    <CirclePlus className="w-4 " />
                                    <h2>Add Condition</h2>
                                </div>
                                <span>(In the absence of conditions, this step will be executed for all Contacts in this sequence)</span>

                            </div>
                        </div>
                    )}
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg mb-3">Enter email details</h2>
                        <span className="font-medium">Choose an email template</span>
                        <div className='flex gap-3 items-center'>
                            <div className="w-80 mt-2 " >
                                <Select onValueChange={handleTemplateSelection} >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Click to select" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {emailTemplateList.map((item: any) => (
                                            <SelectItem key={item._id} value={item.template_name} className="cursor-pointer" >
                                                {item.template_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {showViewEmailTemplate && (
                                <div className="m-2">
                                    <div className="" onClick={() => setShowViewEmailTemplatePage(true)}                                        >
                                        <h2 className="text-sm font-medium  text-cyan-700 cursor-pointer">View / Edit email</h2>
                                    </div>
                                    <span className="text-xs">Last Edited: { } </span>

                                </div>
                            )
                            }
                        </div>
                        <div className="flex gap-2 mt-2 mb-2 items-center text-cyan-700 cursor-pointer" onClick={() => setShowAddEmailSequences(true)}>
                            <CirclePlus className="w-4 " />
                            <h2>Create email template</h2>
                        </div>
                        {showViewEmailTemplate && singleEmailTemplete && (
                            <Card className="mb-4">
                                <div className="flex gap-10 p-2">
                                    <CardHeader className="p-1">
                                        <CardTitle className="text-sm flex flex-wrap">Subject: {singleEmailTemplete.template_name}</CardTitle>
                                        <CardDescription>Created by: System Admin</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-sm text-gray-600">Last sent:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.lastSent || 'Never'}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Sent:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.sentCount}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Opened:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.openedCount}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Clicked:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.clickedCount}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Replied:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.repliedCount}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Unsubscribed:</p>
                                                <p className="font-medium text-center">{singleEmailTemplete.unsubscribedCount}</p>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter>
                                        <Badge className="bg-blue-500 text-white text-center">Public</Badge>
                                    </CardFooter>
                                </div>
                            </Card>
                        )}
                        <Separator />
                        <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => handleToggleDropdown(0)}>
                            <h2 className="text-base font-medium">
                                Advance settings
                            </h2>
                            <div>

                                <ChevronDown
                                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${isDropdownOpen === 0 ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </div>
                        <Separator />
                        {isDropdownOpen === 0 && (
                            <div>
                                <div className="p-3 mt-2">
                                    <h2 className="text-base font-medium">How do you want to see this email?</h2>
                                    <div className="flex gap-3 mt-3 ">

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="new thread"
                                                checked={selectedOption === 'new'}
                                                onCheckedChange={() => setSelectedOption('new')}
                                            />
                                            <Label htmlFor="new thread" className="text-sm text-slate-800 font-normal">
                                                Start a new thred
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="previous email"
                                                checked={selectedOption === 'privious'}
                                                onCheckedChange={() => setSelectedOption('privious')}
                                            />
                                            <Label htmlFor="previous email" className="text-sm text-slate-800 font-normal">
                                                replay to privious email
                                            </Label>
                                        </div>
                                    </div>
                                    <h2 className="text-base font-medium mt-5">Who is this email from?</h2>
                                    <div className="w-80 mt-2 ">
                                        <h2 className="text-sm mb-2">From</h2>
                                        <Select onValueChange={() => setShowViewEmailTemplate(true)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Click to select" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="prateek">Follow up after a meeting</SelectItem>
                                                <SelectItem value="active">Follow up active lead</SelectItem>
                                                <SelectItem value="deal">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="after">Follow up after a meeting</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-80 mt-2 ">
                                        <h2 className="text-sm mb-2">To</h2>
                                        <Select onValueChange={() => setShowViewEmailTemplate(true)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Click to select" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="prateek">Follow up after a meeting</SelectItem>
                                                <SelectItem value="active">Follow up active lead</SelectItem>
                                                <SelectItem value="deal">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="after">Follow up after a meeting</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-80 mt-2 ">
                                        <h2 className="text-sm mb-2">Cc</h2>
                                        <Select onValueChange={() => setShowViewEmailTemplate(true)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Click to select" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="prateek">Follow up after a meeting</SelectItem>
                                                <SelectItem value="active">Follow up active lead</SelectItem>
                                                <SelectItem value="deal">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="after">Follow up after a meeting</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-80 mt-2 ">
                                        <h2 className="text-sm mb-2">Bcc</h2>
                                        <Select onValueChange={() => setShowViewEmailTemplate(true)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Click to select" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="prateek">Follow up after a meeting</SelectItem>
                                                <SelectItem value="active">Follow up active lead</SelectItem>
                                                <SelectItem value="deal">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="after">Follow up after a meeting</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-4 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="signature"
                                                checked={exitConditions.signature}
                                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, signature: checked === true })}
                                            />
                                            <Label htmlFor="signature">Include sender's signature</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="clicks"
                                                checked={exitConditions.clicks}
                                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, clicks: checked === true })}
                                            />
                                            <Label htmlFor="clicks">Track open and clicks</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="unsubscribed"
                                                checked={exitConditions.unsubscribed}
                                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, unsubscribed: checked === true })}
                                            />
                                            <Label htmlFor="unsubscribed">Include link to unsubscribed</Label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                    <Separator />
                    <div className="flex gap-2 justify-end absolute right-0 top-[100%] bottom-0 mr-7 mb-3">
                        <Button>Cancel</Button>
                        <Button onClick={handleSave} >Save</Button>
                    </div>
                </div>
            )
            }

        </div>
    )
}
export default AddEmailSequence;

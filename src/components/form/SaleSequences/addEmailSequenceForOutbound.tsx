import React, { useState } from 'react'
import { Button } from '../../ui/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/ui/select';
import { ChevronDown, CirclePlus } from 'lucide-react';
import { Separator } from '../../ui/ui/separator';
import { Checkbox } from '../../ui/ui/checkbox';
import { Label } from '../../ui/ui/label';

export default function AddEmailSequenceForOutbound() {
    const [showAddEmailSequences, setShowAddEmailSequences] = useState(false);
    const [showViewEmailTemplate, setShowViewEmailTemplate] = useState(false);
    const [showViewEmailTemplatePage, setShowViewEmailTemplatePage] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState('new');
    const [exitConditions, setExitConditions] = useState({
        signature: true,
        clicks: true,
        unsubscribed: true,
        addDelay: false,
    });
    const handleToggleDropdown = (index: number) => {
        setIsDropdownOpen((prev) => (prev === index ? null : index));
    };
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
                    {/* <AddEmailTemplate /> */}
                </div>
            ) : showViewEmailTemplatePage ? (
                <div>
                    <Button
                        className="mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={() => setShowViewEmailTemplatePage(false)}
                    >
                        Back
                    </Button>

                </div>
            ) : (
                <div className="m-0 p-0">
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg mb-3">Enter email details</h2>
                        <span className="font-medium">Choose an email template</span>
                        <div className='flex gap-3 items-center'>
                            <div className="w-80 mt-2 ">
                                <Select onValueChange={() => setShowViewEmailTemplate(true)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Click to select" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                        <SelectItem value="lead">Follow up active lead</SelectItem>
                                        <SelectItem value="won">Follow up deal maled as won</SelectItem>
                                        <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {showViewEmailTemplate && (
                                <div className="m-2">
                                    <div className="" onClick={() => setShowViewEmailTemplatePage(true)}                                        >
                                        <h2 className="text-sm font-medium  text-cyan-700 cursor-pointer">View / Edit email</h2>
                                    </div>
                                    <span className="text-xs">Last Edited: Mon Aug 05, 2024 08:52 </span>

                                </div>
                            )
                            }
                        </div>
                        <div className="flex gap-2 mt-2 mb-2 items-center text-cyan-700 cursor-pointer" onClick={() => setShowAddEmailSequences(true)}>
                            <CirclePlus className="w-4 " />
                            <h2>Create email template</h2>
                        </div>
                        {showViewEmailTemplate && (
                            <div className="mb-2">
                                subject
                            </div>
                        )
                        }
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
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                                <SelectItem value="lead">Follow up active lead</SelectItem>
                                                <SelectItem value="won">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
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
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                                <SelectItem value="lead">Follow up active lead</SelectItem>
                                                <SelectItem value="won">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
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
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                                <SelectItem value="lead">Follow up active lead</SelectItem>
                                                <SelectItem value="won">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
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
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
                                                <SelectItem value="lead">Follow up active lead</SelectItem>
                                                <SelectItem value="won">Follow up deal maled as won</SelectItem>
                                                <SelectItem value="meeting">Follow up after a meeting</SelectItem>
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
                                <Separator />

                            </div>

                        )}

                    </div>
                    <div className='mt-3'>
                        <h2 className='text-lg font-medium'>Add delay before sending this email</h2>
                        <div className='mt-3 mb-3'>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="addDelay"
                                    checked={exitConditions.addDelay}
                                    onCheckedChange={(checked) => setExitConditions({ ...exitConditions, addDelay: checked === true })}
                                />
                                <Label htmlFor="addDelay">Add delay of</Label>
                                {/* {exitConditions.addDelay && ( */}
                                <div className="flex gap-4">
                                    <div className="w-32 mt-2">
                                        <Select disabled={!exitConditions.addDelay}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="2..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(30)].map((_, i) => (
                                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                        {i + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-60 mt-2">
                                        <Select disabled={!exitConditions.addDelay}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Days.." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="minutes">minutes</SelectItem>
                                                <SelectItem value="hours">hours</SelectItem>
                                                <SelectItem value="days">days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {/* )} */}
                            </div>

                        </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2 justify-end absolute right-0 top-[100%] bottom-0 mr-7 mb-3">
                        <Button>Cancel</Button>
                        <Button>Save</Button>
                    </div>
                </div>
            )
            }

        </div>
    )
}

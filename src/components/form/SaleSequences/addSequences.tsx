import React, { useState } from 'react';
import { Button } from '../../../components/ui/ui/button';
import { Checkbox } from '../../../components/ui/ui/checkbox';
import { Label } from '../../../components/ui/ui/label';
import { Input } from '../../../components/ui/ui/input';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/ui/select';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Separator } from '../../../components/ui/ui/separator';
import { CalendarIcon, CircleMinus, GripVertical, Linkedin, Mail, MailIcon, MessageCircle, Pencil, Phone } from 'lucide-react';
import { Task } from '@mui/icons-material';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/ui/dialog';
import AddEmailSequence from './addEmailSequence';
import AddEmailSequenceForOutbound from './addEmailSequenceForOutbound';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar } from '../../ui/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/ui/popover';
import { format } from 'date-fns';
import moment from 'moment-timezone';

const AddSalesSequences = () => {
    const [selectedOption, setSelectedOption] = useState('contacts');
    const [sequenceType, setSequenceType] = useState('classic');
    const [time, setTime] = useState('07:30');
    const [addContacts, setAddContacts] = useState(false);
    const [excludeDuplicates, setExcludeDuplicates] = useState(true);
    const [removeAfterDays, setRemoveAfterDays] = useState<number>(21);
    const [exitConditions, setExitConditions] = useState({
        allSteps: true,
        afterDays: true,
        noOwner: true,
        replied: true,
        bounced: true,
        unsubscribed: true,
    });
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('New Sequence');
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [recaps, setRecaps] = useState<{
        id: number;
        days: string | null;
        emailTemplateId: string;
        type: string;
        time_zone: string;
        dateTime: string;
    }[]>([]);
    const [isEmailDataSaved, setIsEmailDataSaved] = useState(false);
    const timeZones = moment.tz.names();

    const handleTimeZoneChange = (value: string) => {
        setSelectedTimeZone(value);
        console.log('Selected Time Zone:', value);
    };

    const removeRecap = (id: number) => {
        setRecaps(recaps.filter(recap => recap.id !== id));

    };

    const handleEmailDataSave = (selectedDays: number | null, templateIds: string[]) => {
        setIsEmailDataSaved(true);
        console.log('handleEmailDataSave called');
        const emailTemplateId = templateIds.length > 0 ? templateIds[0] : "";
        if (!emailTemplateId) {
            console.log("No email template ID provided. Recap not saved.");
            return; // Exit early if no email template is provided
        }
        const newRecap = {
            id: Date.now(),
            days: selectedDays ? selectedDays.toString() : "",
            emailTemplateId: emailTemplateId,
            type: 'email',
            dateTime: format(date!, 'yyyy-MM-dd') + " " + time,
            time_zone: selectedTimeZone,
        };
        setRecaps(prev => [...prev, newRecap]);
        console.log(newRecap);
    };



    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedRecaps = Array.from(recaps);
        const [movedRecap] = reorderedRecaps.splice(result.source.index, 1);
        reorderedRecaps.splice(result.destination.index, 0, movedRecap);

        setRecaps(reorderedRecaps);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };
    const handleExcludeDuplicatesChange = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setExcludeDuplicates(checked);
        }
    };

    const handleAddContactsChange = (checked: CheckedState) => {
        if (typeof checked === 'boolean') {
            setAddContacts(checked);
        }
    };


    const handleSave = async () => {
        const payload = {
            text,
            selectedOption,
            excludeDuplicates,
            addContacts,
            sequenceType,
            time,
            date,
            removeAfterDays,
            exitConditions,
            recaps,
        };

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data saved successfully:', data);
            // Optionally update your state or UI based on the response
            localStorage.removeItem("templateIds");
            localStorage.removeItem("templateId");
        } catch (error) {
            console.error('Error saving data:', error);

        }
    };
    return (
        <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
            <div className='flex gap-9 items-center' onClick={handleEditClick}>
                {isEditing ? (
                    <input type="text" value={text} onChange={handleChange} onBlur={handleBlur} className="text-xl font-semibold border-none outline-none" autoFocus
                    />
                ) : (
                    <>
                        <h2 className="text-xl font-semibold">{text}</h2>
                        <Pencil className='w-4 h-4' />
                    </>
                )}
            </div>

            <div className="mt-4 mb-5">
                <h3 className="text-md font-semibold">1. Who can enter your sequence?</h3>
                <div className="flex space-x-4 mt-2">
                    <Button variant={selectedOption === 'contacts' ? 'default' : 'outline'} onClick={() => setSelectedOption('contacts')}>Contacts</Button>
                    <Button variant={selectedOption === 'companies' ? 'default' : 'outline'} onClick={() => setSelectedOption('companies')}>Companies</Button>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="exclude-duplicates" checked={excludeDuplicates} onCheckedChange={handleExcludeDuplicatesChange} />
                        <Label htmlFor="exclude-duplicates">
                            Exclude duplicate contacts from this sequence
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="add-contacts" checked={addContacts} onCheckedChange={handleAddContactsChange} />
                        <Label htmlFor="add-contacts">Add contacts to the sequence</Label>
                    </div>

                    {addContacts && (
                        <div className="flex items-center space-x-2 mt-2">
                            <div className='w-44'>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Sales owner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeZones.map((timeZone) => (
                                            <SelectItem key={timeZone} value={timeZone}>
                                                {timeZone} ({moment.tz(timeZone).format('z')})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Separator />

            <div className="mt-4 mb-5">
                <h3 className="text-md font-semibold">2. What's your sequence type?</h3>
                <RadioGroup value={sequenceType} onValueChange={setSequenceType} className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outbound" id="outbound" />
                        <Label htmlFor="outbound">Outbound sequence</Label>
                        {sequenceType === 'outbound' && (
                            <div className="flex items-center space-x-2 mt-2">
                                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-28" />
                                <div className='w-48'>
                                    <Select >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select (GMT+00:00) UTC" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeZones.map((timeZone) => (
                                                <SelectItem key={timeZone} value={timeZone}>
                                                    {timeZone} ({moment.tz(timeZone).format('z')})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="classic" id="classic" />
                        <Label htmlFor="classic">Classic sequence</Label>
                        {sequenceType === 'classic' && (
                            <div className="flex items-center space-x-2 mt-2">
                                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-28" />
                                <div className='w-48'>
                                    <Select onValueChange={handleTimeZoneChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={selectedTimeZone || 'Select Time Zone'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeZones.map((timeZone) => (
                                                <SelectItem key={timeZone} value={timeZone}>
                                                    {timeZone} ({moment.tz(timeZone).format('z')})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">

                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md border"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="flex items-center  space-x-2">
                        <RadioGroupItem value="smart" id="smart" />
                        <Label htmlFor="smart">Smart sequence</Label>
                        {sequenceType === 'smart' && (
                            <div className="flex items-center space-x-2 mt-2">
                                <div className='w-40'>
                                    <Select >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Days" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="prateek">Every Day</SelectItem><SelectItem value="anurag">Every 2 Day</SelectItem><SelectItem value="anurag">Every 3 Day</SelectItem><SelectItem value="anurag">Every 4 Day</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <h2>at</h2>
                                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-28" />
                                <div className='w-48'>
                                    <Select ><SelectTrigger><SelectValue placeholder="Select (GMT+00:00) UTC" /> </SelectTrigger>
                                        <SelectContent>
                                            {timeZones.map((timeZone) => (
                                                <SelectItem key={timeZone} value={timeZone}>
                                                    {timeZone} ({moment.tz(timeZone).format('z')})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>
                        )}
                    </div>
                </RadioGroup>
            </div>
            <Separator />
            <div className=" mb-4 mt-4 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">3. What steps do you want Freshsales to execute?</h3>
                    {isEmailDataSaved && (
                        <div>
                            <p>sequence steps</p>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="recaps">
                                    {(provided: any) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {recaps.map((recap, index) => (
                                                <Draggable key={recap.id} draggableId={recap.id.toString()} index={index}>
                                                    {(provided: any) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='flex items-center space-x-4 mb-2'>
                                                            <CircleMinus className='w-5 h-5 text-red-600 cursor-pointer' onClick={() => removeRecap(recap.id)} />
                                                            <div className='ml-2 w-1/2'>
                                                                <div className='flex items-center space-x-2'>
                                                                    <div className='w-20'>
                                                                        <Select value={recap.days || undefined} 
                                                                            onValueChange={(value) => {
                                                                                setRecaps(prev => prev.map(r => r.id === recap.id ? { ...r, days: value } : r));
                                                                            }}>
                                                                            <SelectTrigger>
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {[...Array(30)].map((_, i) => (
                                                                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                                                        {i + 1} day
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <li className='text-gray-800'>Source is Email</li>
                                                                </div>
                                                                <div className='bg-white p-2 rounded-md flex items-center space-x-2 mt-2'>
                                                                    <GripVertical />
                                                                    <MailIcon />
                                                                    <div className='flex items-center gap-1'>
                                                                        <p>Send</p>
                                                                        <h2 className='text-blue-700'>Quick Recap of Our meeting and Next Step</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    )}

                    <div className="grid grid-cols-6 gap-4 mt-4">
                        {/* Email */}
                        <div className="text-center">
                            <Mail className="h-6 w-6 mx-auto mb-2" />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"
                                    >Add Email</Button>
                                </DialogTrigger>
                                <DialogContent className="h-[40rem] max-w-[70%]  overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add Mail</DialogTitle>
                                        <DialogDescription>
                                            Add Email. Click save when you're done.
                                        </DialogDescription>
                                        <Separator />
                                    </DialogHeader>
                                    {sequenceType === 'outbound' ? (
                                        <AddEmailSequenceForOutbound />
                                    ) : (
                                        <AddEmailSequence onSave={handleEmailDataSave} />
                                    )}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Email Reminder */}
                        <div className="text-center">
                            <Mail className="h-6 w-6 mx-auto mb-2" />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">Add Email Reminder</Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[80%] overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add Email Reminder</DialogTitle>
                                        <DialogDescription>
                                            Add Email Reminder here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* <UpdateContactForm contact={row.original} /> */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Task */}
                        <div className="text-center">
                            <Task className="h-6 w-6 mx-auto mb-2" />
                            <Dialog
                            >
                                <DialogTrigger asChild>

                                    <Button variant="outline" size="sm">Add Task</Button>

                                </DialogTrigger>
                                <DialogContent className="max-h-[80%] overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add Task</DialogTitle>
                                        <DialogDescription>
                                            Add your Task here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* <UpdateContactForm contact={row.original} /> */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* LinkedIn Task */}
                        <div className="text-center">
                            <Linkedin className="h-6 w-6 mx-auto mb-2" />
                            <Dialog
                            >
                                <DialogTrigger asChild>

                                    <Button variant="outline" size="sm">Add LinkedIn Task</Button>

                                </DialogTrigger>
                                <DialogContent className="max-h-[80%] overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add LinkedIn Task</DialogTitle>
                                        <DialogDescription>
                                            Add your LinkedIn Task here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* <UpdateContactForm contact={row.original} /> */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Call Reminder */}
                        <div className="text-center">
                            <Phone className="h-6 w-6 mx-auto mb-2" />
                            <Dialog
                            >
                                <DialogTrigger asChild>

                                    <Button variant="outline" size="sm">Add Call Reminder</Button>

                                </DialogTrigger>
                                <DialogContent className="max-h-[80%] overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add Call Reminder</DialogTitle>
                                        <DialogDescription>
                                            Add your Call Reminder here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* <UpdateContactForm contact={row.original} /> */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* SMS */}
                        <div className="text-center">
                            <MessageCircle className="h-6 w-6 mx-auto mb-2" />
                            <Dialog
                            >
                                <DialogTrigger asChild>

                                    <Button variant="outline" size="sm">Add SMS</Button>

                                </DialogTrigger>
                                <DialogContent className="max-h-[80%] overflow-scroll">
                                    <DialogHeader>
                                        <DialogTitle>Add SMS</DialogTitle>
                                        <DialogDescription>
                                            Add SMS here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* <UpdateContactForm contact={row.original} /> */}
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <Separator />

                {/* Step 4: How do contacts exit your sequence */}
                <div>
                    <h3 className="text-lg font-semibold">4. How do contacts exit your sequence?</h3>
                    <div className="space-y-4 mt-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="allSteps"
                                checked={exitConditions.allSteps}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, allSteps: checked === true })}
                            />
                            <Label htmlFor="allSteps">Remove contacts who've gone through all the steps</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="afterDays"
                                checked={exitConditions.afterDays}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, afterDays: checked === true })}
                            />
                            <Label htmlFor="afterDays">Remove contacts from sequence after</Label>
                            <Input
                                type="number"
                                value={removeAfterDays}
                                onChange={(e) => setRemoveAfterDays(Number(e.target.value))}
                                className="w-16"
                            />
                            <span>days</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="noOwner"
                                checked={exitConditions.noOwner}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, noOwner: checked === true })}
                            />
                            <Label htmlFor="noOwner">Remove contacts who don’t have an owner</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="replied"
                                checked={exitConditions.replied}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, replied: checked === true })}
                            />
                            <Label htmlFor="replied">Remove contacts who've replied to your email</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="bounced"
                                checked={exitConditions.bounced}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, bounced: checked === true })}
                            />
                            <Label htmlFor="bounced">Remove contacts whose email status is Bounced</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="unsubscribed"
                                checked={exitConditions.unsubscribed}
                                onCheckedChange={(checked) => setExitConditions({ ...exitConditions, unsubscribed: checked === true })}
                            />
                            <Label htmlFor="unsubscribed">Remove contacts who've unsubscribed</Label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <Button variant="outline" size="lg">Cancel</Button>
                <div className="space-x-2">
                    <Button variant="secondary" size="lg" onClick={handleSave}>Save</Button>
                    <Button variant="default" size="lg" onClick={handleSave}>Save and Start</Button>
                </div>
            </div>

        </div >
    );
};

export default AddSalesSequences;

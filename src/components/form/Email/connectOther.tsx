import { useState } from "react";
import { Label } from "../../ui/ui/label";
import { MessageCircleWarning } from "lucide-react";
import { Button } from "../../ui/ui/button";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../../ui/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/ui/dialog";
import OtherMailForm from "./otherMailForm";

export default function ConnectOther() {
    const [isWaySync, setIsWaySync] = useState('twoWay');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(0);
    };

    return (
        <div>
            <div>
                <RadioGroup
                    value={isWaySync}
                    onValueChange={setIsWaySync}
                    className="space-y-4 mt-4"
                >
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="twoWay" id="twoWay" />
                            <Label htmlFor="twoWay" className="text-base font-medium ">2-way sync</Label>
                            <h2 className="text-sm font-normal bg-slate-400 rounded-lg p-1">Recommended</h2>
                        </div>
                        <span className="ml-4 text-wrap text-sm ">Both incoming and outgoing emails are synced between the CRM and your email account</span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="oneWay" id="oneWay" />
                            <Label htmlFor="oneWay" className="text-base font-medium ">1-way sync</Label>
                            <div className="relative group">
                                <MessageCircleWarning className="w-4 h-4 cursor-pointer" />
                                <div className="absolute left-32 top-16 w-56 text-start transform -translate-x-1/2 -translate-y-full mb-2  bg-slate-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs">Both incoming and outgoing emails are synced between the CRM and your email account</span>
                                </div>
                            </div>
                        </div>

                        <span className="ml-4 text-wrap text-sm ">Both incoming and outgoing emails are synced between the CRM and your email account</span>
                    </div>
                </RadioGroup>
            </div>

            <h2 className="flex gap-2 items-center mt-3"><MessageCircleWarning className="w-4 h-4 cursor-pointer" />
                You can change this later in "Email sync settings"</h2>

            <div className="flex gap-2 justify-end mt-4">
                <Button onClick={handleCancel}>Cancel</Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Connect</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80%] max-w-[50%] overflow-scroll ">
                        <DialogHeader>
                            <DialogTitle>ZOHO/OTHERS</DialogTitle>
                        </DialogHeader>
                        <OtherMailForm />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

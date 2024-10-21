import { Card } from "../../ui/ui/card";
import GmailIcon from "../../../assets/icons8-gmail (1).svg";
import Gcalendar from "../../../assets/icons8-google-calendar.svg";
import Gconacts from "../../../assets/icons8-google-contacts.svg";

import { MessageCircleWarning } from "lucide-react";
import { Checkbox } from "../../ui/ui/checkbox";
import { useState } from "react";
import { Button } from "../../ui/ui/button";
import { useNavigate } from "react-router-dom";


export default function ConnectGmail() {
    const [isGmailChecked, setIsGmailChecked] = useState(true);
    const [isContactsChecked, setIsContactsChecked] = useState(true);
    const [isCalendarChecked, setIsCalendarChecked] = useState(true);
    const navigate = useNavigate();

    const cookies = document.cookie;
    const handleConnect = () => {


        const response = window.open("http://localhost:5000/auth/google", "_self")
        // dispatch(getConnectMailAsync());

        console.log(response)
    };

    console.log(cookies)
    const handleCancel = () => {
        navigate(0);
    };
    return (
        <div>
            <Card className="text-center p-2">
                <div className="w-full h-full flex gap-2 items-center justify-between">
                    <img src={GmailIcon} alt="Gmail" className="w-16 h-16" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-wrap text-base font-medium">Gmail</span>
                            <div className="relative group">
                                <MessageCircleWarning className="w-4 h-4 cursor-pointer" />
                                <div className="absolute left-32 top-16 w-56 text-start transform -translate-x-1/2 -translate-y-full mb-2  bg-slate-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h2 className="text-sm">2-way sync enabled</h2>
                                    <span className="text-xs">Both incoming and outgoing emails are synced between the CRM and your email account</span>
                                </div>
                            </div>
                        </div>
                        <span>Bring your email conversations into the CRM</span>
                    </div>
                    <Checkbox checked={isGmailChecked} onChange={() => setIsGmailChecked(!isGmailChecked)} />
                </div>
            </Card>

            <div className="mt-3 ">
                <h2 className="text-base font-semibold text-center mb-3">Connect other Google apps</h2>
                <div>
                    <Card className="text-center p-2 mb-3">
                        <div className="w-full h-full flex gap-2 items-center justify-between">
                            <img src={Gconacts} alt="Contacts" className="w-16 h-16" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-wrap text-base font-medium">Contacts</span>
                                </div>
                                <span>Sync your contacts with the CRM</span>
                            </div>
                            <Checkbox checked={isContactsChecked} onChange={() => setIsContactsChecked(!isContactsChecked)} />
                        </div>
                    </Card>
                    <Card className="text-center p-2">
                        <div className="w-full h-full flex gap-2 items-center justify-between">
                            <img src={Gcalendar} alt="Calendar" className="w-16 h-16" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-wrap text-base font-medium">Calendar</span>
                                </div>
                                <span>Sync your calendar with the CRM</span>
                            </div>
                            <Checkbox checked={isCalendarChecked} onChange={() => setIsCalendarChecked(!isCalendarChecked)} />
                        </div>
                    </Card>
                </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleConnect}>Connect</Button>
            </div>
        </div>
    );
}

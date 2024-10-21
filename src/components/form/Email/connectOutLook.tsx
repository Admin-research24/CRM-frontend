import { useState } from "react";
import { Checkbox } from "../../ui/ui/checkbox";
import { Label } from "../../ui/ui/label";
import { ChevronDown, MessageCircleWarning } from "lucide-react";
import { Button } from "../../ui/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "../../ui/ui/radio-group";

export default function ConnectOutLook() {
    const [isEwsConect, setIsEwsConnect] = useState({
        
        ewsConnect: false,
    });
    const [isWaySync, setIsWaySync] = useState('twoWay');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();


    const handleToggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleConnect = async () => {
        try {
            const payload = {
                isEwsConect: isEwsConect.ewsConnect,
                isWaySync: isWaySync,
            };

            const response = await axios.post('/api/connect-outlook', payload);

            console.log('Connection successful:', response.data);

        } catch (error) {
            // console.error('Connection failed:', error.response?.data || error.message);


        }
    };
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

            <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => handleToggleDropdown()}>
                <h2 className="text-base font-medium text-cyan-800">
                    Advance settings
                </h2>
                <div>

                    <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>
            {isDropdownOpen && (
                <div className="bg-slate-300 rounded-sm p-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="EWS"
                            checked={isEwsConect.ewsConnect}
                            onCheckedChange={(checked) => setIsEwsConnect({ ...isEwsConect, ewsConnect: checked === true })}
                        />
                        <Label htmlFor="EWS" className="text-base font-medium ">Connect via Exchange web services (EWS)</Label>
                    </div>
                </div>
            )}

            <div className="flex gap-2 justify-end mt-4">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleConnect}>Connect</Button>
            </div>
        </div>
    )
}

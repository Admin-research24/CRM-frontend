import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { Input } from "../../ui/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/ui/tabs";
import ReactQuill from "react-quill";
import { Button } from "../../ui/ui/button";
import { useEffect, useRef, useState } from "react";
import {  Formats, Modules } from "../../../constant";
// import { CodeIcon, DeleteIcon, Download } from "lucide-react";

import {
    AttachFile as AttachFileIcon,
    // Send as SendIcon,
    Delete as DeleteIcon,

    // Code as CodeIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { Download } from "lucide-react";
import { getCrmHeaderFieldListAsync } from "../../../store/slices/contact";
import { GetSingleEmailTemplateAsync, UpdateEmailTemplateAsync } from "../../../store/slices/eTemplate";

export default function UpdateEmailTemplate({ _id }: { _id: string }) {
    const [body, setBody] = useState("");
    const [subject, setSubject] = useState("");
    const [templateName, setTemplateName] = useState('');
    const [signature, setSignature] = useState("Best regards,\nYour Name");
    const [isEditing, setIsEditing] = useState(false);
    const [isHtmlMode, setIsHtmlMode] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<(string | null)[]>([]);
    const [plainTextBody, setPlainTextBody] = useState("");
    const [isSignatureHtmlMode, setIsSignatureHtmlMode] = useState(false);
    const quillRef = useRef<ReactQuill | null>(null);
    const quillRefSignature = useRef<ReactQuill | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const CrmFHeaderFeild = useAppSelector(state => state.contact.allCrmfieldList)
    console.log(CrmFHeaderFeild)
    const emailTemplate = useAppSelector(state => state.emailTemplate.singleEmailTemplate)
    console.log(emailTemplate)
    const dispatch = useAppDispatch();
    const userId = localStorage.getItem('userId');
    const teamId = localStorage.getItem('teamId');
    const isValidField = (name: string): name is keyof typeof fieldMapping => {
        return name in fieldMapping;
    };

    
    const handleSelectChange = (value: string) => {
        // Append the selected value to the ReactQuill content
        setBody(prevBody => `${prevBody} ${value}`);
    };
    const handleInsertSignature = () => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const cursorPosition = quill.getSelection()?.index || 0;
            const signatureHtml = signature;
            // Insert the HTML content into the Quill editor at the cursor position
            quill.root.innerHTML = [
                quill.root.innerHTML.slice(0, cursorPosition),
                signatureHtml,
                quill.root.innerHTML.slice(cursorPosition)
            ].join('');
        }
    };

    const handleSaveSignature = () => {
        handleInsertSignature();
        setIsEditing(false);
    };

    const toggleHtmlMode = () => {
        if (isHtmlMode) {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                setBody(quill.root.innerHTML);
                setPlainTextBody(htmlToPlainText(quill.root.innerHTML));
            }
        } else {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                setBody(quill.root.innerHTML);
            }
        }
        setIsHtmlMode(!isHtmlMode);
    };

    const htmlToPlainText = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    useEffect(() => {
        setPlainTextBody(htmlToPlainText(body));
    }, [body]);

    const toggleSignatureHtmlMode = () => {
        if (isSignatureHtmlMode) {
            const tempElement = document.createElement("div");
            tempElement.innerHTML = signature;
            const plainTextSignature = tempElement.innerHTML || "";

            setSignature(plainTextSignature);
        } else {
            if (quillRefSignature.current) {
                const quill = quillRefSignature.current.getEditor();
                const htmlSignature = quill.root.innerHTML;
                setSignature(htmlSignature);
            }
        }
        setIsSignatureHtmlMode(!isSignatureHtmlMode);
    };

    const handleHtmlInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleSignatureInputChange = (content: string) => {
        setSignature(content);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        setAttachedFiles((prevFiles) => [...prevFiles, ...newFiles.slice(0, 5)]); // Limit to 5 attachments

        const newPreviews: (string | null)[] = [];
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileContent = reader.result as string;
                newPreviews.push(fileContent);
                if (newPreviews.length === newFiles.length) {
                    setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAttachFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleDeleteFile = (index: number) => {
        const updatedFiles = attachedFiles.filter((_, i) => i !== index);
        setAttachedFiles(updatedFiles);

        const updatedPreviews = filePreviews.filter((_, i) => i !== index);
        setFilePreviews(updatedPreviews);
    };


    const handleSend = async () => {
        const formData = new FormData();
        formData.append("template_name", templateName || emailTemplate?.template_name || "");
        formData.append("subject", subject || emailTemplate?.subject || "");
        formData.append("html", body || emailTemplate?.html || "");
        formData.append("text", plainTextBody || emailTemplate?.text || "");
        formData.append("signature", signature || emailTemplate?.signature || "");
        formData.append("user_id", userId || "");
        formData.append("team_id", teamId || "");

        console.log("Attached Files:", attachedFiles);

        attachedFiles.slice(0, 5).forEach((file) => {
            if (file instanceof File) {
                formData.append("files", file);
            } else {
                console.error("Item is not a valid File:", file);
            }
        });

        dispatch(UpdateEmailTemplateAsync({ form: formData, _id: _id })).then((response) => {
            if (response.payload) {
                toast.success("Email Template Updated Successfully");

            } else {
                toast.error("Failed to update email template");
            }
        });

    };


    const handleDiscard = () => {
        setSubject("");
        setBody("");
        setAttachedFiles([]);
        setFilePreviews([]);
    };

    useEffect(() => {
        dispatch(getCrmHeaderFieldListAsync());
        dispatch(GetSingleEmailTemplateAsync(_id));

    }, [dispatch]);

    const fieldMapping = {
        "First Name": "{{contact.first_name}}",
        "Last Name": "{{contact.last_name}}",
        "Job Title": "{{contact.job_title}}",
        "Email Address": "{{contact.email}}",
        "Mobile Number": "{{contact.mobile}}",
        "Work Number": "{{contact.work}}",
        "Owner": "{{contact.owner}}",
        "External ID": "{{contact.external_id}}",
        "Lifecycle Stage": "{{contact.lifecycle_stage}}",
        "Status": "{{contact.status}}",
        "Tags": "{{contact.tags}}",
        "Address": "{{contact.address}}",
        "City": "{{contact.city}}",
        "State": "{{contact.state}}",
        "Zip Code": "{{contact.zip_code}}",
        "Country": "{{contact.country}}",
        "Source": "{{contact.source}}",
        "Medium": "{{contact.medium}}",
        "Keyword": "{{contact.keyword}}",
        "Facebook Username": "{{contact.facebook}}",
        "Twitter Username": "{{contact.twitter}}",
        "LinkedIn Username": "{{contact.linkedin}}",
        "Company_Name": "{{contact.company_name}}",
        "Warehouse": "{{contact.warehouse}}"
    };

    return (

        <div className="m-0 p-0 w-full">
            {emailTemplate && (
                <div key={emailTemplate._id} >
                    <Input className="m-0 pl-5 " type="text" placeholder="Template Name" value={templateName || emailTemplate.template_name}
                        onChange={(e) => setTemplateName(e.target.value)} />
                    <Input className="mt-3 pl-5" type="text" placeholder="Write a subject line" value={subject || emailTemplate.subject}
                        onChange={(e) => setSubject(e.target.value)} />
                    <div className="mt-3 ">
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Click to select" />
                            </SelectTrigger>
                            <SelectContent>
                                <Tabs defaultValue="contact">
                                    <div className="flex items-center">
                                        <TabsList>
                                            <TabsTrigger value="contact">Contact fields</TabsTrigger>
                                            <TabsTrigger value="company">Company fields</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="contact">
                                        {CrmFHeaderFeild.filter(item => item.field_type === "Text").map((field, index) => (
                                            isValidField(field.name) ? (
                                                <SelectItem key={index} value={fieldMapping[field.name]}>
                                                    {field.name}
                                                </SelectItem>
                                            ) : null
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="company">
                                        {CrmFHeaderFeild.filter(item => item.field_type === "Text").map((field, index) => (
                                            isValidField(field.name) ? (
                                                <SelectItem key={index} value={fieldMapping[field.name]}>
                                                    {field.name}
                                                </SelectItem>
                                            ) : null
                                        ))}
                                    </TabsContent>
                                </Tabs>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>

                        <Box className="mt-4">
                            {isHtmlMode ? (
                                <TextField
                                    label="HTML Input"
                                    multiline
                                    rows={10}
                                    value={body || emailTemplate.html}
                                    onChange={handleHtmlInputChange}
                                    className="bg-white w-full rounded-lg shadow-sm"
                                />
                            ) : (
                                <ReactQuill
                                    ref={quillRef}
                                    value={body || emailTemplate.html}
                                    onChange={setBody}
                                    className="bg-white rounded-lg shadow-sm"
                                    modules={Modules}
                                    formats={Formats}
                                    placeholder="Compose your email..."
                                />
                            )}
                        </Box>
                        <Button
                            onClick={toggleHtmlMode}
                            className="mt-2 text-green-600 hover:text-green-800"
                            // startIcon={<CodeIcon />}
                        >
                            {isHtmlMode ? "Convert into Mail" : "HTML Code"}
                        </Button>
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 ml-2 text-blue-600 hover:text-blue-800"
                        >
                            Insert Signature
                        </Button>

                        {isEditing && (
                            <div>
                                {isSignatureHtmlMode ? (
                                    <TextField
                                        label="HTML Signature"
                                        multiline
                                        rows={5}
                                        value={signature}
                                        onChange={(e) => setSignature(e.target.value)}
                                        className="bg-white w-full rounded-lg shadow-sm"
                                    />

                                ) : (
                                    <ReactQuill
                                        ref={quillRefSignature}
                                        value={signature || emailTemplate.signature}
                                        onChange={handleSignatureInputChange}
                                        className="bg-white mt-2 rounded-lg shadow-sm"
                                        modules={Modules}
                                        formats={Formats}
                                        placeholder="Compose your signature..."
                                    />
                                )}
                                <div className="flex gap-2 mt-2 items-center">
                                    <Button
                                        onClick={handleSaveSignature}
                                        className="mt-2"
                                        style={{
                                            backgroundColor: "#004D40",
                                            color: "white",
                                            borderRadius: "0.5rem",
                                            padding: "0.5rem 1rem",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            transition: "background-color 0.3s ease",
                                        }}
                                    >
                                        Save
                                    </Button>

                                    <Button
                                        onClick={toggleSignatureHtmlMode}
                                        className="mt-2 text-green-600 hover:text-green-800"
                                        // startIcon={<CodeIcon />}
                                        style={{
                                            backgroundColor: "#004D40",
                                            color: "white",
                                            borderRadius: "0.5rem",
                                            padding: "0.5rem 1rem",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            transition: "background-color 0.3s ease",
                                        }}
                                    >
                                        {isSignatureHtmlMode ? "Convert into Text" : "HTML Signature"}
                                    </Button>
                                </div>


                            </div>
                        )}
                        <Box className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {filePreviews.map((preview, index) => (
                                <Box
                                    key={index}
                                    className="border rounded-lg p-2 relative"
                                    onClick={() => {
                                        if (preview) {
                                            const file = attachedFiles[index];
                                            const blob = new Blob([file], { type: file.type });
                                            const url = URL.createObjectURL(blob);

                                            window.open(url, '_blank');

                                            setTimeout(() => URL.revokeObjectURL(url), 100);
                                        }
                                    }}
                                >
                                    {attachedFiles[index].type.includes("pdf") && preview && (
                                        <iframe
                                            src={preview}
                                            title={`PDF Preview ${index}`}
                                            width="100%"
                                            height="200px"
                                            style={{ border: "none" }}
                                        />
                                    )}
                                    {attachedFiles[index].type.includes("image") && preview && (
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            width="100%"
                                            style={{ maxHeight: "200px", objectFit: "contain" }}
                                        />
                                    )}
                                    {(attachedFiles[index].type.includes("csv") || attachedFiles[index].type.includes("excel")) && (
                                        <div className="text-center text-gray-600">{attachedFiles[index].name}</div>
                                    )}
                                    <Box className="absolute top-2 right-2 flex space-x-2">
                                        <Tooltip title="Download">
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const link = document.createElement("a");
                                                    link.href = preview || "";
                                                    link.download = attachedFiles[index].name;
                                                    link.click();
                                                }}
                                                className="text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                <Download />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteFile(index);
                                                }}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <div className="flex text-center bg-teal-900 text-white rounded-md h-16 items-center justify-center mt-2">
                                        {attachedFiles[index].name}
                                    </div>
                                </Box>
                            ))}
                        </Box>
                        <Box className="p-4 bg-gray-50 flex justify-between  items-center">
                            <Box >
                                <Tooltip title="Attach File">
                                    <IconButton
                                        onClick={handleAttachFileClick}
                                        disabled={attachedFiles.length >= 5}
                                        className="text-gray-800 hover:text-gray-900 transition-colors cursor-auto"
                                    >
                                        <AttachFileIcon className="" />
                                        <h2 className="text-sm text-gray-700">Attech File</h2>
                                    </IconButton>
                                </Tooltip>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileUpload}
                                    multiple
                                    disabled={attachedFiles.length >= 5}
                                />
                            </Box>
                            <Box className="flex gap-2 ">
                                <Button
                                    onClick={handleDiscard}
                                    // startIcon={<DeleteIcon />}
                                    style={{
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
                                >
                                    Discard
                                </Button>

                                <Button
                                    // startIcon={<SendIcon />}
                                    onClick={handleSend}
                                    style={{
                                        backgroundColor: '#004D40',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                                >
                                    Send
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            )}
        </div>



    )
}

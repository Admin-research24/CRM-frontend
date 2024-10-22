import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  ArrowDropDown as ArrowDropDownIcon,
  // Code as CodeIcon,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_URL, Formats, Modules } from "../../constant";
import { Download } from "lucide-react";
import { useAppDispatch } from "../../store/Hooks";
import { Button } from "../ui/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/ui/select";
import { useAppSelector } from "../../store/Hooks";
import { GetAllEmailTemplateAsync, GetSingleEmailTemplateAsync } from "../../store/slices/eTemplate";
// import { PostNewEmailAsync } from "../../store/slices/email";

interface ComposeEmailProps {
  open: boolean;
  handleClose: () => void;
  initialTo?: string;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({
  open,
  handleClose,
  initialTo,
}) => {
  const [to, setTo] = useState<string[]>(initialTo ? [initialTo] : []);
  const [cc, setCc] = useState<string[]>([]);
  const [bcc, setBcc] = useState<string[]>([]);
  const [currentToInput, setCurrentToInput] = useState('');
  const [currentCcInput, setCurrentCcInput] = useState('');
  const [currentBccInput, setCurrentBccInput] = useState('');
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<(string | null)[]>([]);
  const [signature, setSignature] = useState("Best regards,\nYour Name");
  const [isEditing, setIsEditing] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [plainTextBody, setPlainTextBody] = useState("");
  const [isSignatureHtmlMode, setIsSignatureHtmlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const quillRefSignature = useRef<ReactQuill | null>(null);
  const from = localStorage.getItem('LoginEmail') || '';
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateId, setTemplateId] = useState('');

  const dispatch = useAppDispatch();
  const emailTemplateList = useAppSelector((state) => state.emailTemplate.emailTemplates);
  const templateContent = useAppSelector((state) => state.emailTemplate.singleEmailTemplate);

  useEffect(() => {
    if (templateContent && templateContent.html) {
      const textContent =  templateContent.html;
      setBody(textContent);
    }
  }, [templateContent]);

  useEffect(() => {
    if (initialTo) {
      setTo(initialTo.split(/[,;]\s*/).filter(email => email.trim() !== ''));
    }
  }, [initialTo]);


  const token = localStorage.getItem('cmsToken');

  const bodyHtml = body.replace(/<\/?body>/g, "").trim(); // Remove any existing <body> or </body> tags from the content
  const finalHtmlBody = `<body>\n${bodyHtml}\n</body>`;  
  const handleSend = async () => {
    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", to.join(','));
    formData.append("cc", cc.join(','));
    formData.append("bcc", bcc.join(','));
    formData.append("subject", subject);
    formData.append("html", finalHtmlBody);
    formData.append("text", plainTextBody);
    formData.append("template_id", templateId);

    console.log("Attached Files:", attachedFiles);

    attachedFiles.slice(0, 5).forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error("Item is not a valid File:", file);
      }
    });

    try {
      const response = await axios.post(API_URL.POST_NEW_EMAIL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
          withCredentials: true,
        }
      );

      console.log("Response:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };


  const handleDiscard = () => {
    setTo([]);
    setCc([]);
    setBcc([]);
    setSubject("");
    setBody("");
    setAttachedFiles([]);
    setFilePreviews([]);
    handleClose();
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
      reader.readAsDataURL(file); // Read file as base64 encoded string
    });
  };

  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  const handleDeleteFile = (index: number) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);

    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
  };


  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'to' | 'cc' | 'bcc') => {
    const value = event.target.value;
    const separators = /[,;\s]+/; // Regex to split by comma, semicolon or space

    if (value.endsWith(',') || value.endsWith(';') || value.includes(' ')) {
      const newEmails = value.split(separators).map(email => email.trim()).filter(email => email !== '');
      if (type === 'to') {
        setTo(prev => [...new Set([...prev, ...newEmails])]);
        setCurrentToInput(''); // Clear the input field
      } else if (type === 'cc') {
        setCc(prev => [...new Set([...prev, ...newEmails])]);
        setCurrentCcInput(''); // Clear the input field
      } else if (type === 'bcc') {
        setBcc(prev => [...new Set([...prev, ...newEmails])]);
        setCurrentBccInput(''); // Clear the input field
      }
    } else {
      if (type === 'to') {
        setCurrentToInput(value);
      } else if (type === 'cc') {
        setCurrentCcInput(value);
      } else if (type === 'bcc') {
        setCurrentBccInput(value);
      }
    }
  };

  const handleChipDelete = (email: string, type: 'to' | 'cc' | 'bcc') => {
    if (type === 'to') {
      setTo(prev => prev.filter(e => e !== email));
    } else if (type === 'cc') {
      setCc(prev => prev.filter(e => e !== email));
    } else if (type === 'bcc') {
      setBcc(prev => prev.filter(e => e !== email));
    }
  };

  const handleTemplateSelect = (value: any) => {
    const selectedItem = emailTemplateList.find(item => item.template_name === value);
    if (selectedItem) {
      setSelectedTemplate(value);
      setTemplateId(selectedItem._id); // Set the template ID to trigger the API call
    }
  };
  
  useEffect(() => {
    if (open){
      dispatch(GetAllEmailTemplateAsync());
    }
  }, [open ]);

  useEffect(() => {
    if (templateId) {
      dispatch(GetSingleEmailTemplateAsync(templateId));
    };
  }, [templateId, dispatch]);


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
      <DialogTitle className="flex justify-between items-center p-4 bg-teal-800 rounded-md text-white">
        <span className="text-lg font-semibold">New Mail</span>
        <IconButton
          onClick={handleClose}
          className="text-white hover:bg-gray-700 transition-colors"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="p-4 mt-4 space-y-4 bg-gray-50">
        <TextField
          label="To"
          fullWidth
          variant="outlined"
          placeholder="Add email addresses..."
          onChange={(e) => handleEmailInputChange(e as React.ChangeEvent<HTMLInputElement>, 'to')}
          value={currentToInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Add Cc & Bcc">
                  <IconButton
                    onClick={() => setShowCcBcc(!showCcBcc)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          className="bg-white rounded-lg shadow-sm"
        />
        <Box className="flex flex-wrap gap-1 mt-2">
          {to.map((email, index) => (
            <Chip
              key={index}
              label={email}
              onDelete={() => handleChipDelete(email, 'to')}
              className="bg-blue-100 text-blue-800"
            />
          ))}
        </Box>
        {showCcBcc && (
          <>
            <TextField
              label="Cc"
              fullWidth
              variant="outlined"
              placeholder="Add email addresses..."
              onChange={(e) => handleEmailInputChange(e as React.ChangeEvent<HTMLInputElement>, 'cc')}
              value={currentCcInput}
              className="mt-2 bg-white rounded-lg shadow-sm"
            />
            <Box className="flex flex-wrap gap-1 mt-2">
              {cc.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => handleChipDelete(email, 'cc')}
                  className="bg-yellow-100 text-yellow-800"
                />
              ))}
            </Box>
            <TextField
              label="Bcc"
              fullWidth
              variant="outlined"
              placeholder="Add email addresses..."
              onChange={(e) => handleEmailInputChange(e as React.ChangeEvent<HTMLInputElement>, 'bcc')}
              value={currentBccInput}
              className="mt-2 bg-white rounded-lg shadow-sm"
            />
            <Box className="flex flex-wrap gap-1 mt-2">
              {bcc.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => handleChipDelete(email, 'bcc')}
                  className="bg-yellow-100 text-yellow-800"
                />
              ))}
            </Box>
          </>
        )}
        <TextField
          label="Subject"
          fullWidth
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-2 bg-white rounded-lg shadow-sm"
        />
        <Box className="mt-4">
          {isHtmlMode ? (
            <TextField
              label="HTML Input"
              multiline
              rows={10}
              value={body}
              onChange={handleHtmlInputChange}
              className="bg-white w-full rounded-lg shadow-sm"
            />
          ) : (
            <ReactQuill
              ref={quillRef}
              value={body}
              onChange={setBody}
              className="bg-white rounded-lg shadow-sm"
              modules={Modules}
              formats={Formats}
              placeholder="Compose your email..."
            />
          )}
        </Box>
        <div className="flex gap-3">
          <Button
            onClick={toggleHtmlMode}
            className="mt-2 text-green-600 hover:text-green-800"
          // startIcon={<CodeIcon />}
          >
            {isHtmlMode ? "Convert into Mail" : "HTML Code"}
          </Button>
          <Button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Insert Signature
          </Button>
          <div className="w-80">

            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder={selectedTemplate || "Click to select"} />
              </SelectTrigger>
              <SelectContent className="absolute z-[2000] bg-white shadow-lg border border-gray-300 rounded-md"> {/* Adjust styles */}
                {emailTemplateList.map((item: any) => (
                  <SelectItem key={item._id} value={item.template_name} className="cursor-pointer " >
                    {item.template_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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
                value={signature}
                onChange={handleSignatureInputChange}
                className="bg-white rounded-lg shadow-sm"
                modules={Modules}
                formats={Formats}
                placeholder="Compose your signature..."
              />
            )}
            <div className="flex gap-2 mt-2">
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

      </DialogContent>
      <Box className="p-4 bg-gray-50 flex justify-between items-center">
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
        <Box className="flex gap-2">
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
            className="flex gap-2"
          >
            <SendIcon className="" /> Send
          </Button>
        </Box>

      </Box>
    </Dialog>
  );
};

export default ComposeEmail;

import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Formats, Modules } from "../../../constant";
import { Button } from "../../ui/ui/button";

export default function AddSignatureFrom() {
    const [isSignatureHtmlMode, setIsSignatureHtmlMode] = useState(false);
    const [signature, setSignature] = useState("Best regards,\nYour Name");
    const quillRefSignature = useRef<ReactQuill | null>(null);
    const quillRef = useRef<ReactQuill | null>(null);

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

    const handleSignatureInputChange = (content: string) => {
        setSignature(content);
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
    };

    return (
        <div className="p-2">
            <div>
                <h2 className="font-semibold text-2xl">Email Signature</h2>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg shadow-md m-4">
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
        </div>
    )
}

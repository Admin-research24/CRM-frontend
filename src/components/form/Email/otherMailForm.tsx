import { useForm } from "react-hook-form";
// import { useAppDispatch } from "../../../store/Hooks";
import { Button } from "../../ui/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/ui/form";
import { Input } from "../../ui/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../../ui/ui/checkbox";
import { Label } from "../../ui/ui/label";
import { addConnectMailSchema, CreateConnectMail } from "../../../schema/AddConnectMail";

export default function OtherMailForm() {
    // const dispatch = useAppDispatch();

    const form = useForm<CreateConnectMail>({
        resolver: zodResolver(addConnectMailSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            imap_server: "",
            smtp_server: "",
            authentication_smtptype: "",
            authentication_imaptype: "",
            security_mode: "",
        },
    });

    const resetForm = () => {
        form.reset();
    };

    const onSubmit = async (data: CreateConnectMail) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("imap_server", data.imap_server);
        formData.append("smtp_server", data.smtp_server);
        formData.append("authentication_smpt-type", data.authentication_smtptype);
        formData.append("authentication_imap-type", data.authentication_imaptype);
        formData.append("security_mode", data.security_mode);

        // Uncomment and modify according to your needs
        // dispatch(createContactAsync(formData)).then(() => {
        //     const closeModalButton = document.getElementById("close-modal");
        //     if (closeModalButton) {
        //       closeModalButton.click();
        //     }
        //     dispatch(getContactListAsync());
        // });
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <h2 className="text-lg font-medium">Incoming Mail Settings</h2>
                </div>
                <div className="flex gap-3 items-center ">


                    <FormField
                        control={form.control}
                        name="imap_server"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IMAP server</FormLabel>
                                <FormControl className="w-96">
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4 items-center mt-6">


                        <FormField
                            control={form.control}
                            name="imap_server"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl className="w-36">
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imap_server"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="SSL"
                                                {...field}
                                            // checked={excludeDuplicates}
                                            // onCheckedChange={handleExcludeDuplicatesChange}
                                            />
                                            <Label htmlFor="SSL">Use SSL
                                            </Label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="authentication_imaptype"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Authentication Type</FormLabel>
                            <FormControl>
                                <Select
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Authentication Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PLAIN">PLAIN</SelectItem>
                                        <SelectItem value="LOGIN">LOGIN</SelectItem>
                                        <SelectItem value="CRAM-MD5">CRAM-MD5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <h2 className="text-lg font-medium">Outgoing mail settings</h2>
                </div>

                <FormField
                    control={form.control}
                    name="smtp_server"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SMTP server</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="security_mode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Security Mode</FormLabel>
                            <FormControl>
                                <Select
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Security Mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="SSL">SSL</SelectItem>
                                        <SelectItem value="TLS">TLS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="authentication_smtptype"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Authentication Type</FormLabel>
                            <FormControl>
                                <Select
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Authentication Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PLAIN">PLAIN</SelectItem>
                                        <SelectItem value="LOGIN">LOGIN</SelectItem>
                                        <SelectItem value="CRAM-MD5">CRAM-MD5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-5">
                    <Button
                        className="bg-primary text-white"
                        disabled={!form.formState.isValid}
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        className="bg-secondary-foreground text-white"
                        onClick={() => resetForm()}
                        type="button"
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Form>
    );
}

import {  useEffect } from "react"
import { useMail } from "./use-mail"
import { ScrollArea } from "../../../components/ui/ui/scroll-area"
import { cn } from "../../../lib/utils"
import { formatDistanceToNow } from "date-fns"
import {  Email, getAllDraftMailAsync, getAllInboxMailAsync, getAllMailAsync, getAllSentMailAsync, getAllSpamMailAsync } from "../../../store/slices/email"
import { useAppDispatch } from "../../../store/Hooks"

interface MailListProps {
    items: Email[]
}

export function MailList({ items }: MailListProps) {
    const [mail, setMail] = useMail()
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllInboxMailAsync())
        dispatch(getAllDraftMailAsync());
        dispatch(getAllSentMailAsync());
        dispatch(getAllSpamMailAsync());
        dispatch(getAllMailAsync());
    }, [dispatch])

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">

                {items.map((item) => (
                    <button
                        key={`${item._id}-${item.date}`}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            mail.selected === item._id ? "bg-accent" : ""
                        )}
                        onClick={() =>
                            setMail({
                                ...mail,
                                selected: item._id,
                            })
                        }
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold">{item.from}</div>
                                    {!item.isRead && (
                                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "ml-auto text-xs",
                                        mail.selected === item._id
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {formatDistanceToNow(new Date(item.date), {
                                        addSuffix: true,
                                    })}
                                </div>
                            </div>
                            <div className="text-xs font-medium">{item.subject}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                            {item.text.substring(0, 100)}
                        </div>
                        {/* {item.labels.length ? (
                            <div className="flex items-center gap-2">
                                {item.labels.map((label) => (
                                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        ) : null} */}
                    </button>
                ))}


            </div>
        </ScrollArea>
    )
}

// function getBadgeVariantFromLabel(
//     label: string
// ): ComponentProps<typeof Badge>["variant"] {
//     if (["work"].includes(label.toLowerCase())) {
//         return "default"
//     }

//     if (["personal"].includes(label.toLowerCase())) {
//         return "outline"
//     }

//     return "secondary"
// }
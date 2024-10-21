import * as React from "react";
import { TooltipProvider } from "../../../components/ui/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../components/ui/ui/resizable";
// import { AccountSwitcher } from "./emailUI";
// import { Separator } from "../../../components/ui/ui/separator";
import { MailDisplay } from "./display";
import { useMail } from "./use-mail";
import { cn } from "../../../lib/utils";
// import { type Mail } from "./data";
import MailContent from "./mailContent";
import DropdownNavigation from "./navContent";
import {  selectAllMailLists } from "../../../store/slices/email";
import { useSelector } from "react-redux";

interface MailProps {
  // accounts: {
  //   label: string;
  //   email: string;
  //   icon: React.ReactNode;
  // }[];


  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function Mail({
  // accounts,

  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const mails = useSelector(selectAllMailLists);
  const [activeSection, setActiveSection] = React.useState("Inbox");
  const selectedMail = mails.find((item) => item._id === mail.selected);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState<number | null>(null);


  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  const handleToggleDropdown = (index: number) => {
    setIsDropdownOpen((prev) => (prev === index ? null : index));
  };

  const handleDropdownItemClick = (section: any) => {
    handleNavClick(section);
    setActiveSection(section);
  };
  console.log('Active Section:', activeSection);
  console.log('Mails:', mails);
  console.log('Selected Mail ID:', mail.selected);
  console.log('Selected Mail:', selectedMail);
  console.log(mail.selected)
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(isCollapsed && "min-w-[50px] h-screen transition-all duration-300 ease-in-out")}
        >
          {/* <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? "h-[52px]" : "px-2")}>
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div> */}
          {/* <Separator /> */}
          <DropdownNavigation
            isCollapsed={isCollapsed}
            activeSection={activeSection}
            isDropdownOpen={isDropdownOpen}
            handleToggleDropdown={handleToggleDropdown}
            handleDropdownItemClick={handleDropdownItemClick}
            handleNavClick={handleNavClick}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <MailContent activeSection={activeSection} mails={mails} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {mail.selected && selectedMail && (
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <MailDisplay mail={mails.find((item) => item._id === mail.selected) || null} />

          </ResizablePanel>
        )}

      </ResizablePanelGroup>

    </TooltipProvider>
  );
}

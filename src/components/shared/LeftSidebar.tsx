import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/ui/button";
import AlertConfirmation from "../common/AlertConfirmation";
import { leftSideBarLinks } from "../../constant";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/ui/tooltip";

interface Props {
  isSideBarOpen: boolean;
}

export default function LeftSideBar({ isSideBarOpen }: Props) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const isLinkActive = (subLink: any) => location.pathname.includes(subLink.to);

  return (
    <aside
      className={`sticky left-0 top-0 z-20 flex h-screen min-w-fit bg-teal-800 w-10 flex-col justify-between overflow-auto border-r pt-20 pb-5 px-2 ${
        isSideBarOpen ? "block" : "hidden"
      }`}
    >
      <TooltipProvider>
        <div className="flex flex-1 flex-col gap-4">
          {leftSideBarLinks.map((link) => (
            <Tooltip key={link.to}>
              <TooltipTrigger asChild>
                <Link
                  to={link.to}
                  className={`relative flex items-center justify-start p-2.5 gap-4 rounded-lg ${
                    isLinkActive(link)
                      ? "bg-teal-600 text-teal-100 font-bold transition-all"
                      : "text-rose-100 hover:text-teal-300 transition-all"
                  }`}
                >
                  <div className="flex items-center relative">
                    {link.icon}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-teal-300 border-none">{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <AlertConfirmation onConfirm={handleLogout} title="Are you sure you want to logout?">
        <Button className="w-full justify-start inline-flex gap-4 items-start bg-transparent hover:text-teal-300 transition-all text-rose-100 hover:bg-transparent">
          <LogOut />
        </Button>
      </AlertConfirmation>
    </aside>
  );
}

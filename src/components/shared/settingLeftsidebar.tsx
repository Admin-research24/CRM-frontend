import { Link, useLocation } from "react-router-dom"; // Don't forget to import useLocation
import { AdminSettingsLeftSideBar } from "../../constant";
import { useState } from "react";

export default function SettingLeftSidebar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation(); // Get current location

  const handleMouseEnter = (linkLabel: string) => {
    setHoveredLink(linkLabel);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const isLinkActive = (subLink: any) => location.pathname.includes(subLink.to);

  return (
    <aside
      className={`sticky left-0 top-0 flex h-screen w-72 bg-white flex-col justify-between overflow-auto border-r px-2`}
    >
      <div className="flex flex-1 flex-col ">
        {AdminSettingsLeftSideBar.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative flex items-center justify-start p-2 mt-2 font-medium rounded-lg ${
              isLinkActive(link)
                ? "bg-teal-600 text-white font-bold transition-all"
                : "text-black hover:text-white hover:bg-teal-600 transition-all"
            }`}
            onMouseEnter={() => handleMouseEnter(link.label)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center relative">
              <div className="flex flex-col">
                {link.label}
                <span className="text-sm font-normal">{link.label2}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hoveredLink && (
        <div className="absolute bg-gray-200 p-2 rounded-md shadow-lg">
          {hoveredLink}
        </div>
      )}
    </aside>
  );
}

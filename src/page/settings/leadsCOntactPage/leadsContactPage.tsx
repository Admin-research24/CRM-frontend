import { AccountTree, WebStories } from "@mui/icons-material";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeadsContactPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Update state type
  const navigate = useNavigate();

  const items = [
    {
      icon: <WebStories className="size-9" />,
      title: "Website Embed Code",
      description: "Manage & customize fields associated with contact",
      path: "/",  
    },
    {
      icon: <CircleUserRound className="size-7" />,
      title: "Contact",
      description: "Manage & customize fields associated with contact",
      path: "/contact-map",  
    },
    {
      icon: <AccountTree className="size-9" />,
      title: "Account (companies)",
      description: "Manage & customize fields associated with contact",
      path: "/",  
    },
    {
      icon: <AccountTree className="size-9" />,
      title: "Signature",
      description: "Manage & customize fields associated with contact",
      path: "/settings/signature",  
    },
  ];

  return (
    <div>
      <div className="pl-7 pt-5">
        <h1 className="text-xl font-medium">Leads, Contact & Account</h1>
        <p>Manage the people & companies you sell to</p>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex gap-3 p-5 rounded-lg transition-all duration-300 hover:bg-emerald-100 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => navigate(item.path)}
          >
            <div className={`flex justify-center transition-transform duration-300 ${hoveredIndex === index ? 'transform scale-100 items-center' : ''}`}>
              {item.icon}
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-base font-medium">{item.title}</h3>
              <p
                className={`transition-opacity text-xs duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

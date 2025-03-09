// sidebar component to navigate between sections
import { HomeIcon, ChartBarIcon, CubeIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline";

type SidebarProps = {
  activeSection: "store" | "sku" | "planning" | "chart";
  setActiveSection: (section: "store" | "sku" | "planning" | "chart") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const handleSectionClick = (section: "store" | "sku" | "planning" | "chart") => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section); // Save selection in localStorage
  };

  return (
    <aside className="w-64 bg-slate-150 p-5 shadow-md">
      <nav>
        <ul className="space-y-4">
          <li
            onClick={() => handleSectionClick("store")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
              ${activeSection === "store" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
          >
            <HomeIcon className="w-6 h-6" />
            <span>Store</span>
          </li>

          <li
            onClick={() => handleSectionClick("sku")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
              ${activeSection === "sku" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
          >
            <CubeIcon className="w-6 h-6" />
            <span>SKU</span>
          </li>

          <li
            onClick={() => handleSectionClick("planning")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
              ${activeSection === "planning" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
          >
            <ChartBarSquareIcon className="w-6 h-6" />
            <span>Planning</span>
          </li>

          <li
            onClick={() => handleSectionClick("chart")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
              ${activeSection === "chart" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
          >
            <ChartBarIcon className="w-6 h-6" />
            <span>Charts</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

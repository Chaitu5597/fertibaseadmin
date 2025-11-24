import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  ClipboardList,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change to false to show "Sign In"

  // ---- SIDEBAR MENU ---------------------------------------------
  const menuItems = [
    { to: "/admin", Icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/add-product", Icon: PlusCircle, label: "Add Product" },
    {
      to: "/admin/productlist",
      Icon: ClipboardList,
      label: "Product Management",
    },
    { to: "/admin/settings", Icon: Settings, label: "Settings" },
  ];

  // ---- PROFILE MENU ---------------------------------------------
  const profileMenu = isLoggedIn
    ? [
      { label: "Profile", onClick: () => navigate("/admin/profile"), icon: User },
      { label: "Settings", onClick: () => navigate("/admin/settings"), icon: Settings },
      {
        label: "Sign Out",
        onClick: () => {
          setIsLoggedIn(false);
          alert("Signed out!");
          navigate("/login");
        },
        icon: LogOut,
      },
    ]
    : [
      {
        label: "Sign In",
        onClick: () => {
          setIsLoggedIn(true);
          navigate("/login");
        },
        icon: LogIn,
      },
    ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.to === location.pathname);
    return currentItem ? currentItem.label : "Admin Panel";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* ────── Mobile Sidebar Overlay ────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ────── Sidebar ────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Fertibase</span>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.Icon
                    size={20}
                    className={isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ────── Main Section ────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                  AD
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">Admin User</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500 truncate">admin@fertibase.com</p>
                    </div>
                    <div className="py-1">
                      {profileMenu.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              item.onClick();
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm"
                          >
                            {IconComp && <IconComp size={16} />}
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
// import { Outlet, Link } from "react-router-dom";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-700 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Fertibase Admin</h2>
//         <nav className="space-y-3">
//   <Link to="/admin" className="block hover:bg-blue-600 p-2 rounded">Dashboard</Link>
//   <Link to="/admin/products" className="block hover:bg-blue-600 p-2 rounded">Products</Link>
//   <Link to="/admin/add-product" className="block hover:bg-blue-600 p-2 rounded">Add Product</Link>
//   <Link to="/admin/settings" className="block hover:bg-blue-600 p-2 rounded">Settings</Link>
//   <Link to="/admin/product-management" className="block hover:bg-blue-600 p-2 rounded">Product Management</Link> {/* ✅ */}
// </nav>

//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <Outlet /> {/* ✅ required */}
//       </main>
//     </div>
//   );
// }


// import { Outlet, NavLink } from "react-router-dom";
// import { LayoutDashboard, Package, PlusCircle, Settings, ClipboardList } from "lucide-react";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
//         <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">Fertibase Admin</h2>

//         <nav className="flex flex-col gap-3">
//           <NavLink
//             to="/admin"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-600 shadow-lg"
//                   : "bg-gray-700 hover:bg-blue-600 hover:shadow-md"
//               }`
//             }
//           >
//             <LayoutDashboard size={18} />
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/admin/products"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-600 shadow-lg"
//                   : "bg-gray-700 hover:bg-blue-600 hover:shadow-md"
//               }`
//             }
//           >
//             <Package size={18} />
//             Products
//           </NavLink>

//           <NavLink
//             to="/admin/add-product"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-600 shadow-lg"
//                   : "bg-gray-700 hover:bg-blue-600 hover:shadow-md"
//               }`
//             }
//           >
//             <PlusCircle size={18} />
//             Add Product
//           </NavLink>

//           <NavLink
//             to="/admin/settings"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-600 shadow-lg"
//                   : "bg-gray-700 hover:bg-blue-600 hover:shadow-md"
//               }`
//             }
//           >
//             <Settings size={18} />
//             Settings
//           </NavLink>

//           <NavLink
//             to="/admin/product-management"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-600 shadow-lg"
//                   : "bg-gray-700 hover:bg-blue-600 hover:shadow-md"
//               }`
//             }
//           >
//             <ClipboardList size={18} />
//             Product Management
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }




// // AdminLayout.tsx
// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   PlusCircle,
//   Settings,
//   ClipboardList,
// } from "lucide-react";

// export default function AdminLayout() {
//   // ---- MENU DATA -------------------------------------------------
//   const menuItems = [
//     { to: "/admin",               Icon: LayoutDashboard, label: "Dashboard" },
//     { to: "/admin/products",      Icon: Package,         label: "Products" },
//     { to: "/admin/add-product",   Icon: PlusCircle,      label: "Add Product" },
//     { to: "/admin/product-management", Icon: ClipboardList, label: "Product Management" },
//     { to: "/admin/settings",      Icon: Settings,        label: "Settings" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* ────── Sidebar ────── */}
//       <aside className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col">
//         {/* Header */}
//         <div className="p-6 border-b border-slate-200">
//           <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
//               F
//             </div>
//             Fertibase Admin
//           </h2>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
//                   isActive
//                     ? "bg-gradient-to-r from-gray-500 to-indigo-300 text-white shadow-lg shadow-blue-500/30"
//                     : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
//                 }`
//               }
//             >
//               {/* Direct icon usage – no destructuring */}
//               <item.Icon
//                 size={20}
//                 className="transition-transform group-hover:scale-110"
//               />
//               <span className="relative">
//                 {item.label}
//                 <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
//               </span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-slate-200">
//           <p className="text-xs text-slate-500 text-center">© 2025 Fertibase</p>
//         </div>
//       </aside>

//       {/* ────── Main Content ────── */}
//       <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }


import { Outlet, NavLink, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change to false to show "Sign In"

  // ---- SIDEBAR MENU ---------------------------------------------
  const menuItems = [
    { to: "/admin", Icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/add-product", Icon: PlusCircle, label: "Add Product" },
    {
      to: "/admin/product-management",
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ────── Sidebar ────── */}
      <aside className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            Fertibase Admin
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-gray-500 to-indigo-300 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
                }`
              }
            >
              <item.Icon
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">© 2025 Fertibase</p>
        </div>
      </aside>

      {/* ────── Main Section ────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER BAR */}
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-[12px] shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-semibold text-slate-800">
            Welcome, Admin 👋
          </h1>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white hover:bg-slate-200 px-3 py-2 rounded-lg transition"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                A
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                {profileMenu.map((item) => {
  const IconComp = item.icon; // ✅ Assign the component
  return (
    <button
      key={item.label}
      onClick={() => {
        item.onClick();
        setDropdownOpen(false);
      }}
      className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 transition text-sm"
    >
      {IconComp && <IconComp size={16} />} {/* ✅ Safe render */}
      {item.label}
    </button>
  );
})}

              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

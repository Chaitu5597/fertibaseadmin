import { Link, Outlet } from "react-router-dom";
import { Package, PlusCircle, Home } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Fertibase Admin</h1>
        <nav className="space-y-3">
          <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Home size={18}/> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Package size={18}/> Products
          </Link>
          <Link to="/admin/add-product" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <PlusCircle size={18}/> Add Product
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

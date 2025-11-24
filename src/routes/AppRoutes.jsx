// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "../layouts/AdminLayout";
// import Dashboard from "../pages/Dashboard";
// import Products from "../pages/Products";
// import AddProduct from "../pages/AddProduct";
// import ViewProduct from "../pages/ViewProduct";
// import Settings from "../pages/Settings";
// import ProductManager from "../pages/ProductManager";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/admin" replace />} /> {/* redirect root */}
      
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="products" element={<Products />} />
//         <Route path="add-product" element={<AddProduct />} />
//         <Route path="products/:id" element={<ViewProduct />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="product-management" element={<ProductManager />} />
//       </Route>

//       {/* Fallback for any unknown URL */}
//       <Route
//         path="*"
//         element={<h1 className="text-center mt-20 text-2xl font-bold">404 - Page Not Found</h1>}
//       />
//     </Routes>
//   );
// }



// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import ViewProduct from "../pages/ViewProduct";
import Settings from "../pages/Settings";
import ProductManager from "../pages/ProductManager";
import SignInPage from "../pages/SignInPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route path="/signin" element={<SignInPage />} />

      {/* 2. PROTECTED ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products/:id" element={<ViewProduct />} />
        <Route path="settings" element={<Settings />} />
        <Route path="productlist" element={<ProductManager />} />
      </Route>
 
      {/* 3. ROOT → SIGN IN */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* 4. 404 FALLBACK */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
              <a
                href="/signin"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
              >
                Back to Sign In
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
// import AppRoutes from "./routes/AppRoutes";
// import { ProductProvider } from "./context/ProductContext";

// export default function App() {
//   return (
//     <ProductProvider>
//       <AppRoutes />
//     </ProductProvider>
//   );
// }

// src/App.jsx
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppRoutes /> {/* ✅ no BrowserRouter here */}
      </ProductProvider>
    </AuthProvider>
  );
}

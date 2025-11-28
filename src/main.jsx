// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter } from "react-router-dom";
// // import App from "./App";
// // import { ProductProvider } from "./context/ProductContext"; // ✅
// // import "./index.css";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       <ProductProvider>
// //         <App />
// //       </ProductProvider>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { ProductProvider } from "./context/ProductContext";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ProductProvider>
//         <App />
//       </ProductProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { ProductProvider } from "./context/ProductContext";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     {/* 👇 Add basename to match your repo name exactly */}
//     <BrowserRouter basename="/fertibaseadmin">
//       <ProductProvider>
//         <App />
//       </ProductProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </HashRouter>
  </React.StrictMode>
);


// // src/pages/SignInPage.jsx
// import { useState } from "react";
// import { Search, User, Phone, LogIn } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function SignInPage() {
//   const [empId, setEmpId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Replace with real API later
//   const employees = [
//     { empId: "NAVEENSIR", phone: "9493462778", name: "naveen", role: "admin" },
//     { empId: "EMP002", phone: "9123456789", name: "Jane Smith", role: "admin" },
//   ];

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       const found = employees.find(u => u.empId === empId && u.phone === phone);
//       if (found) {
//         login(found);
//         navigate("/admin", { replace: true });
//       } else {
//         setError("Invalid Employee ID or Phone Number");
//       }
//       setLoading(false);
//     }, 600);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
//         <div className="flex justify-center mb-6">
//           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
//             F
//           </div>
//         </div>

//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Sign In</h1>
//         <p className="text-center text-gray-500 mb-8">Enter your Employee ID and Phone Number</p>

//         <form onSubmit={handleSignIn} className="space-y-5">
//           <div className="relative">
//             <User className="absolute top-3 left-3 text-gray-400 size-5" />
//             <input
//               type="text"
//               placeholder="Employee ID"
//               className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={empId}
//               onChange={(e) => setEmpId(e.target.value.toUpperCase())}
//               required
//             />
//           </div>

//           <div className="relative">
//             <Phone className="absolute top-3 left-3 text-gray-400 size-5" />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//               maxLength={10}
//               required
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all ${
//               loading ? "bg-gray-400" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg"
//             }`}
//           >
//             {loading ? "Signing in..." : <> <LogIn size={20} /> Sign In </>}
//           </button>
//         </form>

        
//       </div>
//     </div>
//   );
// }



// // src/pages/SignInPage.jsx
// import { useState } from "react";
// import { User, Phone, LogIn, CheckCircle } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function SignInPage() {
//   const [empId, setEmpId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Replace with real API
//   const employees = [
//     { empId: "NAVEENSIR", phone: "9493462778", name: "Naveen", role: "admin" },
//     { empId: "EMP002", phone: "9123456789", name: "Jane Smith", role: "admin" },
//   ];

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       const found = employees.find(u => u.empId === empId && u.phone === phone);
//       if (found) {
//         login(found);
//         setSuccess(true);
//         setTimeout(() => navigate("/admin", { replace: true }), 1200);
//       } else {
//         setError("Invalid Employee ID or Phone Number");
//       }
//       setLoading(false);
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
//         <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Glass Card */}
//       <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white border-opacity-20">
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//             F
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-md">
//           Welcome Back
//         </h1>
//         <p className="text-center text-white text-opacity-80 mb-8">
//           Sign in with your Employee ID & Phone
//         </p>

//         {/* Success Animation */}
//         {success && (
//           <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 rounded-3xl z-20 animate-pulse">
//             <div className="text-center">
//               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3 animate-bounce" />
//               <p className="text-xl font-semibold text-gray-800">Signed In!</p>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSignIn} className="space-y-6">
//           {/* Employee ID */}
//           <div className="relative">
//             <User className="absolute top-4 left-4 text-white text-opacity-60 size-5" />
//             <input
//               type="text"
//               placeholder="Employee ID"
//               className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm"
//               value={empId}
//               onChange={(e) => setEmpId(e.target.value.toUpperCase())}
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className="relative">
//             <Phone className="absolute top-4 left-4 text-white text-opacity-60 size-5" />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//               maxLength={10}
//               required
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="bg-red-500 bg-opacity-20 text-red-100 p-3 rounded-lg text-sm text-center border border-red-400 border-opacity-50">
//               {error}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading || success}
//             className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               loading || success
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Signing in...
//               </span>
//             ) : success ? (
//               "Redirecting..."
//             ) : (
//               <>
//                 <LogIn size={22} />
//                 Sign In
//               </>
//             )}
//           </button>
//         </form>

//         {/* Demo */}
        
//       </div>
//     </div>
//   );
// }



// // src/pages/SignInPage.jsx
// import { useState } from "react";
// import { User, Phone, LogIn, CheckCircle } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function SignInPage() {
//   const [empId, setEmpId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const employees = [
//     { empId: "NAVEENSIR", phone: "9493462778", name: "Naveen", role: "admin" },
//     { empId: "EMP002", phone: "9123456789", name: "Jane Smith", role: "admin" },
//   ];

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       const found = employees.find(u => u.empId === empId && u.phone === phone);
//       if (found) {
//         login(found);
//         setSuccess(true);
//         setTimeout(() => navigate("/admin", { replace: true }), 1500);
//       } else {
//         setError("Invalid Employee ID or Phone Number");
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <>
//       {/* Animated Gradient Background */}
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient"></div>
        
//         {/* Floating Blobs */}
//         <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
//         <div className="absolute top-40 right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-20 left-32 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="min-h-screen flex items-center justify-center p-4">
//         {/* Glass Card */}
//         <div className="relative w-full max-w-md">
//           {/* Success Overlay */}
//           {success && (
//             <div className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl flex items-center justify-center z-50 animate-pulse">
//               <div className="text-center">
//                 <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-4 animate-bounce" />
//                 <p className="text-2xl font-bold text-gray-800">Welcome Back!</p>
//                 <p className="text-sm text-gray-600 mt-1">Redirecting...</p>
//               </div>
//             </div>
//           )}

//           <div className="bg-white bg-opacity-10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white border-opacity-20 transform transition-all duration-500 hover:scale-[1.01]">
//             {/* Logo */}
//             <div className="flex justify-center mb-8">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl animate-pulse">
//                   F
//                 </div>
//                 <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
//               Admin Portal
//             </h1>
//             <p className="text-center text-white text-opacity-80 mb-10">
//               Secure Sign In
//             </p>

//             <form onSubmit={handleSignIn} className="space-y-6">
//               {/* Employee ID */}
//               <div className="relative group">
//                 <User className="absolute top-4 left-4 text-white text-opacity-70 size-5 transition-all group-focus-within:text-emerald-400" />
//                 <input
//                   type="text"
//                   placeholder="Employee ID"
//                   className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-15 border border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-30 focus:border-emerald-400 transition-all duration-300 backdrop-blur-sm text-lg font-medium"
//                   value={empId}
//                   onChange={(e) => setEmpId(e.target.value.toUpperCase())}
//                   required
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity"></div>
//               </div>

//               {/* Phone */}
//               <div className="relative group">
//                 <Phone className="absolute top-4 left-4 text-white text-opacity-70 size-5 transition-all group-focus-within:text-emerald-400" />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-15 border border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-30 focus:border-emerald-400 transition-all duration-300 backdrop-blur-sm text-lg font-medium"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                   maxLength={10}
//                   required
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity"></div>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-100 p-4 rounded-2xl text-sm text-center animate-shake">
//                   {error}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading || success}
//                 className={`relative w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-xl ${
//                   loading || success
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
//                 }`}
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-3">
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Signing In...
//                     </>
//                   ) : success ? (
//                     "Redirecting..."
//                   ) : (
//                     <>
//                       <LogIn size={22} />
//                       Sign In
//                     </>
//                   )}
//                 </span>
//                 <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity"></div>
//               </button>
//             </form>

           
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }











// // src/pages/SignInPage.jsx
// import { useState, useEffect } from "react";
// import { User, Phone, LogIn, Zap } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function SignInPage() {
//   const [empId, setEmpId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const employees = [
//     { empId: "NAVEENSIR", phone: "9493462778", name: "Naveen", role: "admin" },
//     { empId: "EMP002", phone: "9123456789", name: "Jane Smith", role: "admin" },
//   ];

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     setTimeout(() => {
//       const found = employees.find(u => u.empId === empId && u.phone === phone);
//       if (found) {
//         login(found);
//         setSuccess(true);
//         setTimeout(() => navigate("/admin", { replace: true }), 1800);
//       } else {
//         setError("Access Denied");
//       }
//       setLoading(false);
//     }, 1200);
//   };

//   // Floating Particles (CANVAS)
//   useEffect(() => {
//     const canvas = document.getElementById("particles");
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles = [];
//     for (let i = 0; i < 60; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         radius: Math.random() * 2 + 1,
//         speed: Math.random() * 1 + 0.5,
//       });
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(p => {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(16, 185, 129, 0.6)";
//         ctx.fill();
//         p.y -= p.speed;
//         if (p.y < 0) p.y = canvas.height;
//       });
//       requestAnimationFrame(animate);
//     };
//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* CANVAS: Behind everything + no pointer events */}
//       <canvas
//         id="particles"
//         className="fixed inset-0 -z-20 pointer-events-none"
//       />

//       {/* Gradient Background */}
//       <div className="fixed inset-0 -z-30">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 animate-gradient-slow"></div>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//       </div>

//       <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
//         {/* Holographic Card */}
//         <div className="relative w-full max-w-md group">
//           <div
//             className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 p-1 rounded-3xl shadow-2xl transition-all duration-300 group-hover:shadow-emerald-500/50"
//             style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
//             onMouseMove={(e) => {
//               const card = e.currentTarget;
//               const { left, top, width, height } = card.getBoundingClientRect();
//               const x = e.clientX - left;
//               const y = e.clientY - top;
//               const rotateY = ((x / width) - 0.5) * 20;
//               const rotateX = ((y / height) - 0.5) * -20;
//               card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
//             }}
//           >
//             <div className="bg-black bg-opacity-60 backdrop-blur-3xl rounded-3xl p-8 border border-emerald-500 border-opacity-30">
//               {/* Logo */}
//               <div className="flex justify-center mb-8">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl animate-pulse">
//                     F
//                   </div>
//                   <div className="absolute -inset-2 bg-emerald-500 rounded-full blur-2xl opacity-50 animate-ping"></div>
//                 </div>
//               </div>

//               <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
//                 FERTIBASE
//               </h1>
//               <p className="text-center text-emerald-300 text-sm mb-10 tracking-wider">
//                 SECURE ADMIN ACCESS
//               </p>

//               {/* Success */}
//               {success && (
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl flex items-center justify-center z-50 animate-pulse">
//                   <div className="text-center">
//                     <Zap className="w-20 h-20 text-white mx-auto mb-3 animate-bounce" />
//                     <p className="text-2xl font-bold text-white">ACCESS GRANTED</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSignIn} className="space-y-6">
//                 {/* Employee ID */}
//                 <div className="relative group">
//                   <User className="absolute top-4 left-4 text-emerald-400 size-6 transition-all group-focus-within:scale-110" />
//                   <input
//                     type="text"
//                     placeholder="EMPLOYEE ID"
//                     className="w-full pl-14 pr-4 py-4 bg-white bg-opacity-10 border border-emerald-500 border-opacity-50 rounded-2xl text-emerald-100 placeholder-emerald-300 placeholder-opacity-60 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm text-lg font-mono tracking-widest"
//                     value={empId}
//                     onChange={(e) => setEmpId(e.target.value.toUpperCase())}
//                     required
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="relative group">
//                   <Phone className="absolute top-4 left-4 text-emerald-400 size-6 transition-all group-focus-within:scale-110" />
//                   <input
//                     type="tel"
//                     placeholder="PHONE NUMBER"
//                     className="w-full pl-14 pr-4 py-4 bg-white bg-opacity-10 border border-emerald-500 border-opacity-50 rounded-2xl text-emerald-100 placeholder-emerald-300 placeholder-opacity-60 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm text-lg font-mono tracking-widest"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                     maxLength={10}
//                     required
//                   />
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="bg-red-500 bg-opacity-30 border border-red-400 text-red-200 p-4 rounded-2xl text-center text-sm font-bold tracking-wider animate-pulse">
//                     {error}
//                   </div>
//                 )}

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading || success}
//                   className="relative w-full py-5 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700"
//                 >
//                   <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
//                     {loading ? (
//                       <>
//                         <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         AUTHENTICATING
//                       </>
//                     ) : success ? (
//                       "ACCESSING..."
//                     ) : (
//                       <>
//                         <LogIn size={24} />
//                         SignIN
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



// src/pages/SignInPage.jsx
import { useState, useEffect } from "react";
import { User, Phone, LogIn, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [empId, setEmpId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // Dynamic image

  const { login } = useAuth();
  const navigate = useNavigate();

  // Employee database with profile images
  const employees = [
    {
      empId: "NAVEENSIR",
      phone: "9493462778",
      name: "Naveen",
      role: "admin",
      image: "https://i.pravatar.cc/300?img=68", // Real image
    },
    {
      empId: "EMP002",
      phone: "9123456789",
      name: "Jane Smith",
      role: "admin",
      image: "https://i.pravatar.cc/300?img=5",
    },
  ];

  // Update image when empId changes
  useEffect(() => {
    if (empId) {
      const user = employees.find(u => u.empId === empId);
      setProfileImage(user?.image || "");
    } else {
      setProfileImage("");
    }
  }, [empId]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const found = employees.find(u => u.empId === empId && u.phone === phone);
      if (found) {
        login(found);
        setSuccess(true);
        setTimeout(() => navigate("/admin", { replace: true }), 1800);
      } else {
        setError("Access Denied");
      }
      setLoading(false);
    }, 1200);
  };

  // Canvas Particles
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.6)";
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <canvas id="particles" className="fixed inset-0 -z-20 pointer-events-none" />
      <div className="fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 animate-gradient-slow"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="relative w-full max-w-md group">
          <div
            className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 p-1 rounded-3xl shadow-2xl transition-all duration-300 group-hover:shadow-emerald-500/50"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const { left, top, width, height } = card.getBoundingClientRect();
              const x = e.clientX - left;
              const y = e.clientY - top;
              const rotateY = ((x / width) - 0.5) * 20;
              const rotateX = ((y / height) - 0.5) * -20;
              card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div className="bg-black bg-opacity-60 backdrop-blur-3xl rounded-3xl p-8 border border-emerald-500 border-opacity-30">
              {/* Dynamic Logo: Image or Fallback */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-2xl animate-pulse"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl animate-pulse">
                      F
                    </div>
                  )}
                  <div className="absolute -inset-2 bg-emerald-500 rounded-full blur-2xl opacity-50 animate-ping"></div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                FERTIBASE
              </h1>
              <p className="text-center text-emerald-300 text-sm mb-10 tracking-wider">
                SECURE ADMIN ACCESS
              </p>

              {success && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl flex items-center justify-center z-50 animate-pulse">
                  <div className="text-center">
                    <Zap className="w-20 h-20 text-white mx-auto mb-3 animate-bounce" />
                    <p className="text-2xl font-bold text-white">ACCESS GRANTED</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="relative group">
                  <User className="absolute top-4 left-4 text-emerald-400 size-6 transition-all group-focus-within:scale-110" />
                  <input
                    type="text"
                    placeholder="EMPLOYEE ID"
                    className="w-full pl-14 pr-4 py-4 bg-white bg-opacity-10 border border-emerald-500 border-opacity-50 rounded-2xl text-emerald-100 placeholder-emerald-300 placeholder-opacity-60 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm text-lg font-mono tracking-widest"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute top-4 left-4 text-emerald-400 size-6 transition-all group-focus-within:scale-110" />
                  <input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    className="w-full pl-14 pr-4 py-4 bg-white bg-opacity-10 border border-emerald-500 border-opacity-50 rounded-2xl text-emerald-100 placeholder-emerald-300 placeholder-opacity-60 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 backdrop-blur-sm text-lg font-mono tracking-widest"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength={10}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500 bg-opacity-30 border border-red-400 text-red-200 p-4 rounded-2xl text-center text-sm font-bold tracking-wider animate-pulse">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || success}
                  className="relative w-full py-5 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        AUTHENTICATING
                      </>
                    ) : success ? (
                      "ACCESSING..."
                    ) : (
                      <>
                        <LogIn size={24} />
                        ENTER SYSTEM
                      </>
                    )}
                  </span>
                </button>
              </form>

              <p className="mt-8 text-xs text-center text-emerald-300 font-mono">
                DEMO: <span className="text-cyan-400">NAVEENSIR</span> +{" "}
                <span className="text-cyan-400">9493462778</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
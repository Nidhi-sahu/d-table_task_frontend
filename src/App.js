// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./component/Sidebaar";
// import Navbar from "./component/Navbaar";
// import Dashboard from "./component/Dashboard";
// import Login from "./component/Login";
// import ProductsPage from "./pages/product";
// import ProtectedRoute from "./component/protectedRoute";


// function MainLayout({ children }) {
//   return (
//     <div style={{ background: "#0b1120", minHeight: "100vh" }}>
//       <Sidebar />
//       <Navbar />
//       {children}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* localhost:3000 → Login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />

//         {/* Dashboard */}
//         <Route path="/dashboard" element={
//           <MainLayout><Dashboard /></MainLayout>
//         } />

//         {/* Products Page — Sidebar > Products > All Products */}
//         <Route path="/products" element={
//           <MainLayout><ProductsPage /></MainLayout>
//         } />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebaar";
import Navbar from "./component/Navbaar";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import ProductsPage from "./pages/product";
import ProtectedRoute from "./component/protectedRoute";
import StockMovementPage from "./pages/StockMovement";

function MainLayout({ children }) {
  return (
    <div style={{ background: "#0b1120", minHeight: "100vh" }}>
      <Sidebar />
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔒 Protected Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StockMovementPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
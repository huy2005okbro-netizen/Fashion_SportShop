import { useState } from "react";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";
import SellerLogin from "./components/SellerLogin";
import AdminDashboard from "./pages/admin/admintsx/AdminDashboard";
import SellerDashboard from "./pages/seller/sellertsx/SellerDashboard";
import "./App.css";

type UserType = "customer" | "seller" | "admin";

function App() {
  const [userType, setUserType] = useState<UserType>("customer");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  // Nếu admin đã đăng nhập, hiển thị admin dashboard
  if (isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  // Nếu seller đã đăng nhập, hiển thị seller dashboard
  if (isSellerLoggedIn) {
    return <SellerDashboard />;
  }

  return (
    <div className="app-container">
      <div className="user-type-selector">
        <button
          className={userType === "customer" ? "active" : ""}
          onClick={() => setUserType("customer")}
        >
          Khách hàng
        </button>
        <button
          className={userType === "seller" ? "active" : ""}
          onClick={() => setUserType("seller")}
        >
          Người bán
        </button>
        <button
          className={userType === "admin" ? "active" : ""}
          onClick={() => setUserType("admin")}
        >
          Admin
        </button>
      </div>

      {userType === "customer" && <CustomerLogin />}
      {userType === "seller" && (
        <SellerLogin onLoginSuccess={() => setIsSellerLoggedIn(true)} />
      )}
      {userType === "admin" && (
        <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

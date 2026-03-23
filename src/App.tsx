import { useState } from "react";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";
import SellerLogin from "./components/SellerLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

type UserType = "customer" | "seller" | "admin";

function App() {
  const [userType, setUserType] = useState<UserType>("customer");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Nếu admin đã đăng nhập, hiển thị dashboard
  if (isAdminLoggedIn) {
    return <AdminDashboard />;
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
      {userType === "seller" && <SellerLogin />}
      {userType === "admin" && (
        <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

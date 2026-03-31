import { useState } from "react";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";
import AdminDashboard from "./pages/admin/admintsx/AdminDashboard";
import CustomerDashboard from "./pages/customer/customertsx/CustomerDashboard";
import "./App.css";

type UserType = "customer" | "admin";

function App() {
  const [userType, setUserType] = useState<UserType>("customer");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  // Nếu admin đã đăng nhập, hiển thị admin dashboard
  if (isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  // Nếu customer đã đăng nhập, hiển thị customer dashboard
  if (isCustomerLoggedIn) {
    return <CustomerDashboard />;
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
          className={userType === "admin" ? "active" : ""}
          onClick={() => setUserType("admin")}
        >
          Admin
        </button>
      </div>

      {userType === "customer" && (
        <CustomerLogin onLoginSuccess={() => setIsCustomerLoggedIn(true)} />
      )}
      {userType === "admin" && (
        <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

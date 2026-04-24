import { useState } from "react";
import { useSettings } from "../SettingsContext";
import "../admincss/SettingsPage.css";

type TabType =
  | "store"
  | "payment"
  | "shipping"
  | "email"
  | "tax"
  | "security"
  | "notifications";

function SettingsPage() {
  const {
    settings,
    updateStoreSettings,
    updatePaymentSettings,
    updateShippingSettings,
    updateEmailSettings,
    updateTaxSettings,
    updateSecuritySettings,
    updateNotificationSettings,
    resetToDefaults,
    exportSettings,
  } = useSettings();

  const [activeTab, setActiveTab] = useState<TabType>("store");

  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateStoreSettings({
      storeName: formData.get("storeName") as string,
      storeDescription: formData.get("storeDescription") as string,
      storeEmail: formData.get("storeEmail") as string,
      storePhone: formData.get("storePhone") as string,
      storeAddress: formData.get("storeAddress") as string,
      logoUrl: formData.get("logoUrl") as string,
    });
    alert("Đã lưu thông tin cửa hàng!");
  };

  const handleTogglePaymentMethod = async (methodId: string) => {
    const updatedMethods = settings.payment.methods.map((m) =>
      m.id === methodId ? { ...m, enabled: !m.enabled } : m,
    );
    await updatePaymentSettings({ methods: updatedMethods });
  };

  const handleToggleShippingMethod = async (methodId: string) => {
    const updatedMethods = settings.shipping.methods.map((m) =>
      m.id === methodId ? { ...m, enabled: !m.enabled } : m,
    );
    await updateShippingSettings({ methods: updatedMethods });
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateEmailSettings({
      smtpHost: formData.get("smtpHost") as string,
      smtpPort: Number(formData.get("smtpPort")),
      smtpUser: formData.get("smtpUser") as string,
      smtpPassword: formData.get("smtpPassword") as string,
      fromEmail: formData.get("fromEmail") as string,
      fromName: formData.get("fromName") as string,
    });
    alert("Đã lưu cấu hình email!");
  };

  const handleSaveTax = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateTaxSettings({
      enableTax: formData.get("enableTax") === "on",
      taxRate: Number(formData.get("taxRate")),
      taxName: formData.get("taxName") as string,
      includeTaxInPrice: formData.get("includeTaxInPrice") === "on",
      processingFee: Number(formData.get("processingFee")),
    });
    alert("Đã lưu cấu hình thuế!");
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateSecuritySettings({
      enable2FA: formData.get("enable2FA") === "on",
      sessionTimeout: Number(formData.get("sessionTimeout")),
      maxLoginAttempts: Number(formData.get("maxLoginAttempts")),
      passwordMinLength: Number(formData.get("passwordMinLength")),
      requireStrongPassword: formData.get("requireStrongPassword") === "on",
    });
    alert("Đã lưu cấu hình bảo mật!");
  };

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateNotificationSettings({
      emailOnNewOrder: formData.get("emailOnNewOrder") === "on",
      emailOnOrderStatusChange:
        formData.get("emailOnOrderStatusChange") === "on",
      emailOnLowStock: formData.get("emailOnLowStock") === "on",
      emailOnNewCustomer: formData.get("emailOnNewCustomer") === "on",
      smsOnNewOrder: formData.get("smsOnNewOrder") === "on",
      pushOnNewOrder: formData.get("pushOnNewOrder") === "on",
      lowStockThreshold: Number(formData.get("lowStockThreshold")),
    });
    alert("Đã lưu cấu hình thông báo!");
  };

  const handleExport = () => {
    const data = exportSettings();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settings-backup.json";
    a.click();
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Bạn có chắc muốn khôi phục cài đặt mặc định? Tất cả thay đổi sẽ bị mất!",
      )
    ) {
      await resetToDefaults();
      alert("Đã khôi phục cài đặt mặc định!");
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Cài đặt hệ thống</h1>
          <p className="page-subtitle">
            Quản lý cấu hình và tùy chỉnh cửa hàng
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleExport}>
            📥 Xuất cài đặt
          </button>
          <button className="btn-danger" onClick={handleReset}>
            🔄 Khôi phục mặc định
          </button>
        </div>
      </div>

      <div className="settings-container">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <button
            className={activeTab === "store" ? "active" : ""}
            onClick={() => setActiveTab("store")}
          >
            <span className="icon">🏪</span>
            <span>Thông tin cửa hàng</span>
          </button>
          <button
            className={activeTab === "payment" ? "active" : ""}
            onClick={() => setActiveTab("payment")}
          >
            <span className="icon">💳</span>
            <span>Thanh toán</span>
          </button>
          <button
            className={activeTab === "shipping" ? "active" : ""}
            onClick={() => setActiveTab("shipping")}
          >
            <span className="icon">🚚</span>
            <span>Vận chuyển</span>
          </button>
          <button
            className={activeTab === "email" ? "active" : ""}
            onClick={() => setActiveTab("email")}
          >
            <span className="icon">📧</span>
            <span>Email</span>
          </button>
          <button
            className={activeTab === "tax" ? "active" : ""}
            onClick={() => setActiveTab("tax")}
          >
            <span className="icon">💰</span>
            <span>Thuế & Phí</span>
          </button>
          <button
            className={activeTab === "security" ? "active" : ""}
            onClick={() => setActiveTab("security")}
          >
            <span className="icon">🔒</span>
            <span>Bảo mật</span>
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="icon">🔔</span>
            <span>Thông báo</span>
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Store Settings */}
          {activeTab === "store" && (
            <div className="settings-section">
              <h2>Thông tin cửa hàng</h2>
              <form onSubmit={handleSaveStore}>
                <div className="form-group">
                  <label>Tên cửa hàng *</label>
                  <input
                    type="text"
                    name="storeName"
                    defaultValue={settings.store.storeName}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    name="storeDescription"
                    defaultValue={settings.store.storeDescription}
                    rows={3}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="storeEmail"
                      defaultValue={settings.store.storeEmail}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại *</label>
                    <input
                      type="tel"
                      name="storePhone"
                      defaultValue={settings.store.storePhone}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Địa chỉ *</label>
                  <input
                    type="text"
                    name="storeAddress"
                    defaultValue={settings.store.storeAddress}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>URL Logo</label>
                  <input
                    type="text"
                    name="logoUrl"
                    defaultValue={settings.store.logoUrl}
                  />
                </div>
                <button type="submit" className="btn-primary">
                  💾 Lưu thay đổi
                </button>
              </form>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payment" && (
            <div className="settings-section">
              <h2>Phương thức thanh toán</h2>
              <div className="payment-methods">
                {settings.payment.methods.map((method) => (
                  <div key={method.id} className="payment-method-card">
                    <div className="method-header">
                      <div>
                        <h3>{method.name}</h3>
                        {method.id === "bank_transfer" && (
                          <div className="method-details">
                            <p>
                              Ngân hàng:{" "}
                              {method.config.bankName || "Chưa cấu hình"}
                            </p>
                            <p>
                              STK:{" "}
                              {method.config.accountNumber || "Chưa cấu hình"}
                            </p>
                            <p>
                              Chủ TK:{" "}
                              {method.config.accountName || "Chưa cấu hình"}
                            </p>
                          </div>
                        )}
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={method.enabled}
                          onChange={() => handleTogglePaymentMethod(method.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === "shipping" && (
            <div className="settings-section">
              <h2>Phương thức vận chuyển</h2>
              <div className="shipping-methods">
                {settings.shipping.methods.map((method) => (
                  <div key={method.id} className="shipping-method-card">
                    <div className="method-header">
                      <div>
                        <h3>{method.name}</h3>
                        <div className="method-details">
                          <p>Phí cơ bản: {method.baseFee.toLocaleString()}đ</p>
                          <p>
                            Miễn phí từ:{" "}
                            {method.freeShippingThreshold.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={method.enabled}
                          onChange={() => handleToggleShippingMethod(method.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <div className="settings-section">
              <h2>Cấu hình Email</h2>
              <form onSubmit={handleSaveEmail}>
                <div className="form-row">
                  <div className="form-group">
                    <label>SMTP Host *</label>
                    <input
                      type="text"
                      name="smtpHost"
                      defaultValue={settings.email.smtpHost}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Port *</label>
                    <input
                      type="number"
                      name="smtpPort"
                      defaultValue={settings.email.smtpPort}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>SMTP User</label>
                    <input
                      type="text"
                      name="smtpUser"
                      defaultValue={settings.email.smtpUser}
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Password</label>
                    <input
                      type="password"
                      name="smtpPassword"
                      defaultValue={settings.email.smtpPassword}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>From Email *</label>
                    <input
                      type="email"
                      name="fromEmail"
                      defaultValue={settings.email.fromEmail}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>From Name *</label>
                    <input
                      type="text"
                      name="fromName"
                      defaultValue={settings.email.fromName}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  💾 Lưu cấu hình
                </button>
              </form>
            </div>
          )}

          {/* Tax Settings */}
          {activeTab === "tax" && (
            <div className="settings-section">
              <h2>Thuế & Phí</h2>
              <form onSubmit={handleSaveTax}>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="enableTax"
                      defaultChecked={settings.tax.enableTax}
                    />
                    <span>Bật tính thuế</span>
                  </label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên thuế</label>
                    <input
                      type="text"
                      name="taxName"
                      defaultValue={settings.tax.taxName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Thuế suất (%)</label>
                    <input
                      type="number"
                      name="taxRate"
                      defaultValue={settings.tax.taxRate}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="includeTaxInPrice"
                      defaultChecked={settings.tax.includeTaxInPrice}
                    />
                    <span>Giá đã bao gồm thuế</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Phí xử lý (đ)</label>
                  <input
                    type="number"
                    name="processingFee"
                    defaultValue={settings.tax.processingFee}
                    min="0"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  💾 Lưu cấu hình
                </button>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Bảo mật</h2>
              <form onSubmit={handleSaveSecurity}>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="enable2FA"
                      defaultChecked={settings.security.enable2FA}
                    />
                    <span>Bật xác thực 2 yếu tố (2FA)</span>
                  </label>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Thời gian phiên (phút)</label>
                    <input
                      type="number"
                      name="sessionTimeout"
                      defaultValue={settings.security.sessionTimeout}
                      min="5"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lần đăng nhập sai tối đa</label>
                    <input
                      type="number"
                      name="maxLoginAttempts"
                      defaultValue={settings.security.maxLoginAttempts}
                      min="1"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Độ dài mật khẩu tối thiểu</label>
                  <input
                    type="number"
                    name="passwordMinLength"
                    defaultValue={settings.security.passwordMinLength}
                    min="6"
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="requireStrongPassword"
                      defaultChecked={settings.security.requireStrongPassword}
                    />
                    <span>Yêu cầu mật khẩu mạnh</span>
                  </label>
                </div>
                <button type="submit" className="btn-primary">
                  💾 Lưu cấu hình
                </button>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <h2>Thông báo</h2>
              <form onSubmit={handleSaveNotifications}>
                <h3>Email</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailOnNewOrder"
                      defaultChecked={settings.notifications.emailOnNewOrder}
                    />
                    <span>Gửi email khi có đơn hàng mới</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailOnOrderStatusChange"
                      defaultChecked={
                        settings.notifications.emailOnOrderStatusChange
                      }
                    />
                    <span>Gửi email khi trạng thái đơn hàng thay đổi</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailOnLowStock"
                      defaultChecked={settings.notifications.emailOnLowStock}
                    />
                    <span>Gửi email khi sản phẩm sắp hết hàng</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailOnNewCustomer"
                      defaultChecked={settings.notifications.emailOnNewCustomer}
                    />
                    <span>Gửi email khi có khách hàng mới</span>
                  </label>
                </div>

                <h3>Khác</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="smsOnNewOrder"
                      defaultChecked={settings.notifications.smsOnNewOrder}
                    />
                    <span>Gửi SMS khi có đơn hàng mới</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="pushOnNewOrder"
                      defaultChecked={settings.notifications.pushOnNewOrder}
                    />
                    <span>Gửi thông báo đẩy khi có đơn hàng mới</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Ngưỡng cảnh báo hết hàng</label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    defaultValue={settings.notifications.lowStockThreshold}
                    min="0"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  💾 Lưu cấu hình
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

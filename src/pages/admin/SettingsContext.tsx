import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// ==================== TYPES ====================

export type PaymentMethod = {
  id: string;
  name: string;
  enabled: boolean;
  config: Record<string, any>;
};

export type ShippingMethod = {
  id: string;
  name: string;
  enabled: boolean;
  baseFee: number;
  freeShippingThreshold: number;
};

export type StoreSettings = {
  storeName: string;
  storeDescription: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  logoUrl: string;
  currency: string;
  timezone: string;
  language: string;
};

export type PaymentSettings = {
  methods: PaymentMethod[];
  defaultMethod: string;
};

export type ShippingSettings = {
  methods: ShippingMethod[];
  defaultMethod: string;
};

export type EmailSettings = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  enableEmailNotifications: boolean;
};

export type TaxSettings = {
  enableTax: boolean;
  taxRate: number;
  taxName: string;
  includeTaxInPrice: boolean;
  processingFee: number;
};

export type SecuritySettings = {
  enable2FA: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireStrongPassword: boolean;
};

export type NotificationSettings = {
  emailOnNewOrder: boolean;
  emailOnOrderStatusChange: boolean;
  emailOnLowStock: boolean;
  emailOnNewCustomer: boolean;
  smsOnNewOrder: boolean;
  pushOnNewOrder: boolean;
  lowStockThreshold: number;
};

export type AllSettings = {
  store: StoreSettings;
  payment: PaymentSettings;
  shipping: ShippingSettings;
  email: EmailSettings;
  tax: TaxSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
};

// ==================== CONTEXT ====================

interface SettingsContextType {
  settings: AllSettings;
  loading: boolean;
  error: string | null;
  updateStoreSettings: (settings: Partial<StoreSettings>) => Promise<void>;
  updatePaymentSettings: (settings: Partial<PaymentSettings>) => Promise<void>;
  updateShippingSettings: (
    settings: Partial<ShippingSettings>,
  ) => Promise<void>;
  updateEmailSettings: (settings: Partial<EmailSettings>) => Promise<void>;
  updateTaxSettings: (settings: Partial<TaxSettings>) => Promise<void>;
  updateSecuritySettings: (
    settings: Partial<SecuritySettings>,
  ) => Promise<void>;
  updateNotificationSettings: (
    settings: Partial<NotificationSettings>,
  ) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (jsonString: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "fashion-store-settings";

// Default settings
const defaultSettings: AllSettings = {
  store: {
    storeName: "Fashion Store",
    storeDescription: "Cửa hàng thời trang thể thao hàng đầu Việt Nam",
    storeEmail: "contact@fashionstore.vn",
    storePhone: "0123456789",
    storeAddress: "123 Đường ABC, Quận 1, TP.HCM",
    logoUrl: "/logo.png",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
  },
  payment: {
    methods: [
      {
        id: "cod",
        name: "Thanh toán khi nhận hàng (COD)",
        enabled: true,
        config: {},
      },
      {
        id: "bank_transfer",
        name: "Chuyển khoản ngân hàng",
        enabled: true,
        config: {
          bankName: "Vietcombank",
          accountNumber: "1234567890",
          accountName: "FASHION STORE",
        },
      },
      {
        id: "momo",
        name: "Ví MoMo",
        enabled: true,
        config: {},
      },
      {
        id: "vnpay",
        name: "VNPay",
        enabled: false,
        config: {},
      },
    ],
    defaultMethod: "cod",
  },
  shipping: {
    methods: [
      {
        id: "standard",
        name: "Giao hàng tiêu chuẩn",
        enabled: true,
        baseFee: 30000,
        freeShippingThreshold: 500000,
      },
      {
        id: "express",
        name: "Giao hàng nhanh",
        enabled: true,
        baseFee: 50000,
        freeShippingThreshold: 1000000,
      },
      {
        id: "same_day",
        name: "Giao hàng trong ngày",
        enabled: false,
        baseFee: 80000,
        freeShippingThreshold: 2000000,
      },
    ],
    defaultMethod: "standard",
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@fashionstore.vn",
    fromName: "Fashion Store",
    enableEmailNotifications: true,
  },
  tax: {
    enableTax: true,
    taxRate: 10,
    taxName: "VAT",
    includeTaxInPrice: false,
    processingFee: 5000,
  },
  security: {
    enable2FA: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
  },
  notifications: {
    emailOnNewOrder: true,
    emailOnOrderStatusChange: true,
    emailOnLowStock: true,
    emailOnNewCustomer: false,
    smsOnNewOrder: false,
    pushOnNewOrder: true,
    lowStockThreshold: 10,
  },
};

// ==================== PROVIDER ====================

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AllSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const loadedSettings = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...loadedSettings });
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  }, [settings]);

  const updateStoreSettings = async (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({
      ...prev,
      store: { ...prev.store, ...updates },
    }));
  };

  const updatePaymentSettings = async (updates: Partial<PaymentSettings>) => {
    setSettings((prev) => ({
      ...prev,
      payment: { ...prev.payment, ...updates },
    }));
  };

  const updateShippingSettings = async (updates: Partial<ShippingSettings>) => {
    setSettings((prev) => ({
      ...prev,
      shipping: { ...prev.shipping, ...updates },
    }));
  };

  const updateEmailSettings = async (updates: Partial<EmailSettings>) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, ...updates },
    }));
  };

  const updateTaxSettings = async (updates: Partial<TaxSettings>) => {
    setSettings((prev) => ({
      ...prev,
      tax: { ...prev.tax, ...updates },
    }));
  };

  const updateSecuritySettings = async (updates: Partial<SecuritySettings>) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, ...updates },
    }));
  };

  const updateNotificationSettings = async (
    updates: Partial<NotificationSettings>,
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
    }));
  };

  const resetToDefaults = async () => {
    setSettings(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = async (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      setSettings({ ...defaultSettings, ...imported });
    } catch (err: any) {
      setError("Dữ liệu không hợp lệ");
      throw new Error("Dữ liệu không hợp lệ");
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateStoreSettings,
        updatePaymentSettings,
        updateShippingSettings,
        updateEmailSettings,
        updateTaxSettings,
        updateSecuritySettings,
        updateNotificationSettings,
        resetToDefaults,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}

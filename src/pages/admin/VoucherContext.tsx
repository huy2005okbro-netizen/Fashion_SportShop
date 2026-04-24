import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type VoucherType = "PERCENTAGE" | "FIXED_AMOUNT";
export type VoucherStatus = "Hoạt động" | "Hết hạn" | "Tạm dừng";
export type ApplicableType = "ALL" | "CATEGORY" | "PRODUCT";

export type Voucher = {
  id: number;
  code: string;
  name: string;
  description: string;
  type: VoucherType;
  value: number; // % hoặc số tiền
  minOrderValue: number; // Giá trị đơn hàng tối thiểu
  maxDiscount?: number; // Giảm tối đa (cho loại %)
  usageLimit: number; // Số lần sử dụng tối đa (0 = không giới hạn)
  usedCount: number; // Số lần đã sử dụng
  startDate: string;
  endDate: string;
  status: VoucherStatus;
  applicableType: ApplicableType;
  applicableIds: number[]; // IDs của category hoặc product
  createdAt: string;
  updatedAt: string;
};

interface VoucherContextType {
  vouchers: Voucher[];
  loading: boolean;
  error: string | null;
  addVoucher: (
    voucher: Omit<Voucher, "id" | "usedCount" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  updateVoucher: (id: number, voucher: Partial<Voucher>) => Promise<void>;
  deleteVoucher: (id: number) => Promise<void>;
  getVoucherById: (id: number) => Voucher | undefined;
  getVoucherByCode: (code: string) => Voucher | undefined;
  validateVoucher: (
    code: string,
    orderValue: number,
    productIds?: number[],
    categoryIds?: number[],
  ) => {
    valid: boolean;
    message: string;
    discount?: number;
    voucher?: Voucher;
  };
  applyVoucher: (code: string) => Promise<void>;
  getActiveVouchers: () => Voucher[];
  refreshVouchers: () => Promise<void>;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

const STORAGE_KEY = "fashion-store-vouchers";

export function VoucherProvider({ children }: { children: ReactNode }) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const loadedVouchers = JSON.parse(stored);
        // Update status based on dates
        const updatedVouchers = loadedVouchers.map((v: Voucher) => ({
          ...v,
          status: getVoucherStatus(v),
        }));
        setVouchers(updatedVouchers);
      } else {
        // Initialize with sample data
        const initialVouchers: Voucher[] = [
          {
            id: 1,
            code: "WELCOME10",
            name: "Giảm 10% cho khách hàng mới",
            description: "Giảm 10% cho đơn hàng đầu tiên",
            type: "PERCENTAGE",
            value: 10,
            minOrderValue: 0,
            maxDiscount: 100000,
            usageLimit: 100,
            usedCount: 15,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            status: "Hoạt động",
            applicableType: "ALL",
            applicableIds: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            code: "SUMMER50K",
            name: "Giảm 50K mùa hè",
            description: "Giảm 50.000đ cho đơn từ 500K",
            type: "FIXED_AMOUNT",
            value: 50000,
            minOrderValue: 500000,
            usageLimit: 50,
            usedCount: 8,
            startDate: "2026-04-01",
            endDate: "2026-06-30",
            status: "Hoạt động",
            applicableType: "ALL",
            applicableIds: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 3,
            code: "SHOES20",
            name: "Giảm 20% giày thể thao",
            description: "Giảm 20% cho tất cả giày thể thao",
            type: "PERCENTAGE",
            value: 20,
            minOrderValue: 200000,
            maxDiscount: 200000,
            usageLimit: 0, // Không giới hạn
            usedCount: 42,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            status: "Hoạt động",
            applicableType: "CATEGORY",
            applicableIds: [1], // Category ID của Giày thể thao
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 4,
            code: "NEWYEAR2026",
            name: "Tết 2026 - Giảm 15%",
            description: "Giảm 15% mừng năm mới",
            type: "PERCENTAGE",
            value: 15,
            minOrderValue: 300000,
            maxDiscount: 150000,
            usageLimit: 200,
            usedCount: 156,
            startDate: "2026-01-01",
            endDate: "2026-02-15",
            status: "Hoạt động",
            applicableType: "ALL",
            applicableIds: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        setVouchers(initialVouchers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVouchers));
      }
    } catch (err) {
      console.error("Error loading vouchers:", err);
    }
  }, []);

  // Save to localStorage whenever vouchers change
  useEffect(() => {
    if (vouchers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
    }
  }, [vouchers]);

  const getVoucherStatus = (voucher: Voucher): VoucherStatus => {
    const now = new Date();
    const start = new Date(voucher.startDate);
    const end = new Date(voucher.endDate);

    if (voucher.status === "Tạm dừng") return "Tạm dừng";
    if (now < start || now > end) return "Hết hạn";
    if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit)
      return "Hết hạn";
    return "Hoạt động";
  };

  const addVoucher = async (
    newVoucher: Omit<Voucher, "id" | "usedCount" | "createdAt" | "updatedAt">,
  ) => {
    try {
      // Check duplicate code
      const existingCode = vouchers.find(
        (v) => v.code.toUpperCase() === newVoucher.code.toUpperCase(),
      );
      if (existingCode) {
        throw new Error("Mã giảm giá đã tồn tại");
      }

      const maxId = vouchers.reduce((max, v) => Math.max(max, v.id), 0);
      const voucher: Voucher = {
        ...newVoucher,
        id: maxId + 1,
        code: newVoucher.code.toUpperCase(),
        usedCount: 0,
        status: getVoucherStatus({ ...newVoucher, usedCount: 0 } as Voucher),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setVouchers([...vouchers, voucher]);
    } catch (err: any) {
      console.error("Error adding voucher:", err);
      throw err;
    }
  };

  const updateVoucher = async (id: number, updates: Partial<Voucher>) => {
    try {
      // Check duplicate code if code is being updated
      if (updates.code) {
        const existingCode = vouchers.find(
          (v) =>
            v.id !== id && v.code.toUpperCase() === updates.code!.toUpperCase(),
        );
        if (existingCode) {
          throw new Error("Mã giảm giá đã tồn tại");
        }
      }

      setVouchers(
        vouchers.map((v) => {
          if (v.id === id) {
            const updated = {
              ...v,
              ...updates,
              code: updates.code ? updates.code.toUpperCase() : v.code,
              updatedAt: new Date().toISOString(),
            };
            return {
              ...updated,
              status: updates.status || getVoucherStatus(updated),
            };
          }
          return v;
        }),
      );
    } catch (err: any) {
      console.error("Error updating voucher:", err);
      throw err;
    }
  };

  const deleteVoucher = async (id: number) => {
    try {
      setVouchers(vouchers.filter((v) => v.id !== id));
    } catch (err: any) {
      console.error("Error deleting voucher:", err);
      throw err;
    }
  };

  const getVoucherById = (id: number) => {
    return vouchers.find((v) => v.id === id);
  };

  const getVoucherByCode = (code: string) => {
    return vouchers.find((v) => v.code.toUpperCase() === code.toUpperCase());
  };

  const validateVoucher = (
    code: string,
    orderValue: number,
    productIds: number[] = [],
    categoryIds: number[] = [],
  ) => {
    const voucher = getVoucherByCode(code);

    if (!voucher) {
      return { valid: false, message: "Mã giảm giá không tồn tại" };
    }

    // Check status
    const currentStatus = getVoucherStatus(voucher);
    if (currentStatus !== "Hoạt động") {
      return {
        valid: false,
        message: "Mã giảm giá đã hết hạn hoặc không khả dụng",
      };
    }

    // Check min order value
    if (orderValue < voucher.minOrderValue) {
      return {
        valid: false,
        message: `Đơn hàng tối thiểu ${voucher.minOrderValue.toLocaleString()}đ`,
      };
    }

    // Check usage limit
    if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
      return { valid: false, message: "Mã giảm giá đã hết lượt sử dụng" };
    }

    // Check applicable type
    if (voucher.applicableType === "CATEGORY") {
      const hasApplicableCategory = categoryIds.some((id) =>
        voucher.applicableIds.includes(id),
      );
      if (!hasApplicableCategory) {
        return {
          valid: false,
          message: "Mã giảm giá không áp dụng cho sản phẩm này",
        };
      }
    } else if (voucher.applicableType === "PRODUCT") {
      const hasApplicableProduct = productIds.some((id) =>
        voucher.applicableIds.includes(id),
      );
      if (!hasApplicableProduct) {
        return {
          valid: false,
          message: "Mã giảm giá không áp dụng cho sản phẩm này",
        };
      }
    }

    // Calculate discount
    let discount = 0;
    if (voucher.type === "PERCENTAGE") {
      discount = (orderValue * voucher.value) / 100;
      if (voucher.maxDiscount && discount > voucher.maxDiscount) {
        discount = voucher.maxDiscount;
      }
    } else {
      discount = voucher.value;
    }

    return {
      valid: true,
      message: "Mã giảm giá hợp lệ",
      discount,
      voucher,
    };
  };

  const applyVoucher = async (code: string) => {
    try {
      const voucher = getVoucherByCode(code);
      if (!voucher) {
        throw new Error("Mã giảm giá không tồn tại");
      }

      // Increment used count
      await updateVoucher(voucher.id, {
        usedCount: voucher.usedCount + 1,
      });
    } catch (err: any) {
      console.error("Error applying voucher:", err);
      throw err;
    }
  };

  const getActiveVouchers = () => {
    return vouchers.filter((v) => getVoucherStatus(v) === "Hoạt động");
  };

  const refreshVouchers = async () => {
    // Update all voucher statuses
    setVouchers(
      vouchers.map((v) => ({
        ...v,
        status: getVoucherStatus(v),
      })),
    );
  };

  return (
    <VoucherContext.Provider
      value={{
        vouchers,
        loading,
        error,
        addVoucher,
        updateVoucher,
        deleteVoucher,
        getVoucherById,
        getVoucherByCode,
        validateVoucher,
        applyVoucher,
        getActiveVouchers,
        refreshVouchers,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
}

export function useVouchers() {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVouchers must be used within VoucherProvider");
  }
  return context;
}

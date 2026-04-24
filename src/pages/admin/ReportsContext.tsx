import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

// Mock data - Trong thực tế sẽ lấy từ localStorage hoặc API

export type TimeRange =
  | "7days"
  | "30days"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "custom";

export type RevenueData = {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
};

export type ProductReport = {
  id: number;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  growth: number;
  stock: number;
};

export type OrderReport = {
  status: string;
  count: number;
  percentage: number;
  revenue: number;
};

export type CustomerReport = {
  type: string;
  count: number;
  percentage: number;
  revenue: number;
};

interface ReportsContextType {
  // Revenue reports
  getRevenueByTimeRange: (range: TimeRange) => RevenueData[];
  getTotalRevenue: (range: TimeRange) => number;
  getAverageOrderValue: (range: TimeRange) => number;
  getRevenueGrowth: (range: TimeRange) => number;

  // Product reports
  getTopSellingProducts: (limit?: number) => ProductReport[];
  getLowStockProducts: (threshold?: number) => ProductReport[];
  getProductsByCategory: () => {
    category: string;
    count: number;
    revenue: number;
  }[];

  // Order reports
  getOrdersByStatus: () => OrderReport[];
  getOrdersGrowth: (range: TimeRange) => number;
  getAverageOrdersPerDay: (range: TimeRange) => number;

  // Customer reports
  getCustomersByType: () => CustomerReport[];
  getNewCustomers: (range: TimeRange) => number;
  getCustomerGrowth: (range: TimeRange) => number;

  // Summary
  getSummaryStats: (range: TimeRange) => {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    averageOrderValue: number;
    completionRate: number;
    revenueGrowth: number;
    ordersGrowth: number;
    customersGrowth: number;
  };
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

// Mock data
const mockRevenueData: RevenueData[] = [
  { date: "2026-04-18", revenue: 15000000, orders: 145, customers: 98 },
  { date: "2026-04-19", revenue: 18500000, orders: 167, customers: 112 },
  { date: "2026-04-20", revenue: 22000000, orders: 189, customers: 125 },
  { date: "2026-04-21", revenue: 19500000, orders: 178, customers: 108 },
  { date: "2026-04-22", revenue: 21000000, orders: 192, customers: 118 },
  { date: "2026-04-23", revenue: 24500000, orders: 205, customers: 135 },
  { date: "2026-04-24", revenue: 20000000, orders: 176, customers: 120 },
];

const mockProducts: ProductReport[] = [
  {
    id: 1,
    name: "Áo thun tập gym nam Dry-Fit",
    category: "Áo thể thao",
    sold: 1245,
    revenue: 37245000,
    growth: 25.3,
    stock: 150,
  },
  {
    id: 2,
    name: "Quần jogger bóng đá nữ",
    category: "Quần thể thao",
    sold: 987,
    revenue: 59113000,
    growth: 18.7,
    stock: 80,
  },
  {
    id: 3,
    name: "Váy tennis nữ Pro Active",
    category: "Váy thể thao",
    sold: 756,
    revenue: 34020000,
    growth: 12.4,
    stock: 5,
  },
  {
    id: 4,
    name: "Áo khoác chạy bộ WindShield",
    category: "Áo khoác thể thao",
    sold: 543,
    revenue: 65160000,
    growth: -5.2,
    stock: 42,
  },
  {
    id: 5,
    name: "Giày chạy bộ Nike Air",
    category: "Giày thể thao",
    sold: 432,
    revenue: 51840000,
    growth: 8.9,
    stock: 25,
  },
  {
    id: 6,
    name: "Túi thể thao Adidas",
    category: "Phụ kiện",
    sold: 321,
    revenue: 9630000,
    growth: 15.6,
    stock: 60,
  },
  {
    id: 7,
    name: "Bình nước thể thao",
    category: "Phụ kiện",
    sold: 289,
    revenue: 2890000,
    growth: 22.1,
    stock: 3,
  },
  {
    id: 8,
    name: "Băng đô thể thao",
    category: "Phụ kiện",
    sold: 245,
    revenue: 1225000,
    growth: 5.3,
    stock: 2,
  },
];

export function ReportsProvider({ children }: { children: ReactNode }) {
  const getRevenueByTimeRange = (range: TimeRange): RevenueData[] => {
    // Trong thực tế sẽ filter theo range
    return mockRevenueData;
  };

  const getTotalRevenue = (range: TimeRange): number => {
    const data = getRevenueByTimeRange(range);
    return data.reduce((sum, item) => sum + item.revenue, 0);
  };

  const getAverageOrderValue = (range: TimeRange): number => {
    const data = getRevenueByTimeRange(range);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    return totalOrders > 0 ? totalRevenue / totalOrders : 0;
  };

  const getRevenueGrowth = (range: TimeRange): number => {
    // Mock: +12.5%
    return 12.5;
  };

  const getTopSellingProducts = (limit: number = 10): ProductReport[] => {
    return mockProducts.sort((a, b) => b.sold - a.sold).slice(0, limit);
  };

  const getLowStockProducts = (threshold: number = 10): ProductReport[] => {
    return mockProducts
      .filter((p) => p.stock <= threshold)
      .sort((a, b) => a.stock - b.stock);
  };

  const getProductsByCategory = () => {
    const categoryMap = new Map<string, { count: number; revenue: number }>();

    mockProducts.forEach((product) => {
      const existing = categoryMap.get(product.category) || {
        count: 0,
        revenue: 0,
      };
      categoryMap.set(product.category, {
        count: existing.count + 1,
        revenue: existing.revenue + product.revenue,
      });
    });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      ...data,
    }));
  };

  const getOrdersByStatus = (): OrderReport[] => {
    return [
      { status: "Đã giao", count: 856, percentage: 68.5, revenue: 102720000 },
      { status: "Đang giao", count: 234, percentage: 18.7, revenue: 28080000 },
      { status: "Đang xử lý", count: 98, percentage: 7.8, revenue: 11760000 },
      { status: "Đã hủy", count: 62, percentage: 5.0, revenue: 0 },
    ];
  };

  const getOrdersGrowth = (range: TimeRange): number => {
    return 8.2;
  };

  const getAverageOrdersPerDay = (range: TimeRange): number => {
    const data = getRevenueByTimeRange(range);
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    return data.length > 0 ? totalOrders / data.length : 0;
  };

  const getCustomersByType = (): CustomerReport[] => {
    return [
      {
        type: "Khách hàng mới",
        count: 1208,
        percentage: 45.2,
        revenue: 48320000,
      },
      {
        type: "Khách hàng thân thiết",
        count: 856,
        percentage: 32.0,
        revenue: 85600000,
      },
      {
        type: "Khách hàng quay lại",
        count: 432,
        percentage: 16.2,
        revenue: 34560000,
      },
      {
        type: "Khách không hoạt động",
        count: 178,
        percentage: 6.6,
        revenue: 0,
      },
    ];
  };

  const getNewCustomers = (range: TimeRange): number => {
    return 1208;
  };

  const getCustomerGrowth = (range: TimeRange): number => {
    return 15.3;
  };

  const getSummaryStats = (range: TimeRange) => {
    const data = getRevenueByTimeRange(range);
    const totalRevenue = getTotalRevenue(range);
    const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
    const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
    const averageOrderValue = getAverageOrderValue(range);

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
      completionRate: 94.5,
      revenueGrowth: getRevenueGrowth(range),
      ordersGrowth: getOrdersGrowth(range),
      customersGrowth: getCustomerGrowth(range),
    };
  };

  const value = useMemo(
    () => ({
      getRevenueByTimeRange,
      getTotalRevenue,
      getAverageOrderValue,
      getRevenueGrowth,
      getTopSellingProducts,
      getLowStockProducts,
      getProductsByCategory,
      getOrdersByStatus,
      getOrdersGrowth,
      getAverageOrdersPerDay,
      getCustomersByType,
      getNewCustomers,
      getCustomerGrowth,
      getSummaryStats,
    }),
    [],
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within ReportsProvider");
  }
  return context;
}

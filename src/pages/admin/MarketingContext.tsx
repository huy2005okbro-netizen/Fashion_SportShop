import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// ==================== TYPES ====================

export type CampaignType = "EMAIL" | "SMS" | "PUSH" | "BANNER";
export type CampaignStatus =
  | "Nháp"
  | "Đang chạy"
  | "Đã hoàn thành"
  | "Tạm dừng";
export type TargetAudience =
  | "ALL"
  | "NEW_CUSTOMERS"
  | "LOYAL_CUSTOMERS"
  | "INACTIVE"
  | "CUSTOM";

export type Campaign = {
  id: number;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  targetAudience: TargetAudience;
  customAudienceIds?: number[]; // IDs khách hàng cụ thể
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number; // Lượt hiển thị
  clicks: number; // Lượt click
  conversions: number; // Lượt chuyển đổi (mua hàng)
  revenue: number; // Doanh thu từ campaign
  content: CampaignContent;
  createdAt: string;
  updatedAt: string;
};

export type CampaignContent = {
  subject?: string; // Tiêu đề (Email/Push)
  message: string; // Nội dung
  imageUrl?: string; // Hình ảnh
  ctaText?: string; // Call-to-action text
  ctaLink?: string; // Link CTA
};

export type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  position: number; // Thứ tự hiển thị
  isActive: boolean;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  createdAt: string;
};

export type EmailTemplate = {
  id: number;
  name: string;
  subject: string;
  content: string;
  previewText: string;
  isDefault: boolean;
  createdAt: string;
};

// ==================== CONTEXT ====================

interface MarketingContextType {
  campaigns: Campaign[];
  banners: Banner[];
  emailTemplates: EmailTemplate[];
  loading: boolean;
  error: string | null;

  // Campaign methods
  addCampaign: (
    campaign: Omit<
      Campaign,
      | "id"
      | "spent"
      | "impressions"
      | "clicks"
      | "conversions"
      | "revenue"
      | "createdAt"
      | "updatedAt"
    >,
  ) => Promise<void>;
  updateCampaign: (id: number, campaign: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: number) => Promise<void>;
  getCampaignById: (id: number) => Campaign | undefined;
  launchCampaign: (id: number) => Promise<void>;
  pauseCampaign: (id: number) => Promise<void>;

  // Banner methods
  addBanner: (
    banner: Omit<Banner, "id" | "clicks" | "impressions" | "createdAt">,
  ) => Promise<void>;
  updateBanner: (id: number, banner: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: number) => Promise<void>;
  getActiveBanners: () => Banner[];

  // Email template methods
  addEmailTemplate: (
    template: Omit<EmailTemplate, "id" | "createdAt">,
  ) => Promise<void>;
  updateEmailTemplate: (
    id: number,
    template: Partial<EmailTemplate>,
  ) => Promise<void>;
  deleteEmailTemplate: (id: number) => Promise<void>;

  // Analytics
  getCampaignStats: () => {
    totalCampaigns: number;
    activeCampaigns: number;
    totalSpent: number;
    totalRevenue: number;
    roi: number;
    totalClicks: number;
    totalConversions: number;
  };
}

const MarketingContext = createContext<MarketingContextType | undefined>(
  undefined,
);

const CAMPAIGNS_KEY = "fashion-store-campaigns";
const BANNERS_KEY = "fashion-store-banners";
const EMAIL_TEMPLATES_KEY = "fashion-store-email-templates";

// ==================== PROVIDER ====================

export function MarketingProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      // Load campaigns
      const storedCampaigns = localStorage.getItem(CAMPAIGNS_KEY);
      if (storedCampaigns) {
        setCampaigns(JSON.parse(storedCampaigns));
      } else {
        // Initialize with sample data
        const initialCampaigns: Campaign[] = [
          {
            id: 1,
            name: "Flash Sale Mùa Hè 2026",
            type: "EMAIL",
            status: "Đang chạy",
            targetAudience: "ALL",
            startDate: "2026-04-01",
            endDate: "2026-06-30",
            budget: 5000000,
            spent: 2500000,
            impressions: 15000,
            clicks: 1200,
            conversions: 85,
            revenue: 42500000,
            content: {
              subject: "🔥 Flash Sale - Giảm đến 50% Mùa Hè!",
              message:
                "Chào mừng mùa hè với ưu đãi cực khủng! Giảm giá lên đến 50% cho tất cả sản phẩm thể thao.",
              imageUrl: "/images/banner1.jpg",
              ctaText: "Mua ngay",
              ctaLink: "/products",
            },
            createdAt: new Date("2026-03-15").toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Chào Khách Hàng Mới",
            type: "EMAIL",
            status: "Đang chạy",
            targetAudience: "NEW_CUSTOMERS",
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            budget: 3000000,
            spent: 1200000,
            impressions: 8500,
            clicks: 680,
            conversions: 45,
            revenue: 18000000,
            content: {
              subject: "🎁 Chào mừng bạn đến với Fashion Store!",
              message:
                "Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên của bạn!",
              ctaText: "Nhận mã ngay",
              ctaLink: "/vouchers",
            },
            createdAt: new Date("2026-01-01").toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: "Thông báo sản phẩm mới",
            type: "PUSH",
            status: "Đã hoàn thành",
            targetAudience: "LOYAL_CUSTOMERS",
            startDate: "2026-03-01",
            endDate: "2026-03-15",
            budget: 1000000,
            spent: 950000,
            impressions: 5200,
            clicks: 420,
            conversions: 32,
            revenue: 12800000,
            content: {
              subject: "🆕 Bộ sưu tập mới vừa ra mắt!",
              message: "Khám phá ngay bộ sưu tập giày thể thao mới nhất 2026",
              imageUrl: "/images/banner2.jpg",
              ctaText: "Xem ngay",
              ctaLink: "/products?category=shoes",
            },
            createdAt: new Date("2026-02-20").toISOString(),
            updatedAt: new Date("2026-03-15").toISOString(),
          },
        ];
        setCampaigns(initialCampaigns);
        localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(initialCampaigns));
      }

      // Load banners
      const storedBanners = localStorage.getItem(BANNERS_KEY);
      if (storedBanners) {
        setBanners(JSON.parse(storedBanners));
      } else {
        const initialBanners: Banner[] = [
          {
            id: 1,
            title: "Flash Sale Mùa Hè",
            imageUrl: "/images/banner1.jpg",
            link: "/products?sale=true",
            position: 1,
            isActive: true,
            startDate: "2026-04-01",
            endDate: "2026-06-30",
            clicks: 1250,
            impressions: 25000,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Bộ sưu tập mới 2026",
            imageUrl: "/images/banner2.jpg",
            link: "/products?new=true",
            position: 2,
            isActive: true,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            clicks: 890,
            impressions: 18000,
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            title: "Giày thể thao cao cấp",
            imageUrl: "/images/banner3.jpg",
            link: "/products?category=shoes",
            position: 3,
            isActive: true,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            clicks: 650,
            impressions: 15000,
            createdAt: new Date().toISOString(),
          },
        ];
        setBanners(initialBanners);
        localStorage.setItem(BANNERS_KEY, JSON.stringify(initialBanners));
      }

      // Load email templates
      const storedTemplates = localStorage.getItem(EMAIL_TEMPLATES_KEY);
      if (storedTemplates) {
        setEmailTemplates(JSON.parse(storedTemplates));
      } else {
        const initialTemplates: EmailTemplate[] = [
          {
            id: 1,
            name: "Welcome Email",
            subject: "Chào mừng đến với Fashion Store!",
            content:
              "<h1>Xin chào {{name}}!</h1><p>Cảm ơn bạn đã đăng ký...</p>",
            previewText: "Nhận ngay ưu đãi 10% cho đơn đầu tiên",
            isDefault: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Order Confirmation",
            subject: "Xác nhận đơn hàng #{{orderNumber}}",
            content: "<h1>Đơn hàng của bạn đã được xác nhận!</h1>",
            previewText: "Cảm ơn bạn đã mua hàng",
            isDefault: true,
            createdAt: new Date().toISOString(),
          },
        ];
        setEmailTemplates(initialTemplates);
        localStorage.setItem(
          EMAIL_TEMPLATES_KEY,
          JSON.stringify(initialTemplates),
        );
      }
    } catch (err) {
      console.error("Error loading marketing data:", err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (campaigns.length > 0) {
      localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
    }
  }, [campaigns]);

  useEffect(() => {
    if (banners.length > 0) {
      localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
    }
  }, [banners]);

  useEffect(() => {
    if (emailTemplates.length > 0) {
      localStorage.setItem(EMAIL_TEMPLATES_KEY, JSON.stringify(emailTemplates));
    }
  }, [emailTemplates]);

  // ==================== CAMPAIGN METHODS ====================

  const addCampaign = async (
    newCampaign: Omit<
      Campaign,
      | "id"
      | "spent"
      | "impressions"
      | "clicks"
      | "conversions"
      | "revenue"
      | "createdAt"
      | "updatedAt"
    >,
  ) => {
    try {
      const maxId = campaigns.reduce((max, c) => Math.max(max, c.id), 0);
      const campaign: Campaign = {
        ...newCampaign,
        id: maxId + 1,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCampaigns([...campaigns, campaign]);
    } catch (err: any) {
      console.error("Error adding campaign:", err);
      throw err;
    }
  };

  const updateCampaign = async (id: number, updates: Partial<Campaign>) => {
    try {
      setCampaigns(
        campaigns.map((c) =>
          c.id === id
            ? { ...c, ...updates, updatedAt: new Date().toISOString() }
            : c,
        ),
      );
    } catch (err: any) {
      console.error("Error updating campaign:", err);
      throw err;
    }
  };

  const deleteCampaign = async (id: number) => {
    try {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("Error deleting campaign:", err);
      throw err;
    }
  };

  const getCampaignById = (id: number) => {
    return campaigns.find((c) => c.id === id);
  };

  const launchCampaign = async (id: number) => {
    await updateCampaign(id, { status: "Đang chạy" });
  };

  const pauseCampaign = async (id: number) => {
    await updateCampaign(id, { status: "Tạm dừng" });
  };

  // ==================== BANNER METHODS ====================

  const addBanner = async (
    newBanner: Omit<Banner, "id" | "clicks" | "impressions" | "createdAt">,
  ) => {
    try {
      const maxId = banners.reduce((max, b) => Math.max(max, b.id), 0);
      const banner: Banner = {
        ...newBanner,
        id: maxId + 1,
        clicks: 0,
        impressions: 0,
        createdAt: new Date().toISOString(),
      };
      setBanners([...banners, banner]);
    } catch (err: any) {
      console.error("Error adding banner:", err);
      throw err;
    }
  };

  const updateBanner = async (id: number, updates: Partial<Banner>) => {
    try {
      setBanners(banners.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    } catch (err: any) {
      console.error("Error updating banner:", err);
      throw err;
    }
  };

  const deleteBanner = async (id: number) => {
    try {
      setBanners(banners.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error("Error deleting banner:", err);
      throw err;
    }
  };

  const getActiveBanners = () => {
    const now = new Date();
    return banners
      .filter((b) => {
        const start = new Date(b.startDate);
        const end = new Date(b.endDate);
        return b.isActive && now >= start && now <= end;
      })
      .sort((a, b) => a.position - b.position);
  };

  // ==================== EMAIL TEMPLATE METHODS ====================

  const addEmailTemplate = async (
    newTemplate: Omit<EmailTemplate, "id" | "createdAt">,
  ) => {
    try {
      const maxId = emailTemplates.reduce((max, t) => Math.max(max, t.id), 0);
      const template: EmailTemplate = {
        ...newTemplate,
        id: maxId + 1,
        createdAt: new Date().toISOString(),
      };
      setEmailTemplates([...emailTemplates, template]);
    } catch (err: any) {
      console.error("Error adding template:", err);
      throw err;
    }
  };

  const updateEmailTemplate = async (
    id: number,
    updates: Partial<EmailTemplate>,
  ) => {
    try {
      setEmailTemplates(
        emailTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    } catch (err: any) {
      console.error("Error updating template:", err);
      throw err;
    }
  };

  const deleteEmailTemplate = async (id: number) => {
    try {
      setEmailTemplates(emailTemplates.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error("Error deleting template:", err);
      throw err;
    }
  };

  // ==================== ANALYTICS ====================

  const getCampaignStats = () => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(
      (c) => c.status === "Đang chạy",
    ).length;
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    const roi =
      totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0;
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce(
      (sum, c) => sum + c.conversions,
      0,
    );

    return {
      totalCampaigns,
      activeCampaigns,
      totalSpent,
      totalRevenue,
      roi,
      totalClicks,
      totalConversions,
    };
  };

  return (
    <MarketingContext.Provider
      value={{
        campaigns,
        banners,
        emailTemplates,
        loading,
        error,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        getCampaignById,
        launchCampaign,
        pauseCampaign,
        addBanner,
        updateBanner,
        deleteBanner,
        getActiveBanners,
        addEmailTemplate,
        updateEmailTemplate,
        deleteEmailTemplate,
        getCampaignStats,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
}

export function useMarketing() {
  const context = useContext(MarketingContext);
  if (!context) {
    throw new Error("useMarketing must be used within MarketingProvider");
  }
  return context;
}

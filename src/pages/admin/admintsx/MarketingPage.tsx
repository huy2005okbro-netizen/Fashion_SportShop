import { useState, useMemo } from "react";
import {
  useMarketing,
  type Campaign,
  type Banner,
  type CampaignType,
  type TargetAudience,
} from "../MarketingContext";
import "../admincss/MarketingPage.css";

type TabType = "campaigns" | "banners" | "analytics";

function MarketingPage() {
  const {
    campaigns,
    banners,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    launchCampaign,
    pauseCampaign,
    addBanner,
    updateBanner,
    deleteBanner,
    getCampaignStats,
  } = useMarketing();

  const [activeTab, setActiveTab] = useState<TabType>("campaigns");
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [campaignForm, setCampaignForm] = useState({
    name: "",
    type: "EMAIL" as CampaignType,
    status: "Nháp" as const,
    targetAudience: "ALL" as TargetAudience,
    startDate: "",
    endDate: "",
    budget: 0,
    content: {
      subject: "",
      message: "",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
    },
  });

  const [bannerForm, setBannerForm] = useState({
    title: "",
    imageUrl: "",
    link: "",
    position: 1,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const stats = useMemo(() => getCampaignStats(), [campaigns]);

  const filteredCampaigns = useMemo(() => {
    let result = campaigns;

    if (searchTerm.trim()) {
      const keyword = searchTerm.trim().toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(keyword));
    }

    if (filterStatus !== "all") {
      result = result.filter((c) => c.status === filterStatus);
    }

    return result;
  }, [campaigns, searchTerm, filterStatus]);

  // ==================== CAMPAIGN HANDLERS ====================

  const handleOpenCampaignForm = () => {
    resetCampaignForm();
    setShowCampaignForm(true);
  };

  const handleCloseCampaignForm = () => {
    resetCampaignForm();
    setShowCampaignForm(false);
  };

  const resetCampaignForm = () => {
    setCampaignForm({
      name: "",
      type: "EMAIL",
      status: "Nháp",
      targetAudience: "ALL",
      startDate: "",
      endDate: "",
      budget: 0,
      content: {
        subject: "",
        message: "",
        imageUrl: "",
        ctaText: "",
        ctaLink: "",
      },
    });
    setEditingCampaign(null);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      targetAudience: campaign.targetAudience,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      content: campaign.content,
    });
    setShowCampaignForm(true);
  };

  const handleSubmitCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCampaign) {
        await updateCampaign(editingCampaign.id, campaignForm);
        alert("Cập nhật chiến dịch thành công!");
      } else {
        await addCampaign(campaignForm);
        alert("Thêm chiến dịch thành công!");
      }
      handleCloseCampaignForm();
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  const handleDeleteCampaign = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa chiến dịch này?")) {
      try {
        await deleteCampaign(id);
        alert("Xóa chiến dịch thành công!");
      } catch (error: any) {
        alert(error.message || "Có lỗi xảy ra!");
      }
    }
  };

  const handleLaunchCampaign = async (id: number) => {
    try {
      await launchCampaign(id);
      alert("Chiến dịch đã được khởi chạy!");
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  const handlePauseCampaign = async (id: number) => {
    try {
      await pauseCampaign(id);
      alert("Chiến dịch đã được tạm dừng!");
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  // ==================== BANNER HANDLERS ====================

  const handleOpenBannerForm = () => {
    resetBannerForm();
    setShowBannerForm(true);
  };

  const handleCloseBannerForm = () => {
    resetBannerForm();
    setShowBannerForm(false);
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: "",
      imageUrl: "",
      link: "",
      position: 1,
      isActive: true,
      startDate: "",
      endDate: "",
    });
    setEditingBanner(null);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      imageUrl: banner.imageUrl,
      link: banner.link,
      position: banner.position,
      isActive: banner.isActive,
      startDate: banner.startDate,
      endDate: banner.endDate,
    });
    setShowBannerForm(true);
  };

  const handleSubmitBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerForm);
        alert("Cập nhật banner thành công!");
      } else {
        await addBanner(bannerForm);
        alert("Thêm banner thành công!");
      }
      handleCloseBannerForm();
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  const handleDeleteBanner = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa banner này?")) {
      try {
        await deleteBanner(id);
        alert("Xóa banner thành công!");
      } catch (error: any) {
        alert(error.message || "Có lỗi xảy ra!");
      }
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getCampaignTypeLabel = (type: CampaignType) => {
    const labels = {
      EMAIL: "Email",
      SMS: "SMS",
      PUSH: "Push Notification",
      BANNER: "Banner",
    };
    return labels[type];
  };

  const getTargetAudienceLabel = (audience: TargetAudience) => {
    const labels = {
      ALL: "Tất cả khách hàng",
      NEW_CUSTOMERS: "Khách hàng mới",
      LOYAL_CUSTOMERS: "Khách hàng thân thiết",
      INACTIVE: "Khách hàng không hoạt động",
      CUSTOM: "Tùy chỉnh",
    };
    return labels[audience];
  };

  return (
    <div className="marketing-page">
      <div className="page-header">
        <div>
          <h1>Marketing</h1>
          <p className="page-subtitle">
            Quản lý chiến dịch marketing và quảng cáo
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon campaigns">📢</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalCampaigns}</div>
            <div className="stat-label">Tổng chiến dịch</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">🚀</div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeCampaigns}</div>
            <div className="stat-label">Đang chạy</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <div className="stat-value">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="stat-label">Doanh thu</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon roi">📈</div>
          <div className="stat-content">
            <div className="stat-value">{stats.roi.toFixed(1)}%</div>
            <div className="stat-label">ROI</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "campaigns" ? "active" : ""}
          onClick={() => setActiveTab("campaigns")}
        >
          📢 Chiến dịch
        </button>
        <button
          className={activeTab === "banners" ? "active" : ""}
          onClick={() => setActiveTab("banners")}
        >
          🖼️ Banners
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          📊 Phân tích
        </button>
      </div>

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="tab-content">
          <div className="content-header">
            <div className="filters">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm chiến dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Nháp">Nháp</option>
                <option value="Đang chạy">Đang chạy</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Tạm dừng">Tạm dừng</option>
              </select>
            </div>
            <button className="btn-primary" onClick={handleOpenCampaignForm}>
              ➕ Tạo chiến dịch
            </button>
          </div>

          <div className="campaigns-grid">
            {filteredCampaigns.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📢</div>
                <p>Không tìm thấy chiến dịch nào</p>
              </div>
            ) : (
              filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-card">
                  <div className="campaign-header">
                    <div>
                      <h3>{campaign.name}</h3>
                      <span
                        className={`type-badge ${campaign.type.toLowerCase()}`}
                      >
                        {getCampaignTypeLabel(campaign.type)}
                      </span>
                    </div>
                    <span
                      className={`status-badge ${campaign.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <div className="campaign-info">
                    <div className="info-row">
                      <span className="label">Đối tượng:</span>
                      <span>
                        {getTargetAudienceLabel(campaign.targetAudience)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Thời gian:</span>
                      <span>
                        {formatDate(campaign.startDate)} -{" "}
                        {formatDate(campaign.endDate)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Ngân sách:</span>
                      <span>{formatCurrency(campaign.budget)}</span>
                    </div>
                  </div>

                  <div className="campaign-stats">
                    <div className="stat-item">
                      <div className="stat-number">
                        {campaign.impressions.toLocaleString()}
                      </div>
                      <div className="stat-text">Hiển thị</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">
                        {campaign.clicks.toLocaleString()}
                      </div>
                      <div className="stat-text">Clicks</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">{campaign.conversions}</div>
                      <div className="stat-text">Chuyển đổi</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">
                        {formatCurrency(campaign.revenue)}
                      </div>
                      <div className="stat-text">Doanh thu</div>
                    </div>
                  </div>

                  <div className="campaign-actions">
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="btn-secondary"
                    >
                      ✏️ Sửa
                    </button>
                    {campaign.status === "Nháp" && (
                      <button
                        onClick={() => handleLaunchCampaign(campaign.id)}
                        className="btn-success"
                      >
                        🚀 Khởi chạy
                      </button>
                    )}
                    {campaign.status === "Đang chạy" && (
                      <button
                        onClick={() => handlePauseCampaign(campaign.id)}
                        className="btn-warning"
                      >
                        ⏸️ Tạm dừng
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="btn-danger"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <div className="tab-content">
          <div className="content-header">
            <h2>Quản lý Banners</h2>
            <button className="btn-primary" onClick={handleOpenBannerForm}>
              ➕ Thêm banner
            </button>
          </div>

          <div className="banners-grid">
            {banners.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🖼️</div>
                <p>Chưa có banner nào</p>
              </div>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="banner-card">
                  <div className="banner-image">
                    <img src={banner.imageUrl} alt={banner.title} />
                    {!banner.isActive && (
                      <div className="inactive-overlay">Không hoạt động</div>
                    )}
                  </div>
                  <div className="banner-info">
                    <h3>{banner.title}</h3>
                    <p className="banner-link">🔗 {banner.link}</p>
                    <div className="banner-meta">
                      <span>Vị trí: #{banner.position}</span>
                      <span>
                        {banner.clicks} clicks / {banner.impressions} views
                      </span>
                    </div>
                    <div className="banner-dates">
                      {formatDate(banner.startDate)} -{" "}
                      {formatDate(banner.endDate)}
                    </div>
                  </div>
                  <div className="banner-actions">
                    <button
                      onClick={() => handleEditBanner(banner)}
                      className="btn-secondary"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="btn-danger"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="tab-content">
          <h2>Phân tích hiệu quả</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Tổng quan</h3>
              <div className="analytics-stats">
                <div className="analytics-item">
                  <span className="analytics-label">Tổng chi phí:</span>
                  <span className="analytics-value">
                    {formatCurrency(stats.totalSpent)}
                  </span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Tổng doanh thu:</span>
                  <span className="analytics-value success">
                    {formatCurrency(stats.totalRevenue)}
                  </span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Lợi nhuận:</span>
                  <span className="analytics-value success">
                    {formatCurrency(stats.totalRevenue - stats.totalSpent)}
                  </span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">ROI:</span>
                  <span
                    className={`analytics-value ${stats.roi > 0 ? "success" : "danger"}`}
                  >
                    {stats.roi.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Hiệu suất</h3>
              <div className="analytics-stats">
                <div className="analytics-item">
                  <span className="analytics-label">Tổng clicks:</span>
                  <span className="analytics-value">
                    {stats.totalClicks.toLocaleString()}
                  </span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Tổng chuyển đổi:</span>
                  <span className="analytics-value">
                    {stats.totalConversions}
                  </span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Tỷ lệ chuyển đổi:</span>
                  <span className="analytics-value">
                    {stats.totalClicks > 0
                      ? (
                          (stats.totalConversions / stats.totalClicks) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <div className="modal-overlay" onClick={handleCloseCampaignForm}>
          <div
            className="modal-content large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                {editingCampaign ? "Sửa chiến dịch" : "Tạo chiến dịch mới"}
              </h2>
              <button className="close-btn" onClick={handleCloseCampaignForm}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitCampaign} className="campaign-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên chiến dịch *</label>
                  <input
                    type="text"
                    value={campaignForm.name}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Loại chiến dịch *</label>
                  <select
                    value={campaignForm.type}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        type: e.target.value as CampaignType,
                      })
                    }
                  >
                    <option value="EMAIL">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="PUSH">Push Notification</option>
                    <option value="BANNER">Banner</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Đối tượng *</label>
                  <select
                    value={campaignForm.targetAudience}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        targetAudience: e.target.value as TargetAudience,
                      })
                    }
                  >
                    <option value="ALL">Tất cả khách hàng</option>
                    <option value="NEW_CUSTOMERS">Khách hàng mới</option>
                    <option value="LOYAL_CUSTOMERS">
                      Khách hàng thân thiết
                    </option>
                    <option value="INACTIVE">Khách hàng không hoạt động</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ngân sách (đ) *</label>
                  <input
                    type="number"
                    value={campaignForm.budget}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        budget: Number(e.target.value),
                      })
                    }
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu *</label>
                  <input
                    type="date"
                    value={campaignForm.startDate}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc *</label>
                  <input
                    type="date"
                    value={campaignForm.endDate}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        endDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  value={campaignForm.content.subject}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      content: {
                        ...campaignForm.content,
                        subject: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Nội dung *</label>
                <textarea
                  value={campaignForm.content.message}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      content: {
                        ...campaignForm.content,
                        message: e.target.value,
                      },
                    })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Text CTA</label>
                  <input
                    type="text"
                    value={campaignForm.content.ctaText}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        content: {
                          ...campaignForm.content,
                          ctaText: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Link CTA</label>
                  <input
                    type="text"
                    value={campaignForm.content.ctaLink}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        content: {
                          ...campaignForm.content,
                          ctaLink: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseCampaignForm}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingCampaign ? "Cập nhật" : "Tạo chiến dịch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Form Modal */}
      {showBannerForm && (
        <div className="modal-overlay" onClick={handleCloseBannerForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingBanner ? "Sửa banner" : "Thêm banner mới"}</h2>
              <button className="close-btn" onClick={handleCloseBannerForm}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitBanner} className="banner-form">
              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  value={bannerForm.title}
                  onChange={(e) =>
                    setBannerForm({ ...bannerForm, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>URL hình ảnh *</label>
                <input
                  type="text"
                  value={bannerForm.imageUrl}
                  onChange={(e) =>
                    setBannerForm({ ...bannerForm, imageUrl: e.target.value })
                  }
                  placeholder="/images/banner.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Link đích *</label>
                <input
                  type="text"
                  value={bannerForm.link}
                  onChange={(e) =>
                    setBannerForm({ ...bannerForm, link: e.target.value })
                  }
                  placeholder="/products"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vị trí *</label>
                  <input
                    type="number"
                    value={bannerForm.position}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        position: Number(e.target.value),
                      })
                    }
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={bannerForm.isActive ? "active" : "inactive"}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        isActive: e.target.value === "active",
                      })
                    }
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu *</label>
                  <input
                    type="date"
                    value={bannerForm.startDate}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc *</label>
                  <input
                    type="date"
                    value={bannerForm.endDate}
                    onChange={(e) =>
                      setBannerForm({ ...bannerForm, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseBannerForm}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingBanner ? "Cập nhật" : "Thêm banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketingPage;

import { useMemo, useState } from "react";
import {
  useVouchers,
  type Voucher,
  type VoucherType,
  type ApplicableType,
} from "../VoucherContext";
import { useCategories } from "../CategoryContext";
import "../admincss/VouchersPage.css";

function VouchersPage() {
  const {
    vouchers,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    getActiveVouchers,
  } = useVouchers();
  const { categories } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "PERCENTAGE" as VoucherType,
    value: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    usageLimit: 0,
    startDate: "",
    endDate: "",
    status: "Hoạt động" as const,
    applicableType: "ALL" as ApplicableType,
    applicableIds: [] as number[],
  });

  const filteredVouchers = useMemo(() => {
    let result = vouchers;

    // Filter by search term
    if (searchTerm.trim()) {
      const keyword = searchTerm.trim().toLowerCase();
      result = result.filter((v) => {
        const text = `${v.code} ${v.name} ${v.description}`.toLowerCase();
        return text.includes(keyword);
      });
    }

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((v) => v.status === filterStatus);
    }

    return result;
  }, [vouchers, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const active = vouchers.filter((v) => v.status === "Hoạt động").length;
    const expired = vouchers.filter((v) => v.status === "Hết hạn").length;
    const paused = vouchers.filter((v) => v.status === "Tạm dừng").length;
    const totalUsed = vouchers.reduce((sum, v) => sum + v.usedCount, 0);

    return { active, expired, paused, totalUsed };
  }, [vouchers]);

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      type: "PERCENTAGE",
      value: 0,
      minOrderValue: 0,
      maxDiscount: 0,
      usageLimit: 0,
      startDate: "",
      endDate: "",
      status: "Hoạt động",
      applicableType: "ALL",
      applicableIds: [],
    });
    setEditingVoucher(null);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    resetForm();
    setShowForm(false);
  };

  const handleOpenEditForm = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      name: voucher.name,
      description: voucher.description,
      type: voucher.type,
      value: voucher.value,
      minOrderValue: voucher.minOrderValue,
      maxDiscount: voucher.maxDiscount || 0,
      usageLimit: voucher.usageLimit,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      status: voucher.status,
      applicableType: voucher.applicableType,
      applicableIds: voucher.applicableIds,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVoucher) {
        await updateVoucher(editingVoucher.id, formData);
        alert("Cập nhật mã giảm giá thành công!");
      } else {
        await addVoucher(formData);
        alert("Thêm mã giảm giá thành công!");
      }
      handleCloseForm();
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa mã giảm giá này?")) {
      try {
        await deleteVoucher(id);
        alert("Xóa mã giảm giá thành công!");
      } catch (error: any) {
        alert(error.message || "Có lỗi xảy ra!");
      }
    }
  };

  const handleToggleStatus = async (voucher: Voucher) => {
    const newStatus = voucher.status === "Hoạt động" ? "Tạm dừng" : "Hoạt động";
    try {
      await updateVoucher(voucher.id, { status: newStatus });
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra!");
    }
  };

  const formatDiscount = (voucher: Voucher) => {
    if (voucher.type === "PERCENTAGE") {
      return `${voucher.value}%`;
    }
    return `${voucher.value.toLocaleString()}đ`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="vouchers-page">
      <div className="page-header">
        <div>
          <h1>Quản lý mã giảm giá</h1>
          <p className="page-subtitle">
            Tạo và quản lý các mã giảm giá cho khách hàng
          </p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddForm}>
          <span className="icon">➕</span>
          Thêm mã giảm giá
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon active">🎫</div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">Đang hoạt động</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon expired">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{stats.expired}</div>
            <div className="stat-label">Hết hạn</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon paused">⏸️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.paused}</div>
            <div className="stat-label">Tạm dừng</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon used">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsed}</div>
            <div className="stat-label">Lượt sử dụng</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
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
          <option value="Hoạt động">Hoạt động</option>
          <option value="Hết hạn">Hết hạn</option>
          <option value="Tạm dừng">Tạm dừng</option>
        </select>
      </div>

      {/* Vouchers Table */}
      <div className="table-container">
        <table className="vouchers-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Loại</th>
              <th>Giảm giá</th>
              <th>Đơn tối thiểu</th>
              <th>Sử dụng</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.length === 0 ? (
              <tr>
                <td colSpan={9} className="empty-state">
                  <div className="empty-icon">🎫</div>
                  <p>Không tìm thấy mã giảm giá nào</p>
                </td>
              </tr>
            ) : (
              filteredVouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td>
                    <div className="voucher-code">{voucher.code}</div>
                  </td>
                  <td>
                    <div className="voucher-name">{voucher.name}</div>
                    <div className="voucher-desc">{voucher.description}</div>
                  </td>
                  <td>
                    <span
                      className={`type-badge ${voucher.type.toLowerCase()}`}
                    >
                      {voucher.type === "PERCENTAGE" ? "Phần trăm" : "Số tiền"}
                    </span>
                  </td>
                  <td>
                    <strong>{formatDiscount(voucher)}</strong>
                    {voucher.type === "PERCENTAGE" && voucher.maxDiscount && (
                      <div className="max-discount">
                        Tối đa: {voucher.maxDiscount.toLocaleString()}đ
                      </div>
                    )}
                  </td>
                  <td>{voucher.minOrderValue.toLocaleString()}đ</td>
                  <td>
                    <div className="usage-info">
                      {voucher.usedCount}
                      {voucher.usageLimit > 0 && ` / ${voucher.usageLimit}`}
                      {voucher.usageLimit === 0 && " / ∞"}
                    </div>
                  </td>
                  <td>
                    <div className="date-range">
                      <div>{formatDate(voucher.startDate)}</div>
                      <div className="date-separator">→</div>
                      <div>{formatDate(voucher.endDate)}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${voucher.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {voucher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-menu">
                      <button
                        className="action-btn"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === voucher.id ? null : voucher.id,
                          )
                        }
                      >
                        ⋮
                      </button>
                      {openMenuId === voucher.id && (
                        <div className="action-dropdown">
                          <button
                            onClick={() => {
                              handleOpenEditForm(voucher);
                              setOpenMenuId(null);
                            }}
                          >
                            ✏️ Sửa
                          </button>
                          <button
                            onClick={() => {
                              handleToggleStatus(voucher);
                              setOpenMenuId(null);
                            }}
                          >
                            {voucher.status === "Hoạt động"
                              ? "⏸️ Tạm dừng"
                              : "▶️ Kích hoạt"}
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(voucher.id);
                              setOpenMenuId(null);
                            }}
                            className="danger"
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingVoucher ? "Sửa mã giảm giá" : "Thêm mã giảm giá mới"}
              </h2>
              <button className="close-btn" onClick={handleCloseForm}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="voucher-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Mã giảm giá *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="VD: SUMMER2026"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tên mã *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="VD: Giảm giá mùa hè"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Mô tả chi tiết về mã giảm giá"
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Loại giảm giá *</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as VoucherType,
                      })
                    }
                  >
                    <option value="PERCENTAGE">Phần trăm (%)</option>
                    <option value="FIXED_AMOUNT">Số tiền cố định (đ)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Giá trị giảm *</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        value: Number(e.target.value),
                      })
                    }
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Đơn hàng tối thiểu (đ)</label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minOrderValue: Number(e.target.value),
                      })
                    }
                    min="0"
                  />
                </div>
                {formData.type === "PERCENTAGE" && (
                  <div className="form-group">
                    <label>Giảm tối đa (đ)</label>
                    <input
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDiscount: Number(e.target.value),
                        })
                      }
                      min="0"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Số lần sử dụng tối đa (0 = không giới hạn)</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usageLimit: Number(e.target.value),
                    })
                  }
                  min="0"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Áp dụng cho</label>
                <select
                  value={formData.applicableType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicableType: e.target.value as ApplicableType,
                      applicableIds: [],
                    })
                  }
                >
                  <option value="ALL">Tất cả sản phẩm</option>
                  <option value="CATEGORY">Danh mục cụ thể</option>
                  <option value="PRODUCT">Sản phẩm cụ thể</option>
                </select>
              </div>

              {formData.applicableType === "CATEGORY" && (
                <div className="form-group">
                  <label>Chọn danh mục</label>
                  <select
                    multiple
                    value={formData.applicableIds.map(String)}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(
                        (opt) => Number(opt.value),
                      );
                      setFormData({ ...formData, applicableIds: selected });
                    }}
                    size={5}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  <small>Giữ Ctrl để chọn nhiều danh mục</small>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseForm}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingVoucher ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VouchersPage;

import { useEffect, useMemo, useState } from "react";
import { initializeSampleOrders } from "../sampleOrders";
import "../admincss/OrdersPage.css";

interface OrderItem {
  productId: number;
  productName: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  status:
    | "CHO_XAC_NHAN"
    | "DA_XAC_NHAN"
    | "DANG_CHUAN_BI"
    | "DANG_GIAO"
    | "HOAN_THANH"
    | "DA_HUY"
    | "HOAN_TRA";
  note?: string;
  cancelReason?: string;
  returnReason?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: string;
    note: string;
    createdAt: string;
    createdBy: string;
  }[];
}

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

function OrdersPage() {
  // Initialize sample orders if none exist
  useEffect(() => {
    initializeSampleOrders();
  }, []);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("btldata_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusForm, setStatusForm] = useState({
    newStatus: "",
    note: "",
  });

  useEffect(() => {
    localStorage.setItem("btldata_orders", JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (searchTerm) {
      const keyword = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(keyword) ||
          order.customerName.toLowerCase().includes(keyword) ||
          order.customerPhone.includes(keyword),
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [orders, selectedStatus, searchTerm]);

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "CHO_XAC_NHAN").length,
      confirmed: orders.filter((o) => o.status === "DA_XAC_NHAN").length,
      preparing: orders.filter((o) => o.status === "DANG_CHUAN_BI").length,
      shipping: orders.filter((o) => o.status === "DANG_GIAO").length,
      completed: orders.filter((o) => o.status === "HOAN_THANH").length,
      cancelled: orders.filter((o) => o.status === "DA_HUY").length,
      returned: orders.filter((o) => o.status === "HOAN_TRA").length,
    };
  }, [orders]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      CHO_XAC_NHAN: "Chờ xác nhận",
      DA_XAC_NHAN: "Đã xác nhận",
      DANG_CHUAN_BI: "Đang chuẩn bị",
      DANG_GIAO: "Đang giao",
      HOAN_THANH: "Hoàn thành",
      DA_HUY: "Đã hủy",
      HOAN_TRA: "Hoàn trả",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      CHO_XAC_NHAN: "badge-orange",
      DA_XAC_NHAN: "badge-blue",
      DANG_CHUAN_BI: "badge-purple",
      DANG_GIAO: "badge-cyan",
      HOAN_THANH: "badge-green",
      DA_HUY: "badge-red",
      HOAN_TRA: "badge-gray",
    };
    return classes[status] || "badge-gray";
  };

  const getNextStatuses = (currentStatus: string) => {
    const statusFlow: Record<string, string[]> = {
      CHO_XAC_NHAN: ["DA_XAC_NHAN", "DA_HUY"],
      DA_XAC_NHAN: ["DANG_CHUAN_BI", "DA_HUY"],
      DANG_CHUAN_BI: ["DANG_GIAO", "DA_HUY"],
      DANG_GIAO: ["HOAN_THANH", "HOAN_TRA"],
      HOAN_THANH: ["HOAN_TRA"],
      DA_HUY: [],
      HOAN_TRA: [],
    };
    return statusFlow[currentStatus] || [];
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    const nextStatuses = getNextStatuses(order.status);
    setStatusForm({
      newStatus: nextStatuses[0] || "",
      note: "",
    });
    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    setStatusForm({ newStatus: "", note: "" });
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOrder) return;

    const updatedOrder: Order = {
      ...selectedOrder,
      status: statusForm.newStatus as any,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...selectedOrder.statusHistory,
        {
          status: statusForm.newStatus,
          note: statusForm.note,
          createdAt: new Date().toISOString(),
          createdBy: "Admin",
        },
      ],
    };

    // Nếu chuyển sang trạng thái "Đang giao", tự động xuất kho
    if (statusForm.newStatus === "DANG_GIAO") {
      handleAutoExportStock(selectedOrder);
    }

    // Nếu hoàn thành, tự động nhập kho lại (nếu hoàn trả)
    if (statusForm.newStatus === "HOAN_TRA") {
      handleAutoImportStock(selectedOrder);
    }

    setOrders(
      orders.map((o) => (o.id === selectedOrder.id ? updatedOrder : o)),
    );

    alert(
      `Đã cập nhật trạng thái đơn hàng thành: ${getStatusLabel(statusForm.newStatus)}`,
    );
    handleCloseStatusModal();
  };

  const handleAutoExportStock = (order: Order) => {
    // Tự động xuất kho khi đơn hàng chuyển sang "Đang giao"
    const inventory = JSON.parse(
      localStorage.getItem("btldata_inventory") || "[]",
    );
    const transactions = JSON.parse(
      localStorage.getItem("btldata_stock_transactions") || "[]",
    );

    order.items.forEach((item) => {
      // Tìm sản phẩm trong kho (ưu tiên kho Hà Nội)
      const inventoryItem = inventory.find(
        (inv: any) =>
          inv.productId === item.productId && inv.warehouse === "Kho Hà Nội",
      );

      if (inventoryItem && inventoryItem.available >= item.quantity) {
        // Tạo giao dịch xuất kho
        const newTransaction = {
          id: transactions.length + 1,
          type: "XUAT",
          productId: item.productId,
          productName: item.productName,
          sku: item.sku,
          warehouse: "Kho Hà Nội",
          quantity: item.quantity,
          beforeStock: inventoryItem.stock,
          afterStock: inventoryItem.stock - item.quantity,
          reason: `Xuất hàng cho đơn ${order.orderNumber}`,
          note: `Tự động xuất kho khi đơn hàng chuyển sang trạng thái Đang giao`,
          createdBy: "System",
          createdAt: new Date().toISOString(),
        };

        transactions.push(newTransaction);

        // Cập nhật tồn kho
        inventoryItem.stock -= item.quantity;
        inventoryItem.available -= item.quantity;
        inventoryItem.lastUpdated = new Date().toISOString();
      }
    });

    localStorage.setItem("btldata_inventory", JSON.stringify(inventory));
    localStorage.setItem(
      "btldata_stock_transactions",
      JSON.stringify(transactions),
    );
  };

  const handleAutoImportStock = (order: Order) => {
    // Tự động nhập kho lại khi đơn hàng hoàn trả
    const inventory = JSON.parse(
      localStorage.getItem("btldata_inventory") || "[]",
    );
    const transactions = JSON.parse(
      localStorage.getItem("btldata_stock_transactions") || "[]",
    );

    order.items.forEach((item) => {
      const inventoryItem = inventory.find(
        (inv: any) =>
          inv.productId === item.productId && inv.warehouse === "Kho Hà Nội",
      );

      if (inventoryItem) {
        const newTransaction = {
          id: transactions.length + 1,
          type: "NHAP",
          productId: item.productId,
          productName: item.productName,
          sku: item.sku,
          warehouse: "Kho Hà Nội",
          quantity: item.quantity,
          beforeStock: inventoryItem.stock,
          afterStock: inventoryItem.stock + item.quantity,
          reason: `Nhập lại hàng hoàn trả từ đơn ${order.orderNumber}`,
          note: `Tự động nhập kho khi đơn hàng hoàn trả`,
          createdBy: "System",
          createdAt: new Date().toISOString(),
        };

        transactions.push(newTransaction);

        inventoryItem.stock += item.quantity;
        inventoryItem.available += item.quantity;
        inventoryItem.lastUpdated = new Date().toISOString();
      }
    });

    localStorage.setItem("btldata_inventory", JSON.stringify(inventory));
    localStorage.setItem(
      "btldata_stock_transactions",
      JSON.stringify(transactions),
    );
  };

  return (
    <div className="page-content orders-page">
      <div className="page-header">
        <h2>Quản lý đơn hàng</h2>
        <div className="header-stats">
          <span>
            Tổng: <strong>{orderStats.total}</strong>
          </span>
          <span className="text-orange">
            Chờ xác nhận: <strong>{orderStats.pending}</strong>
          </span>
          <span className="text-blue">
            Đang xử lý:{" "}
            <strong>{orderStats.confirmed + orderStats.preparing}</strong>
          </span>
          <span className="text-green">
            Hoàn thành: <strong>{orderStats.completed}</strong>
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="orders-stats">
        <div
          className="stat-card"
          onClick={() => setSelectedStatus("CHO_XAC_NHAN")}
        >
          <div className="stat-icon orange">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Chờ xác nhận</span>
            <strong className="stat-value">{orderStats.pending}</strong>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setSelectedStatus("DA_XAC_NHAN")}
        >
          <div className="stat-icon blue">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Đã xác nhận</span>
            <strong className="stat-value">{orderStats.confirmed}</strong>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setSelectedStatus("DANG_GIAO")}
        >
          <div className="stat-icon cyan">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Đang giao</span>
            <strong className="stat-value">{orderStats.shipping}</strong>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setSelectedStatus("HOAN_THANH")}
        >
          <div className="stat-icon green">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Hoàn thành</span>
            <strong className="stat-value">{orderStats.completed}</strong>
          </div>
        </div>

        <div className="stat-card" onClick={() => setSelectedStatus("DA_HUY")}>
          <div className="stat-icon red">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Đã hủy</span>
            <strong className="stat-value">{orderStats.cancelled}</strong>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setSelectedStatus("HOAN_TRA")}
        >
          <div className="stat-icon gray">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Hoàn trả</span>
            <strong className="stat-value">{orderStats.returned}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-toolbar">
        <div className="search-box">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
          />
        </div>

        <select
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
          <option value="DA_XAC_NHAN">Đã xác nhận</option>
          <option value="DANG_CHUAN_BI">Đang chuẩn bị</option>
          <option value="DANG_GIAO">Đang giao</option>
          <option value="HOAN_THANH">Hoàn thành</option>
          <option value="DA_HUY">Đã hủy</option>
          <option value="HOAN_TRA">Hoàn trả</option>
        </select>

        {selectedStatus !== "ALL" && (
          <button
            className="btn-secondary"
            onClick={() => setSelectedStatus("ALL")}
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong className="order-number">
                      {order.orderNumber}
                    </strong>
                  </td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.customerName}</strong>
                      <span>{order.customerPhone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="order-items-preview">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <span key={idx}>
                          {item.productName} x{item.quantity}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span className="more-items">
                          +{order.items.length - 2} sản phẩm
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <strong className="order-total">
                      {formatCurrency(order.total)}
                    </strong>
                  </td>
                  <td>
                    {order.paymentMethod === "COD" ? "COD" : "Chuyển khoản"}
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-action-info"
                        title="Chi tiết"
                        onClick={() => handleViewDetail(order)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Chi tiết</span>
                      </button>
                      {getNextStatuses(order.status).length > 0 && (
                        <button
                          className="btn-action btn-action-primary"
                          title="Cập nhật trạng thái"
                          onClick={() => handleOpenStatusModal(order)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Cập nhật</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <h3>Không có đơn hàng nào</h3>
                    <p>
                      Chưa có đơn hàng hoặc không tìm thấy đơn hàng phù hợp.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>Chi tiết đơn hàng {selectedOrder.orderNumber}</h3>
                <span
                  className={`badge ${getStatusClass(selectedOrder.status)}`}
                >
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
              <button className="modal-close" onClick={handleCloseDetail}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-detail-grid">
                {/* Customer Info */}
                <div className="detail-section">
                  <h4>Thông tin khách hàng</h4>
                  <div className="detail-info">
                    <div className="info-row">
                      <span>Họ tên:</span>
                      <strong>{selectedOrder.customerName}</strong>
                    </div>
                    <div className="info-row">
                      <span>Email:</span>
                      <strong>{selectedOrder.customerEmail}</strong>
                    </div>
                    <div className="info-row">
                      <span>Số điện thoại:</span>
                      <strong>{selectedOrder.customerPhone}</strong>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="detail-section">
                  <h4>Địa chỉ giao hàng</h4>
                  <div className="detail-info">
                    <div className="info-row">
                      <span>Người nhận:</span>
                      <strong>{selectedOrder.shippingAddress.fullName}</strong>
                    </div>
                    <div className="info-row">
                      <span>SĐT:</span>
                      <strong>{selectedOrder.shippingAddress.phone}</strong>
                    </div>
                    <div className="info-row">
                      <span>Địa chỉ:</span>
                      <strong>
                        {selectedOrder.shippingAddress.address},{" "}
                        {selectedOrder.shippingAddress.ward},{" "}
                        {selectedOrder.shippingAddress.district},{" "}
                        {selectedOrder.shippingAddress.city}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="detail-section">
                <h4>Sản phẩm đã đặt</h4>
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="item-info">
                            {item.image && (
                              <img src={item.image} alt={item.productName} />
                            )}
                            <div>
                              <strong>{item.productName}</strong>
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>Màu: {item.color}</span>}
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>x{item.quantity}</td>
                        <td>
                          <strong>
                            {formatCurrency(item.price * item.quantity)}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary */}
              <div className="detail-section">
                <h4>Tổng kết đơn hàng</h4>
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                  </div>
                  <div className="summary-row total">
                    <strong>Tổng cộng:</strong>
                    <strong className="total-amount">
                      {formatCurrency(selectedOrder.total)}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Phương thức thanh toán:</span>
                    <strong>
                      {selectedOrder.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng (COD)"
                        : "Chuyển khoản ngân hàng"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Status History */}
              <div className="detail-section">
                <h4>Lịch sử trạng thái</h4>
                <div className="status-timeline">
                  {selectedOrder.statusHistory.map((history, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <strong>{getStatusLabel(history.status)}</strong>
                          <span>
                            {new Date(history.createdAt).toLocaleString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                        {history.note && <p>{history.note}</p>}
                        <span className="timeline-user">
                          Bởi: {history.createdBy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseDetail}>
                Đóng
              </button>
              {getNextStatuses(selectedOrder.status).length > 0 && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    handleCloseDetail();
                    handleOpenStatusModal(selectedOrder);
                  }}
                >
                  Cập nhật trạng thái
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseStatusModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cập nhật trạng thái đơn hàng</h3>
              <button className="modal-close" onClick={handleCloseStatusModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateStatus}>
              <div className="modal-body">
                <div className="current-status-info">
                  <p>
                    Đơn hàng: <strong>{selectedOrder.orderNumber}</strong>
                  </p>
                  <p>
                    Trạng thái hiện tại:{" "}
                    <span
                      className={`badge ${getStatusClass(selectedOrder.status)}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </p>
                </div>

                <div className="form-grid">
                  <label className="full-width">
                    Trạng thái mới
                    <select
                      value={statusForm.newStatus}
                      onChange={(e) =>
                        setStatusForm({
                          ...statusForm,
                          newStatus: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">-- Chọn trạng thái --</option>
                      {getNextStatuses(selectedOrder.status).map((status) => (
                        <option key={status} value={status}>
                          {getStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="full-width">
                    Ghi chú
                    <textarea
                      value={statusForm.note}
                      onChange={(e) =>
                        setStatusForm({ ...statusForm, note: e.target.value })
                      }
                      rows={4}
                      placeholder="Nhập ghi chú về việc cập nhật trạng thái..."
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseStatusModal}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Xác nhận cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

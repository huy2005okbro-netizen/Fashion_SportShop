import { useState } from "react";
import "../customercss/OrdersPage.css";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status:
    | "pending"
    | "confirmed"
    | "shipping"
    | "delivered"
    | "cancelled"
    | "returned";
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

interface OrdersPageProps {
  onBack: () => void;
}

function OrdersPage({ onBack }: OrdersPageProps) {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  // Mock data - trong thực tế sẽ lấy từ API
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "DH2026040701",
      date: "07/04/2026 14:30",
      status: "delivered",
      items: [
        {
          id: "1",
          name: "Giày Chạy Bộ Nike Air Zoom Pegasus 40 - Đen - Size 42",
          price: 3290000,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
        },
      ],
      total: 3290000,
      shippingAddress: "123 Nguyễn Văn Linh, Phường 1, Quận 1, TP. Hồ Chí Minh",
      paymentMethod: "COD",
      trackingNumber: "VN123456789",
    },
    {
      id: "2",
      orderNumber: "DH2026040601",
      date: "06/04/2026 10:15",
      status: "shipping",
      items: [
        {
          id: "2",
          name: "Áo Thun Thể Thao Nam Adidas - Trắng - Size L",
          price: 899000,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
          quantity: 2,
        },
      ],
      total: 1798000,
      shippingAddress: "456 Lê Lợi, Phường 2, Quận 3, TP. Hồ Chí Minh",
      paymentMethod: "Chuyển khoản",
      trackingNumber: "VN987654321",
    },
    {
      id: "3",
      orderNumber: "DH2026040501",
      date: "05/04/2026 16:45",
      status: "confirmed",
      items: [
        {
          id: "3",
          name: "Quần Short Chạy Bộ Nữ Puma - Đen - Size M",
          price: 799000,
          image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
        },
      ],
      total: 799000,
      shippingAddress: "789 Trần Hưng Đạo, Phường 5, Quận 5, TP. Hồ Chí Minh",
      paymentMethod: "COD",
    },
    {
      id: "4",
      orderNumber: "DH2026040401",
      date: "04/04/2026 09:20",
      status: "pending",
      items: [
        {
          id: "4",
          name: "Giày Nike React Infinity Run - Xanh - Size 40",
          price: 3590000,
          image:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
        },
      ],
      total: 3590000,
      shippingAddress: "321 Võ Văn Tần, Phường 6, Quận 3, TP. Hồ Chí Minh",
      paymentMethod: "Chuyển khoản",
    },
  ]);

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipping: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
      returned: "Đã hoàn trả",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order["status"]) => {
    const colorMap = {
      pending: "#fbbf24",
      confirmed: "#3b82f6",
      shipping: "#8b5cf6",
      delivered: "#10b981",
      cancelled: "#ef4444",
      returned: "#6b7280",
    };
    return colorMap[status];
  };

  const filterOrders = () => {
    if (selectedTab === "all") return orders;
    return orders.filter((order) => order.status === selectedTab);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
  };

  const handleRequestReturn = (order: Order) => {
    setSelectedOrder(order);
    setShowReturnModal(true);
  };

  const handleSubmitReturn = () => {
    if (!returnReason.trim()) {
      alert("Vui lòng nhập lý do hoàn trả");
      return;
    }

    alert(
      `Yêu cầu hoàn trả đã được gửi!\n\nMã đơn hàng: ${selectedOrder?.orderNumber}\nLý do: ${returnReason}\n\nChúng tôi sẽ xử lý yêu cầu trong vòng 24h.`,
    );
    setShowReturnModal(false);
    setReturnReason("");
    setSelectedOrder(null);
  };

  const handleCancelReturn = () => {
    setShowReturnModal(false);
    setReturnReason("");
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <button className="btn-back" onClick={onBack}>
            ← Quay lại
          </button>
          <h1>Đơn Hàng Của Tôi</h1>
        </div>

        {/* Tabs */}
        <div className="orders-tabs">
          <button
            className={selectedTab === "all" ? "active" : ""}
            onClick={() => setSelectedTab("all")}
          >
            Tất cả
          </button>
          <button
            className={selectedTab === "pending" ? "active" : ""}
            onClick={() => setSelectedTab("pending")}
          >
            Chờ xác nhận
          </button>
          <button
            className={selectedTab === "confirmed" ? "active" : ""}
            onClick={() => setSelectedTab("confirmed")}
          >
            Đã xác nhận
          </button>
          <button
            className={selectedTab === "shipping" ? "active" : ""}
            onClick={() => setSelectedTab("shipping")}
          >
            Đang giao
          </button>
          <button
            className={selectedTab === "delivered" ? "active" : ""}
            onClick={() => setSelectedTab("delivered")}
          >
            Đã giao
          </button>
          <button
            className={selectedTab === "cancelled" ? "active" : ""}
            onClick={() => setSelectedTab("cancelled")}
          >
            Đã hủy
          </button>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filterOrders().length === 0 ? (
            <div className="empty-orders">
              <div className="empty-icon">📦</div>
              <h3>Chưa có đơn hàng nào</h3>
              <p>Hãy mua sắm ngay để trải nghiệm dịch vụ của chúng tôi!</p>
            </div>
          ) : (
            filterOrders().map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-number">#{order.orderNumber}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Tổng tiền:</span>
                    <span className="total-amount">
                      {order.total.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="order-actions">
                    <button
                      className="btn-view-detail"
                      onClick={() => handleViewDetail(order)}
                    >
                      Xem chi tiết
                    </button>
                    {order.status === "delivered" && (
                      <button
                        className="btn-return"
                        onClick={() => handleRequestReturn(order)}
                      >
                        Yêu cầu hoàn trả
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button className="btn-cancel">Hủy đơn</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && !showReturnModal && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi Tiết Đơn Hàng</h2>
              <button className="btn-close" onClick={handleCloseDetail}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin đơn hàng</h3>
                <div className="detail-row">
                  <span>Mã đơn hàng:</span>
                  <strong>{selectedOrder.orderNumber}</strong>
                </div>
                <div className="detail-row">
                  <span>Ngày đặt:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="detail-row">
                  <span>Trạng thái:</span>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(selectedOrder.status),
                    }}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="detail-row">
                    <span>Mã vận đơn:</span>
                    <strong>{selectedOrder.trackingNumber}</strong>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>Địa chỉ giao hàng</h3>
                <p>{selectedOrder.shippingAddress}</p>
              </div>

              <div className="detail-section">
                <h3>Phương thức thanh toán</h3>
                <p>{selectedOrder.paymentMethod}</p>
              </div>

              <div className="detail-section">
                <h3>Sản phẩm</h3>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="detail-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Số lượng: {item.quantity}</p>
                      <p className="item-price">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="detail-total">
                <span>Tổng cộng:</span>
                <span className="total-amount">
                  {selectedOrder.total.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && selectedOrder && (
        <div className="modal-overlay" onClick={handleCancelReturn}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Yêu Cầu Hoàn Trả</h2>
              <button className="btn-close" onClick={handleCancelReturn}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="return-info">
                <p>
                  <strong>Mã đơn hàng:</strong> {selectedOrder.orderNumber}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {selectedOrder.total.toLocaleString()}đ
                </p>
              </div>

              <div className="form-group">
                <label>
                  Lý do hoàn trả <span className="required">*</span>
                </label>
                <textarea
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  placeholder="Vui lòng mô tả lý do hoàn trả (sản phẩm lỗi, không đúng mô tả, v.v.)"
                  rows={5}
                />
              </div>

              <div className="return-policy">
                <h4>Chính sách hoàn trả:</h4>
                <ul>
                  <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng</li>
                  <li>Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                  <li>Có hóa đơn mua hàng</li>
                  <li>
                    Phí vận chuyển hoàn trả do khách hàng chịu (nếu không phải
                    lỗi của shop)
                  </li>
                </ul>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-cancel-modal"
                  onClick={handleCancelReturn}
                >
                  Hủy
                </button>
                <button
                  className="btn-submit-return"
                  onClick={handleSubmitReturn}
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

import "../admincss/OrdersPage.css";

function OrdersPage() {
  const orders = [
    {
      id: "#ORD001",
      customer: "Nguyễn Văn A",
      date: "24/03/2026",
      total: "1,250,000đ",
      status: "Đang giao",
    },
    {
      id: "#ORD002",
      customer: "Trần Thị B",
      date: "24/03/2026",
      total: "850,000đ",
      status: "Hoàn thành",
    },
    {
      id: "#ORD003",
      customer: "Lê Văn C",
      date: "23/03/2026",
      total: "2,100,000đ",
      status: "Chờ xử lý",
    },
    {
      id: "#ORD004",
      customer: "Phạm Thị D",
      date: "23/03/2026",
      total: "450,000đ",
      status: "Đã hủy",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý đơn hàng</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Chờ xử lý</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.id}</strong>
                </td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <strong>{order.total}</strong>
                </td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Hoàn thành"
                        ? "badge-green"
                        : order.status === "Đang giao"
                          ? "badge-blue"
                          : order.status === "Chờ xử lý"
                            ? "badge-orange"
                            : "badge-red"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Chi tiết">
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
                    </button>
                    <button className="btn-icon" title="In">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;

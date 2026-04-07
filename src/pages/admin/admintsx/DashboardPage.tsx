import "../admincss/DashboardPage.css";

function DashboardPage() {
  const revenueData = [
    { month: "T1", value: 85 },
    { month: "T2", value: 92 },
    { month: "T3", value: 78 },
    { month: "T4", value: 95 },
    { month: "T5", value: 88 },
    { month: "T6", value: 110 },
    { month: "T7", value: 125 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "Nguyễn Văn A",
      product: "Giày Nike Air Max",
      amount: "2,500,000đ",
      status: "Đã giao",
    },
    {
      id: "#ORD-2024-002",
      customer: "Trần Thị B",
      product: "Áo Adidas Pro",
      amount: "1,200,000đ",
      status: "Đang giao",
    },
    {
      id: "#ORD-2024-003",
      customer: "Lê Văn C",
      product: "Quần Puma Training",
      amount: "850,000đ",
      status: "Đang xử lý",
    },
    {
      id: "#ORD-2024-004",
      customer: "Phạm Thị D",
      product: "Giày Converse Classic",
      amount: "1,800,000đ",
      status: "Đã giao",
    },
    {
      id: "#ORD-2024-005",
      customer: "Hoàng Văn E",
      product: "Áo Nike Dri-Fit",
      amount: "950,000đ",
      status: "Đang giao",
    },
  ];

  const topProducts = [
    {
      name: "Giày Nike Air Max 270",
      sold: 234,
      revenue: "58,500,000đ",
      trend: "+12%",
    },
    {
      name: "Áo Adidas Originals",
      sold: 189,
      revenue: "22,680,000đ",
      trend: "+8%",
    },
    {
      name: "Quần Puma Training Pro",
      sold: 156,
      revenue: "13,260,000đ",
      trend: "+15%",
    },
    {
      name: "Giày Converse Chuck Taylor",
      sold: 142,
      revenue: "25,560,000đ",
      trend: "+5%",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Doanh thu tháng này</h3>
            <p className="stat-value">125,000,000đ</p>
            <span className="stat-change positive">
              +12.5% so với tháng trước
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Đơn hàng</h3>
            <p className="stat-value">1,234</p>
            <span className="stat-change positive">
              +8.2% so với tháng trước
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Khách hàng mới</h3>
            <p className="stat-value">8,456</p>
            <span className="stat-change positive">
              +15.3% so với tháng trước
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Tổng sản phẩm</h3>
            <p className="stat-value">567</p>
            <span className="stat-change negative">
              -2.1% so với tháng trước
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="chart-card">
          <div className="card-header">
            <h3>Doanh thu 7 tháng gần đây</h3>
            <span className="card-subtitle">Đơn vị: triệu đồng</span>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {revenueData.map((item, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                    >
                      <span className="bar-value">{item.value}</span>
                    </div>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="top-products-card">
          <div className="card-header">
            <h3>Sản phẩm bán chạy</h3>
            <span className="card-subtitle">Top 4 sản phẩm</span>
          </div>
          <div className="top-products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">{index + 1}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>Đã bán: {product.sold} sản phẩm</p>
                </div>
                <div className="product-stats">
                  <span className="product-revenue">{product.revenue}</span>
                  <span className="product-trend positive">
                    {product.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-orders-card">
        <div className="card-header">
          <h3>Đơn hàng gần đây</h3>
          <button className="view-all-btn">Xem tất cả →</button>
        </div>
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>
                    <strong>{order.amount}</strong>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        order.status === "Đã giao"
                          ? "delivered"
                          : order.status === "Đang giao"
                            ? "shipping"
                            : "processing"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

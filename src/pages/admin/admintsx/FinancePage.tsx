import "../admincss/FinancePage.css";

function FinancePage() {
  const transactions = [
    {
      id: "#TXN001",
      date: "24/03/2026",
      type: "Thu",
      description: "Thanh toán đơn hàng #ORD001",
      amount: "+1,250,000đ",
      status: "Hoàn thành",
    },
    {
      id: "#TXN002",
      date: "24/03/2026",
      type: "Thu",
      description: "Thanh toán đơn hàng #ORD002",
      amount: "+850,000đ",
      status: "Hoàn thành",
    },
    {
      id: "#TXN003",
      date: "23/03/2026",
      type: "Chi",
      description: "Nhập hàng từ nhà cung cấp",
      amount: "-5,000,000đ",
      status: "Hoàn thành",
    },
    {
      id: "#TXN004",
      date: "23/03/2026",
      type: "Thu",
      description: "Thanh toán đơn hàng #ORD003",
      amount: "+2,100,000đ",
      status: "Đang xử lý",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý tài chính</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>Tất cả giao dịch</option>
            <option>Thu</option>
            <option>Chi</option>
          </select>
          <select className="filter-select">
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>Tháng này</option>
          </select>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: "24px" }}>
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
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Tổng thu</h3>
            <p className="stat-value">125,000,000đ</p>
            <span className="stat-change positive">+12.5%</span>
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Tổng chi</h3>
            <p className="stat-value">45,000,000đ</p>
            <span className="stat-change negative">+8.2%</span>
          </div>
        </div>

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
            <h3>Lợi nhuận</h3>
            <p className="stat-value">80,000,000đ</p>
            <span className="stat-change positive">+15.3%</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã GD</th>
              <th>Ngày</th>
              <th>Loại</th>
              <th>Mô tả</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <strong>{transaction.id}</strong>
                </td>
                <td>{transaction.date}</td>
                <td>
                  <span
                    className={`badge ${transaction.type === "Thu" ? "badge-green" : "badge-orange"}`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.description}</td>
                <td>
                  <strong
                    style={{
                      color: transaction.type === "Thu" ? "#10b981" : "#f59e0b",
                    }}
                  >
                    {transaction.amount}
                  </strong>
                </td>
                <td>
                  <span
                    className={`badge ${transaction.status === "Hoàn thành" ? "badge-green" : "badge-blue"}`}
                  >
                    {transaction.status}
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

export default FinancePage;

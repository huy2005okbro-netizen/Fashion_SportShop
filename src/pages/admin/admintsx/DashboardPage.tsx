import "../admincss/DashboardPage.css";

function DashboardPage() {
  return (
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
          <h3>Doanh thu</h3>
          <p className="stat-value">125,000,000đ</p>
          <span className="stat-change positive">+12.5%</span>
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
          <span className="stat-change positive">+8.2%</span>
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
          <h3>Khách hàng</h3>
          <p className="stat-value">8,456</p>
          <span className="stat-change positive">+15.3%</span>
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
          <h3>Sản phẩm</h3>
          <p className="stat-value">567</p>
          <span className="stat-change negative">-2.1%</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

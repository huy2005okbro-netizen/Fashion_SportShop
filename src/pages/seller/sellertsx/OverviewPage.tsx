import "../sellercss/SellerOverview.css";

function OverviewPage() {
  return (
    <div className="overview-page">
      <div className="page-header">
        <div className="header-left">
          <h1>Tổng quan</h1>
          <p className="subtitle">Thống kê hoạt động cửa hàng của bạn</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card-dark">
          <div className="stat-header">
            <span className="stat-label">Doanh thu hôm nay</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-value-large">12,450,000đ</div>
          <div className="stat-footer">
            <span className="stat-change positive">+15.3%</span>
            <span className="stat-compare">so với hôm qua</span>
          </div>
        </div>

        <div className="stat-card-dark">
          <div className="stat-header">
            <span className="stat-label">Đơn hàng mới</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>
          </div>
          <div className="stat-value-large">47</div>
          <div className="stat-footer">
            <span className="stat-change positive">+8.2%</span>
            <span className="stat-compare">so với hôm qua</span>
          </div>
        </div>

        <div className="stat-card-dark">
          <div className="stat-header">
            <span className="stat-label">Sản phẩm bán được</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="stat-value-large">156</div>
          <div className="stat-footer">
            <span className="stat-change positive">+12.7%</span>
            <span className="stat-compare">so với hôm qua</span>
          </div>
        </div>

        <div className="stat-card-dark">
          <div className="stat-header">
            <span className="stat-label">Khách hàng mới</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-value-large">23</div>
          <div className="stat-footer">
            <span className="stat-change positive">+5.1%</span>
            <span className="stat-compare">so với hôm qua</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Thao tác nhanh</h2>
        <div className="actions-grid">
          <button className="action-card">
            <div className="action-icon purple">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div className="action-text">
              <h3>Thêm sản phẩm</h3>
              <p>Đăng sản phẩm mới</p>
            </div>
          </button>

          <button className="action-card">
            <div className="action-icon blue">
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
            <div className="action-text">
              <h3>Xử lý đơn hàng</h3>
              <p>12 đơn chờ xử lý</p>
            </div>
          </button>

          <button className="action-card">
            <div className="action-icon green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div className="action-text">
              <h3>Tạo khuyến mãi</h3>
              <p>Tăng doanh số bán hàng</p>
            </div>
          </button>

          <button className="action-card">
            <div className="action-icon orange">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="action-text">
              <h3>Xem báo cáo</h3>
              <p>Phân tích kinh doanh</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

import "../admincss/ReportsPage.css";

function ReportsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Báo cáo & thống kê</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>Tháng này</option>
            <option>Tùy chỉnh</option>
          </select>
          <button className="btn-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: "32px" }}>
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
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Doanh thu trung bình</h3>
            <p className="stat-value">17,857,143đ</p>
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
            <h3>Đơn hàng/ngày</h3>
            <p className="stat-value">176</p>
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
            <h3>Khách hàng mới</h3>
            <p className="stat-value">1,208</p>
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Tỷ lệ hoàn thành</h3>
            <p className="stat-value">94.5%</p>
            <span className="stat-change positive">+2.1%</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h3 style={{ padding: "20px", margin: 0, fontSize: "16px" }}>
          Top sản phẩm bán chạy
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Xếp hạng</th>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Đã bán</th>
              <th>Doanh thu</th>
              <th>Tăng trưởng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>1</strong>
              </td>
              <td>Áo thun nam basic</td>
              <td>Áo</td>
              <td>1,245</td>
              <td>
                <strong>37,245,000đ</strong>
              </td>
              <td>
                <span className="stat-change positive">+25.3%</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>2</strong>
              </td>
              <td>Quần jean nữ</td>
              <td>Quần</td>
              <td>987</td>
              <td>
                <strong>59,113,000đ</strong>
              </td>
              <td>
                <span className="stat-change positive">+18.7%</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>3</strong>
              </td>
              <td>Váy maxi hoa</td>
              <td>Váy</td>
              <td>756</td>
              <td>
                <strong>34,020,000đ</strong>
              </td>
              <td>
                <span className="stat-change positive">+12.4%</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>4</strong>
              </td>
              <td>Áo khoác dạ</td>
              <td>Áo khoác</td>
              <td>543</td>
              <td>
                <strong>65,160,000đ</strong>
              </td>
              <td>
                <span className="stat-change negative">-5.2%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsPage;

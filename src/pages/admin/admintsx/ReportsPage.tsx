import { useState } from "react";
import { useReports, type TimeRange } from "../ReportsContext";
import "../admincss/ReportsPage.css";

type TabType = "overview" | "products" | "orders" | "customers";

function ReportsPage() {
  const {
    getSummaryStats,
    getTopSellingProducts,
    getLowStockProducts,
    getProductsByCategory,
    getOrdersByStatus,
    getCustomersByType,
    getRevenueByTimeRange,
  } = useReports();

  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const stats = getSummaryStats(timeRange);
  const topProducts = getTopSellingProducts(10);
  const lowStockProducts = getLowStockProducts(10);
  const productsByCategory = getProductsByCategory();
  const ordersByStatus = getOrdersByStatus();
  const customersByType = getCustomersByType();
  const revenueData = getRevenueByTimeRange(timeRange);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString("vi-VN");
  };

  const getTimeRangeLabel = (range: TimeRange) => {
    const labels = {
      "7days": "7 ngày qua",
      "30days": "30 ngày qua",
      thisMonth: "Tháng này",
      lastMonth: "Tháng trước",
      thisYear: "Năm nay",
      custom: "Tùy chỉnh",
    };
    return labels[range];
  };

  const handleExport = () => {
    alert("Chức năng xuất báo cáo đang được phát triển!");
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Báo cáo & Thống kê</h1>
          <p className="page-subtitle">Phân tích dữ liệu kinh doanh chi tiết</p>
        </div>
        <div className="header-actions">
          <select
            className="filter-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="thisMonth">Tháng này</option>
            <option value="lastMonth">Tháng trước</option>
            <option value="thisYear">Năm nay</option>
          </select>
          <button className="btn-primary" onClick={handleExport}>
            📥 Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <div className="stat-label">Tổng doanh thu</div>
            <div className="stat-value">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div
              className={`stat-change ${stats.revenueGrowth >= 0 ? "positive" : "negative"}`}
            >
              {stats.revenueGrowth >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.revenueGrowth).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">📦</div>
          <div className="stat-content">
            <div className="stat-label">Tổng đơn hàng</div>
            <div className="stat-value">{formatNumber(stats.totalOrders)}</div>
            <div
              className={`stat-change ${stats.ordersGrowth >= 0 ? "positive" : "negative"}`}
            >
              {stats.ordersGrowth >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.ordersGrowth).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">👥</div>
          <div className="stat-content">
            <div className="stat-label">Khách hàng</div>
            <div className="stat-value">
              {formatNumber(stats.totalCustomers)}
            </div>
            <div
              className={`stat-change ${stats.customersGrowth >= 0 ? "positive" : "negative"}`}
            >
              {stats.customersGrowth >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.customersGrowth).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon avg">📊</div>
          <div className="stat-content">
            <div className="stat-label">Giá trị đơn TB</div>
            <div className="stat-value">
              {formatCurrency(stats.averageOrderValue)}
            </div>
            <div className="stat-change positive">
              Tỷ lệ hoàn thành: {stats.completionRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          📈 Tổng quan
        </button>
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          📦 Sản phẩm
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          🛒 Đơn hàng
        </button>
        <button
          className={activeTab === "customers" ? "active" : ""}
          onClick={() => setActiveTab("customers")}
        >
          👥 Khách hàng
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="tab-content">
          <div className="reports-grid">
            {/* Revenue Chart */}
            <div className="report-card full-width">
              <h3>Doanh thu theo ngày</h3>
              <div className="chart-container">
                <div className="simple-chart">
                  {revenueData.map((item, index) => {
                    const maxRevenue = Math.max(
                      ...revenueData.map((d) => d.revenue),
                    );
                    const height = (item.revenue / maxRevenue) * 100;
                    return (
                      <div key={index} className="chart-bar-wrapper">
                        <div
                          className="chart-bar"
                          style={{ height: `${height}%` }}
                        >
                          <div className="bar-value">
                            {(item.revenue / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div className="chart-label">
                          {new Date(item.date).getDate()}/
                          {new Date(item.date).getMonth() + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="report-card">
              <h3>Top 5 sản phẩm bán chạy</h3>
              <div className="list-items">
                {topProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="list-item">
                    <div className="item-rank">#{index + 1}</div>
                    <div className="item-info">
                      <div className="item-name">{product.name}</div>
                      <div className="item-meta">
                        {product.category} • Đã bán: {product.sold}
                      </div>
                    </div>
                    <div className="item-value">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders by Status */}
            <div className="report-card">
              <h3>Đơn hàng theo trạng thái</h3>
              <div className="list-items">
                {ordersByStatus.map((order) => (
                  <div key={order.status} className="list-item">
                    <div className="item-info">
                      <div className="item-name">{order.status}</div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${order.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="item-stats">
                      <div>{order.count} đơn</div>
                      <div className="item-percentage">{order.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="tab-content">
          <div className="reports-grid">
            {/* Top Selling Products */}
            <div className="report-card full-width">
              <h3>Sản phẩm bán chạy nhất</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Xếp hạng</th>
                      <th>Sản phẩm</th>
                      <th>Danh mục</th>
                      <th>Đã bán</th>
                      <th>Doanh thu</th>
                      <th>Tăng trưởng</th>
                      <th>Tồn kho</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <strong>#{index + 1}</strong>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{formatNumber(product.sold)}</td>
                        <td>
                          <strong>{formatCurrency(product.revenue)}</strong>
                        </td>
                        <td>
                          <span
                            className={`stat-change ${product.growth >= 0 ? "positive" : "negative"}`}
                          >
                            {product.growth >= 0 ? "↑" : "↓"}{" "}
                            {Math.abs(product.growth)}%
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              product.stock <= 10 ? "stock-low" : "stock-ok"
                            }
                          >
                            {product.stock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="report-card">
              <h3>⚠️ Sản phẩm sắp hết hàng</h3>
              <div className="list-items">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="list-item alert">
                    <div className="item-info">
                      <div className="item-name">{product.name}</div>
                      <div className="item-meta">{product.category}</div>
                    </div>
                    <div className="item-value">
                      <span className="stock-badge low">
                        Còn {product.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products by Category */}
            <div className="report-card">
              <h3>Sản phẩm theo danh mục</h3>
              <div className="list-items">
                {productsByCategory.map((cat) => (
                  <div key={cat.category} className="list-item">
                    <div className="item-info">
                      <div className="item-name">{cat.category}</div>
                      <div className="item-meta">{cat.count} sản phẩm</div>
                    </div>
                    <div className="item-value">
                      {formatCurrency(cat.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="tab-content">
          <div className="reports-grid">
            <div className="report-card full-width">
              <h3>Phân tích đơn hàng</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Trạng thái</th>
                      <th>Số lượng</th>
                      <th>Tỷ lệ</th>
                      <th>Doanh thu</th>
                      <th>Biểu đồ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersByStatus.map((order) => (
                      <tr key={order.status}>
                        <td>
                          <strong>{order.status}</strong>
                        </td>
                        <td>{formatNumber(order.count)}</td>
                        <td>{order.percentage}%</td>
                        <td>
                          <strong>{formatCurrency(order.revenue)}</strong>
                        </td>
                        <td>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${order.percentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <div className="tab-content">
          <div className="reports-grid">
            <div className="report-card full-width">
              <h3>Phân tích khách hàng</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Loại khách hàng</th>
                      <th>Số lượng</th>
                      <th>Tỷ lệ</th>
                      <th>Doanh thu</th>
                      <th>Biểu đồ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersByType.map((customer) => (
                      <tr key={customer.type}>
                        <td>
                          <strong>{customer.type}</strong>
                        </td>
                        <td>{formatNumber(customer.count)}</td>
                        <td>{customer.percentage}%</td>
                        <td>
                          <strong>{formatCurrency(customer.revenue)}</strong>
                        </td>
                        <td>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${customer.percentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;

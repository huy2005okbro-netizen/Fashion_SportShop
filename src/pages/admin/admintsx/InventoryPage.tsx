import "../admincss/InventoryPage.css";

function InventoryPage() {
  const inventory = [
    {
      id: 1,
      product: "Áo thun nam basic",
      sku: "AT-001",
      warehouse: "Kho HN",
      stock: 150,
      reserved: 20,
      available: 130,
      status: "Đủ hàng",
    },
    {
      id: 2,
      product: "Quần jean nữ",
      sku: "QJ-002",
      warehouse: "Kho HCM",
      stock: 80,
      reserved: 15,
      available: 65,
      status: "Đủ hàng",
    },
    {
      id: 3,
      product: "Váy maxi hoa",
      sku: "VM-003",
      warehouse: "Kho HN",
      stock: 5,
      reserved: 3,
      available: 2,
      status: "Sắp hết",
    },
    {
      id: 4,
      product: "Áo khoác dạ",
      sku: "AK-004",
      warehouse: "Kho HCM",
      stock: 0,
      reserved: 0,
      available: 0,
      status: "Hết hàng",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý kho hàng</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>Tất cả kho</option>
            <option>Kho HN</option>
            <option>Kho HCM</option>
            <option>Kho ĐN</option>
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nhập kho
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>SKU</th>
              <th>Kho</th>
              <th>Tồn kho</th>
              <th>Đã đặt</th>
              <th>Khả dụng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>
                  <code>{item.sku}</code>
                </td>
                <td>{item.warehouse}</td>
                <td>{item.stock}</td>
                <td>{item.reserved}</td>
                <td>
                  <strong>{item.available}</strong>
                </td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Đủ hàng"
                        ? "badge-green"
                        : item.status === "Sắp hết"
                          ? "badge-orange"
                          : "badge-red"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Nhập kho">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </button>
                    <button className="btn-icon" title="Xuất kho">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
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

export default InventoryPage;

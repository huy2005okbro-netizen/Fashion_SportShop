import "../admincss/ProductsPage.css";

function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Áo thun nam basic",
      category: "Áo",
      price: "299,000đ",
      stock: 150,
      status: "Còn hàng",
    },
    {
      id: 2,
      name: "Quần jean nữ",
      category: "Quần",
      price: "599,000đ",
      stock: 80,
      status: "Còn hàng",
    },
    {
      id: 3,
      name: "Váy maxi hoa",
      category: "Váy",
      price: "450,000đ",
      stock: 5,
      status: "Sắp hết",
    },
    {
      id: 4,
      name: "Áo khoác dạ",
      category: "Áo khoác",
      price: "1,200,000đ",
      stock: 0,
      status: "Hết hàng",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý sản phẩm</h2>
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
          Thêm sản phẩm
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "Còn hàng"
                        ? "badge-green"
                        : product.status === "Sắp hết"
                          ? "badge-orange"
                          : "badge-red"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Sửa">
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
                    </button>
                    <button className="btn-icon" title="Xóa">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

export default ProductsPage;

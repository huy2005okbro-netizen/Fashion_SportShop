import "../admincss/CategoriesPage.css";

function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Áo",
      slug: "ao",
      productCount: 245,
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Quần",
      slug: "quan",
      productCount: 189,
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Váy",
      slug: "vay",
      productCount: 156,
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Áo khoác",
      slug: "ao-khoac",
      productCount: 98,
      status: "Hoạt động",
    },
    {
      id: 5,
      name: "Phụ kiện",
      slug: "phu-kien",
      productCount: 312,
      status: "Hoạt động",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý danh mục</h2>
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
          Thêm danh mục
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Slug</th>
              <th>Số sản phẩm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <code>{category.slug}</code>
                </td>
                <td>{category.productCount}</td>
                <td>
                  <span className="badge badge-green">{category.status}</span>
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

export default CategoriesPage;

import "../admincss/UsersPage.css";

function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      role: "User",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      role: "Staff",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      role: "Admin",
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      role: "User",
      status: "Khóa",
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý người dùng</h2>
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
          Thêm người dùng
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-blue">{user.role}</span>
                </td>
                <td>
                  <span
                    className={`badge ${user.status === "Hoạt động" ? "badge-green" : "badge-red"}`}
                  >
                    {user.status}
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

export default UsersPage;

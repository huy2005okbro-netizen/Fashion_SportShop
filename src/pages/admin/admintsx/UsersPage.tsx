import { useEffect, useState } from "react";
import "../admincss/UsersPage.css";
import {
  addUser,
  deleteUser,
  getAllUsers,
  toggleUserStatus,
  updateUser,
  type AppUser,
  type UserInput,
  type UserRole,
  type UserStatus,
} from "../../../shared/userAccounts";

const initialFormData: UserInput = {
  name: "",
  email: "",
  role: "User",
  status: "Hoạt động",
};

function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>(() => getAllUsers());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState<"Tất cả" | UserRole>("Tất cả");
  const [statusFilter, setStatusFilter] = useState<"Tất cả" | UserStatus>(
    "Tất cả",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<UserInput>(initialFormData);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const syncUsers = () => {
      setUsers(getAllUsers());
    };

    syncUsers();
    window.addEventListener("focus", syncUsers);
    window.addEventListener("storage", syncUsers);

    return () => {
      window.removeEventListener("focus", syncUsers);
      window.removeEventListener("storage", syncUsers);
    };
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingUserId(null);
    setFormError("");
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditUser = (user: AppUser) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleFormChange = <K extends keyof UserInput>(
    field: K,
    value: UserInput[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmitUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Vui lòng nhập đầy đủ tên và email.");
      return;
    }

    try {
      const nextUsers =
        editingUserId === null
          ? addUser(formData)
          : updateUser(editingUserId, formData);

      setUsers(nextUsers);
      handleCloseModal();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Không thể lưu người dùng.",
      );
    }
  };

  const handleDeleteUser = (user: AppUser) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc muốn xóa người dùng ${user.name}?`,
    );

    if (!isConfirmed) {
      return;
    }

    setUsers(deleteUser(user.id));
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(toggleUserStatus(userId));
  };

  const filteredUsers = users.filter((user) => {
    const matchesKeyword =
      user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesRole = roleFilter === "Tất cả" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "Tất cả" || user.status === statusFilter;

    return matchesKeyword && matchesRole && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Quản lý người dùng</h2>
          <p className="page-subtitle">
            Admin có thể thêm, sửa, khóa/mở khóa và xóa người dùng.
          </p>
        </div>
        <button className="btn-primary" onClick={handleOpenCreateModal}>
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

      <div className="toolbar-card">
        <div className="toolbar-grid">
          <label className="field-group search-field">
            <span>Tìm kiếm</span>
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Nhập tên hoặc email"
            />
          </label>

          <label className="field-group">
            <span>Vai trò</span>
            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value as "Tất cả" | UserRole)
              }
            >
              <option value="Tất cả">Tất cả</option>
              <option value="User">User</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

          <label className="field-group">
            <span>Trạng thái</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "Tất cả" | UserStatus)
              }
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Khóa">Khóa</option>
            </select>
          </label>
        </div>

        <div className="summary-row">
          <div className="summary-pill">Tổng người dùng: {users.length}</div>
          <div className="summary-pill">
            Đang hiển thị: {filteredUsers.length}
          </div>
        </div>
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
            {filteredUsers.map((user) => (
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
                    <button
                      className="btn-icon"
                      title="Sửa"
                      onClick={() => handleEditUser(user)}
                    >
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
                    <button
                      className="btn-icon btn-warning"
                      title={user.status === "Hoạt động" ? "Khóa" : "Mở khóa"}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === "Hoạt động" ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        </svg>
                      )}
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      title="Xóa"
                      onClick={() => handleDeleteUser(user)}
                    >
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

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state-cell">
                  Không có người dùng phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {editingUserId === null
                  ? "Thêm người dùng"
                  : "Cập nhật người dùng"}
              </h3>
              <button className="close-button" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form className="user-form" onSubmit={handleSubmitUser}>
              <label className="field-group">
                <span>Họ và tên</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    handleFormChange("name", event.target.value)
                  }
                  placeholder="Nhập họ tên"
                />
              </label>

              <label className="field-group">
                <span>Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleFormChange("email", event.target.value)
                  }
                  placeholder="example@email.com"
                />
              </label>

              <div className="form-row">
                <label className="field-group">
                  <span>Vai trò</span>
                  <select
                    value={formData.role}
                    onChange={(event) =>
                      handleFormChange("role", event.target.value as UserRole)
                    }
                  >
                    <option value="User">User</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>

                <label className="field-group">
                  <span>Trạng thái</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      handleFormChange(
                        "status",
                        event.target.value as UserStatus,
                      )
                    }
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Khóa">Khóa</option>
                  </select>
                </label>
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingUserId === null ? "Thêm người dùng" : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;

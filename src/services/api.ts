// API Configuration
const API_BASE_URL = "http://localhost:5004/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "API request failed");
  }
  return data;
};

// ==================== AUTH API (Placeholder) ====================
export const authAPI = {
  login: async (email: string, password: string, role: string) => {
    // TODO: Implement when backend is ready
    console.log("Login:", { email, password, role });
    return { success: true, message: "Login placeholder" };
  },

  adminLogin: async (
    email: string,
    password: string,
    twoFactorCode: string,
  ) => {
    // TODO: Implement when backend is ready
    console.log("Admin login:", { email, password, twoFactorCode });
    return { success: true, message: "Admin login placeholder" };
  },

  register: async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => {
    // TODO: Implement when backend is ready
    console.log("Register:", { email, password, fullName, phone });
    return { success: true, message: "Register placeholder" };
  },

  logout: async () => {
    // TODO: Implement when backend is ready
    return { success: true, message: "Logout placeholder" };
  },
};

// ==================== CATEGORIES API (Connected to Backend) ====================
export const categoriesAPI = {
  // Get all categories with optional filters
  getAll: async (params?: {
    search?: string;
    status?: string;
    parentId?: number | string | null;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/categories?${queryParams}`);
    return handleResponse(response);
  },

  // Get single category by ID
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return handleResponse(response);
  },

  // Create new category
  create: async (categoryData: {
    name: string;
    code: string;
    icon?: string;
    parentId?: number | null;
    description: string;
    status?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  // Update category
  update: async (
    id: number,
    categoryData: Partial<{
      name: string;
      code: string;
      icon: string;
      parentId: number | null;
      description: string;
      status: string;
    }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  // Delete category
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  // Get child categories
  getChildren: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/children`);
    return handleResponse(response);
  },

  // Get category attributes
  getAttributes: async (categoryId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/attributes`,
    );
    return handleResponse(response);
  },

  // Add attribute to category
  addAttribute: async (categoryId: number, name: string) => {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/attributes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      },
    );
    return handleResponse(response);
  },

  // Delete attribute from category
  deleteAttribute: async (categoryId: number, attributeId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/attributes/${attributeId}`,
      {
        method: "DELETE",
      },
    );
    return handleResponse(response);
  },
};

// ==================== PRODUCTS API (Connected to Backend) ====================
export const productsAPI = {
  // Get all products with optional filters
  getAll: async (params?: {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return handleResponse(response);
  },

  // Get single product by ID
  getById: async (id: string | number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Create new product
  create: async (productData: {
    sku: string;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    status: string;
    image?: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  // Update product
  update: async (
    id: string | number,
    productData: Partial<{
      sku: string;
      name: string;
      category: string;
      brand: string;
      price: number;
      stock: number;
      status: string;
      image: string;
      description: string;
      sizes: string[];
      colors: string[];
    }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  // Delete product
  delete: async (id: string | number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  // Get brands list
  getBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    return handleResponse(response);
  },
};

// ==================== ORDERS API (Connected to Backend) ====================
export const ordersAPI = {
  // Get all orders (Admin)
  getAll: async (params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/orders?${queryParams}`);
    return handleResponse(response);
  },

  // Get customer orders
  getMy: async (customerId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/orders/my?customerId=${customerId}`,
    );
    return handleResponse(response);
  },

  // Get single order by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return handleResponse(response);
  },

  // Create new order
  create: async (orderData: {
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    items: Array<{
      productId: number;
      productName: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    shippingFee: number;
    total: number;
    paymentMethod: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  // Update order status
  updateStatus: async (id: string, status: string, note?: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, note }),
    });
    return handleResponse(response);
  },
};

// ==================== INVENTORY API (Connected to Backend) ====================
export const inventoryAPI = {
  // Get all inventory
  getAll: async (params?: { warehouse?: string; productId?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/inventory?${queryParams}`);
    return handleResponse(response);
  },

  // Get inventory by product ID
  getByProductId: async (productId: number) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${productId}`);
    return handleResponse(response);
  },

  // Create inventory transaction
  createTransaction: async (transactionData: {
    type: "NHAP" | "XUAT" | "KIEM_KE" | "DIEU_CHINH";
    productId: number;
    warehouse: string;
    quantity: number;
    reason: string;
    note?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/inventory/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });
    return handleResponse(response);
  },

  // Get transaction history
  getTransactions: async (params?: {
    productId?: number;
    warehouse?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/inventory/transactions?${queryParams}`,
    );
    return handleResponse(response);
  },
};

// ==================== USERS API (Connected to Backend) ====================
export const usersAPI = {
  // Register new user
  register: async (userData: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Get all users (Admin)
  getAll: async (params?: {
    role?: string;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`);
    return handleResponse(response);
  },

  // Get user by ID
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleResponse(response);
  },

  // Update user
  update: async (
    id: number,
    userData: Partial<{
      email: string;
      password: string;
      fullName: string;
      phone: string;
      role: string;
      status: string;
    }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Delete user
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

// ==================== EXPORT DEFAULT ====================
export default {
  auth: authAPI,
  categories: categoriesAPI,
  products: productsAPI,
  orders: ordersAPI,
  inventory: inventoryAPI,
  users: usersAPI,
};

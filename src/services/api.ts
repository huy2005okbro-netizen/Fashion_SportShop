// API Configuration
const API_BASE_URL = "http://localhost:5000/api";

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

// ==================== PRODUCTS API (Placeholder) ====================
export const productsAPI = {
  getAll: async (params?: any) => {
    // TODO: Implement when backend is ready
    console.log("Get all products:", params);
    return { success: true, data: [], message: "Products placeholder" };
  },

  getById: async (id: string | number) => {
    // TODO: Implement when backend is ready
    console.log("Get product by ID:", id);
    return { success: true, data: null, message: "Product placeholder" };
  },

  create: async (productData: any) => {
    // TODO: Implement when backend is ready
    console.log("Create product:", productData);
    return { success: true, data: productData, message: "Create placeholder" };
  },

  update: async (id: string | number, productData: any) => {
    // TODO: Implement when backend is ready
    console.log("Update product:", id, productData);
    return { success: true, data: productData, message: "Update placeholder" };
  },

  delete: async (id: string | number) => {
    // TODO: Implement when backend is ready
    console.log("Delete product:", id);
    return { success: true, message: "Delete placeholder" };
  },
};

// ==================== ORDERS API (Placeholder) ====================
export const ordersAPI = {
  getAll: async (params?: any) => {
    // TODO: Implement when backend is ready
    console.log("Get all orders:", params);
    return { success: true, data: [], message: "Orders placeholder" };
  },

  getById: async (id: string) => {
    // TODO: Implement when backend is ready
    console.log("Get order by ID:", id);
    return { success: true, data: null, message: "Order placeholder" };
  },

  create: async (orderData: any) => {
    // TODO: Implement when backend is ready
    console.log("Create order:", orderData);
    return {
      success: true,
      data: orderData,
      message: "Create order placeholder",
    };
  },

  cancel: async (id: string, reason: string) => {
    // TODO: Implement when backend is ready
    console.log("Cancel order:", id, reason);
    return { success: true, message: "Cancel placeholder" };
  },

  requestReturn: async (id: string, reason: string, images?: string[]) => {
    // TODO: Implement when backend is ready
    console.log("Request return:", id, reason, images);
    return { success: true, message: "Return placeholder" };
  },

  getAllAdmin: async (params?: any) => {
    // TODO: Implement when backend is ready
    console.log("Get all orders (admin):", params);
    return { success: true, data: [], message: "Admin orders placeholder" };
  },

  updateStatus: async (id: string, status: string, note?: string) => {
    // TODO: Implement when backend is ready
    console.log("Update order status:", id, status, note);
    return { success: true, message: "Update status placeholder" };
  },
};

// ==================== EXPORT DEFAULT ====================
export default {
  auth: authAPI,
  categories: categoriesAPI,
  products: productsAPI,
  orders: ordersAPI,
};

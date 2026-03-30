export type ProductStatus = "Còn hàng" | "Sắp hết" | "Hết hàng";

export type CategoryStatus = "Hoạt động" | "Ẩn";

export type Category = {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
};

export type Product = {
  id: number;
  image: string;
  sku: string;
  name: string;
  category: string;
  sport: string;
  brand: string;
  gender: string;
  size: string;
  color: string;
  material: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  attributes?: Record<string, string>;
};

export const initialCategories: Category[] = [
  { id: 1, name: "Áo thể thao", slug: "ao-the-thao", status: "Hoạt động" },
  { id: 2, name: "Quần thể thao", slug: "quan-the-thao", status: "Hoạt động" },
  { id: 3, name: "Giày thể thao", slug: "giay-the-thao", status: "Hoạt động" },
  {
    id: 4,
    name: "Áo khoác thể thao",
    slug: "ao-khoac-the-thao",
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Phụ kiện thể thao",
    slug: "phu-kien-the-thao",
    status: "Hoạt động",
  },
  { id: 6, name: "Váy thể thao", slug: "vay-the-thao", status: "Hoạt động" },
];

export const initialProducts: Product[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-TSHIRT-001",
    name: "Áo thun tập gym nam Dry-Fit",
    category: "Áo thể thao",
    sport: "Gym",
    brand: "Nike",
    gender: "Nam",
    size: "L",
    color: "Đen",
    material: "Polyester co giãn 4 chiều",
    price: 299000,
    stock: 150,
    status: "Còn hàng",
    description: "Áo thấm hút mồ hôi tốt, phù hợp tập gym và chạy bộ.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-PANTS-002",
    name: "Quần jogger bóng đá nữ",
    category: "Quần thể thao",
    sport: "Bóng đá",
    brand: "Adidas",
    gender: "Nữ",
    size: "M",
    color: "Xanh navy",
    material: "Vải mè thoáng khí",
    price: 599000,
    stock: 80,
    status: "Còn hàng",
    description:
      "Quần co giãn nhẹ, thiết kế linh hoạt khi vận động cường độ cao.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-DRESS-003",
    name: "Váy tennis nữ Pro Active",
    category: "Váy thể thao",
    sport: "Tennis",
    brand: "Yonex",
    gender: "Nữ",
    size: "S",
    color: "Trắng",
    material: "Polyester tái chế",
    price: 450000,
    stock: 5,
    status: "Sắp hết",
    description: "Thiết kế nhẹ, thoáng và có quần bảo hộ bên trong.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-JACKET-004",
    name: "Áo khoác chạy bộ Wind Shield",
    category: "Áo khoác thể thao",
    sport: "Chạy bộ",
    brand: "Puma",
    gender: "Unisex",
    size: "XL",
    color: "Xám",
    material: "Nylon chống gió",
    price: 1200000,
    stock: 0,
    status: "Hết hàng",
    description: "Áo khoác mỏng nhẹ chống gió, thích hợp chạy sáng sớm.",
  },
];

export const sportBrands = [
  "Nike",
  "Adidas",
  "Puma",
  "Yonex",
  "Asics",
  "New Balance",
  "Reebok",
  "Saucony",
  "Brooks",
  "Mizuno",
  "Victor",
  "Wilson",
  "Spalding",
  "Head",
  "Babolat",
  "Fila",
  "Converse",
  "Vans",
  "Under Armour",
  "Skechers",
];

export const sportColors = [
  "Đen",
  "Trắng",
  "Đỏ",
  "Xanh dương",
  "Xanh navy",
  "Xanh lá",
  "Vàng",
  "Cam",
  "Tím",
  "Hồng",
  "Ghi",
  "Xám",
  "Nâu",
  "Beige",
  "Khaki",
  "Đỏ tía",
  "Lục",
  "Đất",
  "Kem",
  "Teal",
];

export const getStatusFromStock = (stock: number): ProductStatus => {
  if (stock <= 0) return "Hết hàng";
  if (stock <= 10) return "Sắp hết";
  return "Còn hàng";
};

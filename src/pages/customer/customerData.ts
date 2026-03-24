export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export type ReviewItem = {
  id: number;
  author: string;
  rating: ReviewRating;
  date: string;
  comment: string;
  verified: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  sport: string;
  gender: string;
  color: string;
  material: string;
  size: string[];
  description: string;
  stock: number;
  sku: string;
};

export const customerProducts: Product[] = [
  {
    id: 1,
    name: "Áo thun tập gym nam Dry-Fit cao cấp",
    price: 299000,
    originalPrice: 399000,
    rating: 4.5,
    reviewCount: 328,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb2b3f?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Áo thể thao",
    brand: "Nike",
    sport: "Gym",
    gender: "Nam",
    color: "Đen",
    material: "Polyester co giãn 4 chiều",
    size: ["S", "M", "L", "XL", "XXL"],
    description:
      "Áo thun tập gym nam Dry-Fit được thiết kế đặc biệt cho những người yêu thích tập luyện. Với công nghệ Dry-Fit tiên tiến, áo có khả năng thấm hút mồ hôi tốt, giúp bạn luôn khô ráo và thoải mái trong những buổi tập luyện cường độ cao.",
    stock: 150,
    sku: "SPT-TSHIRT-001",
  },
  {
    id: 2,
    name: "Quần jogger bóng đá nữ",
    price: 599000,
    originalPrice: 799000,
    rating: 4.3,
    reviewCount: 245,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Quần thể thao",
    brand: "Adidas",
    sport: "Bóng đá",
    gender: "Nữ",
    color: "Xanh navy",
    material: "Vải mè thoáng khí",
    size: ["XS", "S", "M", "L"],
    description:
      "Quần jogger bóng đá nữ cao cấp với chất vải thoáng khí, co giãn tốt, phù hợp cho vận động cường độ cao và mặc hằng ngày.",
    stock: 80,
    sku: "SPT-PANTS-002",
  },
  {
    id: 3,
    name: "Váy tennis nữ Pro Active",
    price: 450000,
    originalPrice: 550000,
    rating: 4.7,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Váy thể thao",
    brand: "Yonex",
    sport: "Tennis",
    gender: "Nữ",
    color: "Trắng",
    material: "Polyester tái chế",
    size: ["XS", "S", "M"],
    description:
      "Váy tennis nữ Pro Active mang lại cảm giác nhẹ, thoải mái, thiết kế tôn dáng và hỗ trợ vận động linh hoạt trên sân.",
    stock: 5,
    sku: "SPT-DRESS-003",
  },
  {
    id: 4,
    name: "Áo khoác chạy bộ WindShield",
    price: 699000,
    originalPrice: 899000,
    rating: 4.6,
    reviewCount: 189,
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=300&q=80",
    images: [
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Áo khoác thể thao",
    brand: "Puma",
    sport: "Chạy bộ",
    gender: "Unisex",
    color: "Xám",
    material: "Nylon chống gió",
    size: ["S", "M", "L", "XL"],
    description:
      "Áo khoác chạy bộ WindShield chống gió, nhẹ và dễ gấp gọn, phù hợp cho các buổi tập ngoài trời.",
    stock: 42,
    sku: "SPT-JACKET-004",
  },
];

export const reviewsByProductId: Record<number, ReviewItem[]> = {
  1: [
    {
      id: 1,
      author: "Nguyễn Văn A",
      rating: 5,
      date: "24/03/2026",
      comment:
        "Áo rất thoải mái, chất liệu tốt, thấm hút mồ hôi rất hiệu quả. Tôi đã mua thêm 2 chiếc nữa rồi!",
      verified: true,
    },
    {
      id: 2,
      author: "Trần Thị B",
      rating: 4,
      date: "22/03/2026",
      comment: "Sản phẩm tốt, giao hàng nhanh. Chỉ mong giá rẻ hơn nữa thôi.",
      verified: true,
    },
    {
      id: 3,
      author: "Lê Văn C",
      rating: 5,
      date: "20/03/2026",
      comment: "Quá tuyệt vời, chất lượng đáng giá tiền. Sẽ mua lại.",
      verified: true,
    },
  ],
  2: [
    {
      id: 4,
      author: "Phạm Mai",
      rating: 4,
      date: "18/03/2026",
      comment: "Quần mặc thoải mái, co giãn tốt, phù hợp khi đá bóng.",
      verified: true,
    },
  ],
  3: [
    {
      id: 5,
      author: "Hoàng Lan",
      rating: 5,
      date: "16/03/2026",
      comment: "Thiết kế đẹp và nhẹ, mặc lên rất tôn dáng.",
      verified: true,
    },
  ],
  4: [
    {
      id: 6,
      author: "Minh Tuấn",
      rating: 5,
      date: "14/03/2026",
      comment: "Áo chống gió tốt, chạy buổi sáng rất hợp.",
      verified: true,
    },
  ],
};

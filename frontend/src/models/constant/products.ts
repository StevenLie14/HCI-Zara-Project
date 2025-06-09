import type {ProductResponse} from "@/models/dto/response/product-response.ts";

export const mockProducts: ProductResponse[] = [
  {
    id: "prod",
    name: "Classic Sunset Blazer",
    description: "A timeless white shirt made from 100% cotton.",
    gender: "Male",
    category: {
      id: "cat-001",
      name: "Men's Clothing",
      createdAt: "2025-06-01T10:00:00Z",
      updatedAt: "2025-06-05T10:00:00Z"
    },
    productVariants: [
      {
        id: "var-001",
        productId: "prod-001",
        size: "M",
        color: "White",
        variantImage: '/picture/sunset-blaze.png',
        price: 29.99,
        stock: 12,
        createdAt: "2025-06-01T10:00:00Z"
      }
    ],
    productImages: [
      {
        id: "img-001",
        productId: "prod-001",
        productImage: '/picture/sunset-blaze.png',
        createdAt: new Date("2025-06-01T10:00:00Z"),
        updatedAt: new Date("2025-06-01T12:00:00Z")
      }
    ],
    createdAt: "2025-06-01T10:00:00Z"
  },
  {
    id: "prod",
    name: "Slim Fit Blue Shirt",
    gender: "Male",
    description: "A sleek slim-fit shirt for office and casual wear.",
    category: {
      id: "cat-002",
      name: "Men's Clothing",
      createdAt: "2025-06-01T11:00:00Z",
      updatedAt: "2025-06-05T11:00:00Z"
    },
    productVariants: [
      {
        id: "var-002",
        productId: "prod-002",
        size: "L",
        color: "Blue",
        variantImage: '/picture/satin-slip.png',
        price: 34.99,
        stock: 8,
        createdAt: "2025-06-01T11:00:00Z"
      }
    ],
    productImages: [
      {
        id: "img-002",
        productId: "prod-002",
        productImage: "https://example.com/images/shirt-blue.jpg",
        createdAt: new Date("2025-06-01T11:00:00Z"),
        updatedAt: new Date("2025-06-01T12:00:00Z")
      }
    ],
    createdAt: "2025-06-01T11:00:00Z"
  },
  {
    id: "prod",
    name: "Zara Best Pants",
    description: "Comfortable cotton shirt with red and black check pattern.",
    gender: "Male",
    category: {
      id: "cat-003",
      name: "Unisex Clothing",
      createdAt: "2025-06-01T12:00:00Z",
      updatedAt: "2025-06-05T12:00:00Z"
    },
    productVariants: [
      {
        id: "var-003",
        productId: "prod-003",
        size: "XL",
        color: "Red",
        variantImage: '/picture/pants.jpg ',
        price: 27.99,
        stock: 6,
        createdAt: "2025-06-01T12:00:00Z"
      }
    ],
    productImages: [
      {
        id: "img-003",
        productId: "prod-003",
        productImage: "https://example.com/images/shirt-checked.jpg",
        createdAt: new Date("2025-06-01T12:00:00Z"),
        updatedAt: new Date("2025-06-01T13:00:00Z")
      }
    ],
    createdAt: "2025-06-01T12:00:00Z"
  },
  {
    id: "prod",
    name: "GG Bag's",
    description: "Ideal for business meetings or formal events.",
    gender: "Female",
    category: {
      id: "cat-001",
      name: "Men's Clothing",
      createdAt: "2025-06-01T13:00:00Z",
      updatedAt: "2025-06-05T13:00:00Z"
    },
    productVariants: [
      {
        id: "var-004",
        productId: "prod-004",
        size: "M",
        color: "Grey",
        variantImage: '/picture/bag.png',
        price: 39.99,
        stock: 4,
        createdAt: "2025-06-01T13:00:00Z"
      }
    ],
    productImages: [
      {
        id: "img-004",
        productId: "prod-004",
        productImage: '/picture/sunset-blaze.png',
        createdAt: new Date("2025-06-01T13:00:00Z"),
        updatedAt: new Date("2025-06-01T14:00:00Z")
      }
    ],
    createdAt: "2025-06-01T13:00:00Z"
  },
  {
    id: "prod",
    name: "Black Linen Shirt",
    description: "Lightweight and breathable linen fabric, perfect for summer.",
    gender:  "Male",
    category: {
      id: "cat-003",
      name: "Unisex Clothing",
      createdAt: "2025-06-01T14:00:00Z",
      updatedAt: "2025-06-05T14:00:00Z"
    },
    productVariants: [
      {
        id: "var-005",
        productId: "prod-005",
        size: "L",
        color: "Black",
        variantImage: "/picture/black-tshirt.jpg",
        price: 32.99,
        stock: 10,
        createdAt: "2025-06-01T14:00:00Z"
      }
    ],
    productImages: [
      {
        id: "img-005",
        productId: "prod-005",
        productImage: "https://example.com/images/shirt-black-front.jpg",
        createdAt: new Date("2025-06-01T14:00:00Z"),
        updatedAt: new Date("2025-06-01T15:00:00Z")
      }
    ],
    createdAt: "2025-06-01T14:00:00Z"
  }
];


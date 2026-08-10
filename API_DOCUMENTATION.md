# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Routes

### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Profile
- **URL:** `/auth/profile`
- **Method:** `GET`
- **Auth Required:** Yes
- **Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## User Routes

### Get All Users
- **URL:** `/users`
- **Method:** `GET`
- **Auth Required:** Yes (Admin)
- **Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get User by ID
- **URL:** `/users/:id`
- **Method:** `GET`
- **Auth Required:** Yes
- **Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update User
- **URL:** `/users/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "ADMIN"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "clx...",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### Delete User
- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Category Routes

### Get All Categories
- **URL:** `/categories`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": "clx...",
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "isDeleted": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Category by ID
- **URL:** `/categories/:id`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "id": "clx...",
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Category
- **URL:** `/categories`
- **Method:** `POST`
- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "clx...",
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Category
- **URL:** `/categories/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "name": "Updated Electronics",
  "description": "Updated description"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "id": "clx...",
    "name": "Updated Electronics",
    "description": "Updated description",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### Delete Category
- **URL:** `/categories/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## Product Routes

### Get All Products
- **URL:** `/products`
- **Method:** `GET`
- **Auth Required:** No
- **Query Parameters:** `categoryId`, `status`, `minPrice`, `maxPrice`
- **Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": "clx...",
      "name": "Laptop",
      "description": "High performance laptop",
      "price": 999.99,
      "stock": 10,
      "status": "ACTIVE",
      "categoryId": "clx...",
      "userId": "clx...",
      "isDeleted": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "category": {
        "id": "clx...",
        "name": "Electronics",
        "description": "Electronic devices and gadgets"
      },
      "user": {
        "id": "clx...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "reviews": [
        {
          "id": "clx...",
          "rating": 5,
          "comment": "Great product!",
          "productId": "clx...",
          "userId": "clx...",
          "isDeleted": false,
          "createdAt": "2024-01-01T00:00:00.000Z",
          "updatedAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

### Get Product by ID
- **URL:** `/products/:id`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "clx...",
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "stock": 10,
    "status": "ACTIVE",
    "categoryId": "clx...",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": "clx...",
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "isDeleted": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "reviews": [
      {
        "id": "clx...",
        "rating": 5,
        "comment": "Great product!",
        "productId": "clx...",
        "userId": "clx...",
        "isDeleted": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "id": "clx...",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
}
```

### Create Product
- **URL:** `/products`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
```json
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 999.99,
  "stock": 10,
  "status": "ACTIVE",
  "categoryId": "clx..."
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "clx...",
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "stock": 10,
    "status": "ACTIVE",
    "categoryId": "clx...",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": "clx...",
      "name": "Electronics",
      "description": "Electronic devices and gadgets"
    },
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Update Product
- **URL:** `/products/:id`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Request Body:**
```json
{
  "name": "Updated Laptop",
  "price": 899.99,
  "stock": 5
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "clx...",
    "name": "Updated Laptop",
    "description": "High performance laptop",
    "price": 899.99,
    "stock": 5,
    "status": "ACTIVE",
    "categoryId": "clx...",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "category": {
      "id": "clx...",
      "name": "Electronics",
      "description": "Electronic devices and gadgets"
    },
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Delete Product
- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Review Routes

### Get Reviews by Product
- **URL:** `/reviews/product/:productId`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": [
    {
      "id": "clx...",
      "rating": 5,
      "comment": "Great product!",
      "productId": "clx...",
      "userId": "clx...",
      "isDeleted": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "clx...",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

### Create Review
- **URL:** `/reviews/product/:productId`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
```json
{
  "rating": 5,
  "comment": "Great product!"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": "clx...",
    "rating": 5,
    "comment": "Great product!",
    "productId": "clx...",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Update Review
- **URL:** `/reviews/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (Review owner or Admin)
- **Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "id": "clx...",
    "rating": 4,
    "comment": "Updated review",
    "productId": "clx...",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Delete Review
- **URL:** `/reviews/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Review owner or Admin)
- **Response:**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## Order Routes

### Get All Orders
- **URL:** `/orders`
- **Method:** `GET`
- **Auth Required:** Yes
- **Query Parameters:** `userId`, `status`
- **Response:**
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "id": "clx...",
      "totalAmount": 1999.98,
      "status": "PENDING",
      "userId": "clx...",
      "isDeleted": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "clx...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [
        {
          "id": "clx...",
          "quantity": 2,
          "price": 999.99,
          "orderId": "clx...",
          "productId": "clx...",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "updatedAt": "2024-01-01T00:00:00.000Z",
          "product": {
            "id": "clx...",
            "name": "Laptop",
            "price": 999.99
          }
        }
      ]
    }
  ]
}
```

### Get Order by ID
- **URL:** `/orders/:id`
- **Method:** `GET`
- **Auth Required:** Yes
- **Response:**
```json
{
  "success": true,
  "message": "Order retrieved successfully",
  "data": {
    "id": "clx...",
    "totalAmount": 1999.98,
    "status": "PENDING",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [
      {
        "id": "clx...",
        "quantity": 2,
        "price": 999.99,
        "orderId": "clx...",
        "productId": "clx...",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "product": {
          "id": "clx...",
          "name": "Laptop",
          "price": 999.99
        }
      }
    ]
  }
}
```

### Create Order
- **URL:** `/orders`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
```json
{
  "items": [
    {
      "productId": "clx...",
      "quantity": 2
    }
  ],
  "status": "PENDING"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "clx...",
    "totalAmount": 1999.98,
    "status": "PENDING",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [
      {
        "id": "clx...",
        "quantity": 2,
        "price": 999.99,
        "orderId": "clx...",
        "productId": "clx...",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "product": {
          "id": "clx...",
          "name": "Laptop",
          "price": 999.99
        }
      }
    ]
  }
}
```

### Update Order Status
- **URL:** `/orders/:id/status`
- **Method:** `PUT`
- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "status": "PROCESSING"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": "clx...",
    "totalAmount": 1999.98,
    "status": "PROCESSING",
    "userId": "clx...",
    "isDeleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "user": {
      "id": "clx...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [
      {
        "id": "clx...",
        "quantity": 2,
        "price": 999.99,
        "orderId": "clx...",
        "productId": "clx...",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "product": {
          "id": "clx...",
          "name": "Laptop",
          "price": 999.99
        }
      }
    ]
  }
}
```

### Delete Order
- **URL:** `/orders/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin)
- **Response:**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

## Response Structure

All API responses follow this consistent structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (only in development)"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

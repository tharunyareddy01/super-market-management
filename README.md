# 🛒 Tharunya Supermarket Management System

A full-stack **Supermarket Management System** developed using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**.

The project follows a **separate client-server architecture**, where the frontend runs on one port and the backend API server runs on another port. MongoDB is used to store and manage supermarket product information.

---

## 📌 Project Overview

**Tharunya Supermarket Management System** is designed to simplify the management of supermarket products.

The system provides functionality to:

* Add new products
* View all products
* Search for products
* Update product details
* Delete products
* Filter products
* Sort products
* Manage product categories
* Store product information in MongoDB

The project uses REST APIs to communicate between the client and backend server.

---

## 🚀 Features

### 📦 Product Management

* Add new products
* List all products
* Search products by Product ID
* Update existing products
* Delete products
* Select products using dropdowns for Update/Delete operations

### 🔎 Search & Filtering

* Search products by ID
* Filter products by category
* Sort products
* View available product information in a structured table

### 🗄️ Database

MongoDB is used as the database.

Each product contains information such as:

* Product ID
* Product Name
* Price
* Quantity
* Category

### 🌐 Separate Client & Backend Servers

The project uses two servers:

| Component         |    Port |
| ----------------- | ------: |
| Client / Frontend |  `3000` |
| Backend / API     |  `4000` |
| MongoDB           | `27017` |

The client communicates with the backend using REST APIs and JavaScript `fetch()`.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* REST API
* CORS

### Database

* MongoDB
* Mongoose

---

## 📁 Project Structure

tharunya-supermarket-management-system/
│
├── public/
│   ├── index.html
│   ├── add.html
│   ├── update.html
│   ├── delete.html
│   ├── list.html
│   ├── search.html
│   ├── style.css
│   └── script.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── products.js
│
├── server.js
├── client.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tharunya-supermarket-management-system.git
```

### 2. Open the Project

```bash
cd tharunya-supermarket-management-system
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🗄️ Start MongoDB

Make sure MongoDB is installed and running on your system.

The application uses:

```text
mongodb://127.0.0.1:27017/supermarket
```

---

## ▶️ Run the Backend Server

Open a terminal and run:

```bash
node server.js
```

The backend server runs on:

```text
http://localhost:4000
```

---

## ▶️ Run the Client Server

Open another terminal and run:

```bash
node client.js
```

The client server runs on:

```text
http://localhost:3000
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

The backend provides REST API endpoints for product management.

### Get All Products

```http
GET /api/products
```

### Get Product by ID

```http
GET /api/products/:id
```

### Add Product

```http
POST /api/products
```

### Update Product

```http
PUT /api/products/:id
```

### Delete Product

```http
DELETE /api/products/:id
```

---

## 🔄 Application Flow

```text
User
  ↓
Client Server
  ↓
JavaScript Fetch API
  ↓
Backend Express Server
  ↓
Mongoose
  ↓
MongoDB
```

For example:

```text
Browser
   ↓
localhost:3000
   ↓
Fetch API
   ↓
localhost:4000
   ↓
Express.js
   ↓
MongoDB
```

---

## 📋 CRUD Operations

| Operation | HTTP Method | Purpose                |
| --------- | ----------- | ---------------------- |
| Create    | POST        | Add a product          |
| Read      | GET         | List/search products   |
| Update    | PUT         | Modify product details |
| Delete    | DELETE      | Remove a product       |

---

## 🎯 Project Objectives

The main objectives of this project are:

1. To develop a basic supermarket management system.
2. To understand client-server architecture.
3. To implement REST APIs using Express.js.
4. To perform CRUD operations with MongoDB.
5. To understand communication between frontend and backend.
6. To practice MongoDB and Mongoose.
7. To create a simple and user-friendly management interface.

---
## 🔮 Future Enhancements

The project can be extended with:

* User authentication
* Admin login
* Customer management
* Billing system
* Sales reports
* Profit and loss calculation
* Stock alerts
* Product image upload
* Dashboard statistics
* Role-based access control
---
## ⭐ Conclusion

**Tharunya Supermarket Management System** demonstrates how a frontend application can communicate with a Node.js/Express backend and MongoDB database using REST APIs.

This project provides practical experience with **CRUD operations, client-server communication, Express.js, MongoDB, Mongoose, and Fetch API**.

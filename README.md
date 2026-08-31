# Tharunya Supermarket Management System

A clean two-server Node.js + Express + MongoDB project.

## Structure

- `server.js` — backend REST API, port **4000**
- `client.js` — frontend/static server + API proxy, port **3000**
- `public/` — all HTML, CSS, JavaScript and images
- `public/app.js` — frontend CRUD logic
- `public/images/tharunya.jpg` — profile image
- MongoDB database: `supermarket`
- Collection: `products`

## Start

### 1. Start MongoDB
Make sure MongoDB is running locally.

### 2. Install dependencies
Run this once inside the project folder:

```bash
npm install
```

### 3. Start backend
Open Terminal 1:

```bash
node server.js
```

Expected:
`MongoDB connected: supermarket`
`Backend server running at http://localhost:4000`

### 4. Start client
Open Terminal 2:

```bash
node client.js
```

Expected:
`Client server running at http://localhost:3000`

### 5. Open the website

Open:

`http://localhost:3000`

## CRUD

- Add Product — POST `/api/products`
- List Products — GET `/api/products`
- Search Product — GET `/api/products/:id`
- Update Product — PUT `/api/products/:id`
- Delete Product — DELETE `/api/products/:id`

The client server forwards `/api/*` requests to the backend server at `http://localhost:4000/api`.

## Dropdowns

- **Update Product:** select an existing product from the dropdown; its details load automatically.
- **Delete Product:** select an existing product from the dropdown before deleting.
- **List All:** category and sorting dropdowns filter/sort the table.
- **Search:** select a product ID from the dropdown.

## Important

The old invalid HTML form methods (`PUT` and `DELETE`) were removed. Browser forms use JavaScript `fetch()` for PUT/DELETE requests.

The old mismatched field names and API paths were also unified:
`productId`, `name`, `price`, `quantity`, `category`.

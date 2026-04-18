# 🛍️ E-Commerce Product Explorer

A clean and responsive frontend application built using React and Tailwind CSS that allows users to browse products, view details, search, filter, and manage a shopping cart.

---

## 🚀 Live Demo

👉 https://ecommerce-explorer.vercel.app/
---

## 📌 Features

### 🔐 Authentication

* Simple login system (no backend)
* Session stored using localStorage
* Protected routes

### 🛒 Product Listing

* Fetches products from API
* Displays product image, title, and price
* Responsive grid layout

### 🔍 Search & Filter

* Search products by title
* Filter by category
* Clear and reset search

### 📄 Product Details

* Detailed view of selected product
* Add to cart functionality

### 🛍️ Cart Management

* Add, remove, update quantity
* Total price calculation
* Cart persists using localStorage
* Cart stored per user

### 📊 Data Handling

* Pagination implemented
* Loading skeleton UI
* Error and empty states handled

---

## 🎨 UI/UX Enhancements

* Fixed navbar with active state
* Responsive design (mobile, tablet, desktop)
* Skeleton loaders for better UX
* Empty state with reset option
* Consistent spacing and layout
* Hover effects and pointer interactions

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* Context API (State Management)
* Axios (API calls)
* React Router DOM

---

## 📡 API Used

* https://fakestoreapi.com/products
* https://fakestoreapi.com/products/categories

---

## 📁 Project Structure

src/
components/
pages/
context/
services/
utils/

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-explorer.git
   cd ecommerce-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the project:

   ```bash
   npm run dev
   ```

---

## 🚀 Deployment

Deployed using Vercel.

---

## 💡 Key Decisions

* Used Context API for simplicity and scalability
* Implemented user-based cart storage using localStorage
* Focused on clean UI rather than overcomplicating with heavy libraries
* Used skeleton loading for improved user experience

---

## 📌 Final Note

This project focuses on clean implementation, usability, and real-world frontend practices rather than overengineering.

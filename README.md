
---

# 📖 Hostel Hungry (Vingo) - MERN Food Delivery 🍔

**Hostel Hungry** is a full-stack food delivery application designed specifically for hostel environments. It features real-time tracking, geolocation-based shop searching, and a dual-interface for both customers and shop owners.

---

## 🚀 Features

### **For Customers**

* **Geolocation Search:** Automatically finds the best shops in your current city using Geoapify.
* **Real-time Tracking:** Track your order status from "Placed" to "Delivered" via Socket.io.
* **Secure Auth:** Sign in with Email/Password or **Google One-Tap (Firebase)**.
* **Menu Browsing:** Browse items by category (Pizza, Burger, etc.) with smooth horizontal scrolling.
* **Password Recovery:** Secure OTP-based password reset powered by **Brevo SMTP**.

### **For Shop Owners**

* **Merchant Dashboard:** Create and manage your shop profile, including address and shop image.
* **Item Management:** Add, edit, or delete food items with real-time updates.
* **Order Management:** Accept orders and update statuses to keep customers informed.

---

## 🛠️ Tech Stack

### **Frontend**

* **React.js** (Vite)
* **Redux Toolkit** (State Management)
* **Tailwind CSS** (Styling)
* **Firebase** (Google Authentication)
* **Socket.io-client** (Real-time updates)

### **Backend**

* **Node.js & Express**
* **MongoDB & Mongoose** (Database)
* **JWT & Cookie-Parser** (Authentication)
* **Nodemailer & Brevo** (Email/OTP Service)
* **Cloudinary** (Image Hosting)
* **Geoapify** (Geocoding API)

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL=your_brevo_sender_email
PASS=your_brevo_smtp_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

```

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/hostel-hungry.git

```


2. **Install Backend Dependencies:**
```bash
cd backend
npm install

```


3. **Install Frontend Dependencies:**
```bash
cd ../frontend
npm install

```


4. **Run the application:**
* Backend: `npm run dev` (from /backend)
* Frontend: `npm run dev` (from /frontend)



---

## 📡 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/send-otp` | Send OTP via Brevo |
| `POST` | `/api/shop/create-edit` | Create or update Shop profile |
| `GET` | `/api/item/get-by-shop/:id` | Fetch menu for a specific shop |

---

## 📜 License

This project is licensed under the MIT License.

---


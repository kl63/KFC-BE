# Kevin's Fried Creations (KFC) Admin Dashboard

Welcome to the **Kevin's Fried Creations (KFC) Admin Dashboard**! This repository powers the administrative interface for KFC, providing a robust platform to manage menu items, orders, and customer data efficiently.

---

## 🚀 Features

- **Payment Integration**: Secure online payments powered by **Stripe**.
- **Database Management**: Seamless data storage and retrieval with **MongoDB**.

---

## 🌐 Live Dashboard


---

## 🛠️ Technologies Used

- **Framework**: React.js with Next.js for server-side rendering and dynamic updates.
- **Styling**: Tailwind CSS for a modern and responsive design.
- **API Integration**: Axios for secure communication with the backend.
- **Payments**: Stripe for secure payment processing.
- **Database**: MongoDB for flexible and scalable data storage.
- **Build Tool**: Webpack for optimized performance and builds.

---

## 📂 Related Repositories

- [KFC Admin Dashboard](https://github.com/kl63/KFC-AD) - Admin dashboard repository for managing menu items, orders, and customers.
- [KFC Frontend](https://github.com/kl63/KFC-FE): Customer-facing interface for KFC.

---

## 🏗️ Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **Yarn**

### Installation

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kl63/KFC-BE.git
   cd KFC-BE
2. Install Dependencies:
   ```bash
   npm install
3. Run the developmnenty server:
   ```bash
   npm run server
4. Open browser and visit:
   ```bash
   http://localhost:10000
   Shoudl display "API Working"

## 4. Set Up MongoDB

1. Open this [link](#) to access MongoDB's website.
2. Sign up on the website if you don’t have an account.
3. **Create a new project**:
   - Click on **New Project**.
4. **Build a database**:
   - Go to the **Database** section.
   - Select **M0** (free tier), choose your region, and click **Create Database**.
5. **Configure your database**:
   - Set up a **username** and **password** (*avoid using the `@` symbol in the password*).
   - Click **Create User**.
6. **Finalize the setup**:
   - Click **Finish & Close**.
   - Whitelist IP **0.0.0.0/0** and click **Add Entry**.
7. **Connect to your database**:
   - Click **Connect**.
   - Select the **Compass** option.
   - Copy the connection string.
8. **Configure the database in the project**:
   - Open `db.js` in your project folder.
   - Replace the placeholder `password` in the connection string with the password you set in step **5**.
   - Save your changes.

## 5. Set Up Stripe

1. Locate the `.env` file in the backend folder.
2. Add your Stripe secret key to the file:
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
3. Save the .env file.

## 📅 Future Integrations and Updates

| **Feature/Update**              | **Description**                                                          | **Status**  |
|----------------------------------|--------------------------------------------------------------------------|-------------|
| **X**     | X                         |X|
| **X**     | X                         |X|
| **X**     | X                         |X|

## <h1>ClicknEat <img src="./src/public/images/ClicknEat.png" width="120" alt="ClicknEat logo" /></h1>

ClicknEat is a restaurant chatbot application that allows customers to place food orders through a chat-style interface. It supports session-based users (no authentication required for customers), order management, order history, and Paystack payment integration. An admin/staff interface is also provided for managing menu items and availability.


---

## 🔗 Live Demo

> https://clickneat.onrender.com/ 




---

## ✨ Features

### Customer (Chatbot)

Chat-style UI for ordering food

Session-based users (stored via browser storage)

Place orders using numeric options

View current order

View order history

Cancel orders

Checkout and pay using Paystack (test mode)

Schedule orders

Automatic return to chatbot after successful payment


### Staff / Admin

Staff authentication using JWT

Create new food items

View all food items

Toggle item availability (available / unavailable)

Admin-only actions (where applicable)



---

## 🧱 Tech Stack

### Backend

Node.js

Express.js

MongoDB + Mongoose

TypeScript

JWT (Staff authentication)

Paystack API (test environment)


### Frontend

HTML

CSS

Vanilla JavaScript (Fetch API)



---

## 📂 Project Structure

```bash
src/
├── app.ts
├── server.ts
├── routes/
│   ├── chat.route.ts
│   ├── payment.route.ts
│   ├── staff.route.ts
│   └── item.route.ts
├── controllers/
├── services/
├── models/
├── middleware/
├── utils/
└── public/
    ├── chat/
    ├── staff/
    ├── item/
    └── images/
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and copy from `example.env`:

```bash
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxx
PAYSTACK_CALLBACK_URL=http://localhost:5000/api/clickneat/payment/callback
```

---

## 🚀 Running the Application Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/clickneat.git
cd clickneat
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

or for production:

```bash
npm run build
npm start
```

### 4️⃣ Open the app

Chatbot: http://localhost:5000/

Staff login: http://localhost:5000/staff

Item management: http://localhost:5000/menu



---

## 💬 Chatbot Flow

When a user lands on the chatbot page, the bot responds with:

```bash
1 → Place an order
99 → Checkout order
98 → View order history
97 → View current order
0 → Cancel order
```

The chatbot responds dynamically based on numeric input and maintains state using a session ID stored in the browser.


---

## 💳 Payment Flow (Paystack)

1. User selects Checkout (99)

2. Backend initializes Paystack transaction

3. Bot returns a clickable payment link

4. User completes payment on Paystack

5. Paystack redirects to callback endpoint

6. Backend verifies payment

7. User is redirected back to chatbot

8. Bot notifies user of successful payment

> Paystack is configured in test mode.


---

## 🧪 Validation & Error Handling

Input validation for menu options

Prevent checkout without active order

Token validation for staff routes

Graceful error messages from bot



---

## 👤 Author

**Abdulazeez Arowolo (Shy Programmer)**
GitHub: [https://github.com/shy-programmer](https://github.com/shy-programmer)

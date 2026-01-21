ClicknEat 🍽️🤖

ClicknEat is a restaurant chatbot application that allows customers to place food orders through a chat-style interface. It supports session-based users (no authentication required for customers), order management, order history, and Paystack payment integration. An admin/staff interface is also provided for managing menu items and availability.


---

🔗 Live Demo

> Add your deployed URL here (Render / Railway / Fly.io / etc.)




---

✨ Features

Customer (Chatbot)

Chat-style UI for ordering food

Session-based users (stored via browser storage)

Place orders using numeric options

View current order

View order history

Cancel orders

Checkout and pay using Paystack (test mode)

Schedule orders

Automatic return to chatbot after successful payment


Staff / Admin

Staff authentication using JWT

Create new food items

View all food items

Toggle item availability (available / unavailable)

Admin-only actions (where applicable)



---

🧱 Tech Stack

Backend

Node.js

Express.js

MongoDB + Mongoose

TypeScript

JWT (Staff authentication)

Paystack API (test environment)


Frontend

HTML

CSS

Vanilla JavaScript (Fetch API)



---

📂 Project Structure

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


---

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxx
PAYSTACK_CALLBACK_URL=http://localhost:5000/api/clickneat/payment/callback


---

🚀 Running the Application Locally

1️⃣ Clone the repository

git clone https://github.com/your-username/clickneat.git
cd clickneat

2️⃣ Install dependencies

npm install

3️⃣ Start the development server

npm run dev

or for production:

npm run build
npm start

4️⃣ Open the app

Chatbot: http://localhost:5000/

Staff login: http://localhost:5000/staff

Item management: http://localhost:5000/menu



---

💬 Chatbot Flow

When a user lands on the chatbot page, the bot responds with:

1 → Place an order
99 → Checkout order
98 → View order history
97 → View current order
0 → Cancel order

The chatbot responds dynamically based on numeric input and maintains state using a session ID stored in the browser.


---

💳 Payment Flow (Paystack)

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

🧪 Validation & Error Handling

Input validation for menu options

Prevent checkout without active order

Token validation for staff routes

Graceful error messages from bot



---

✅ Assignment Requirement Coverage

Requirement	Status

Chat-style interface	✅ Done
Session-based users	✅ Done
Numeric menu options	✅ Done
Place order	✅ Done
Checkout order	✅ Done
Order history	✅ Done
Current order	✅ Done
Cancel order	✅ Done
Payment option	✅ Done
Paystack integration	✅ Done
Redirect after payment	✅ Done
Input validation	✅ Done
Optional scheduling	⚠️ Not implemented (optional)



---

📝 Optional Improvement: Order Scheduling

A future enhancement could allow users to schedule orders by:

Asking for a preferred delivery time

Storing scheduledFor: Date on the order

Processing the order later via a cron job



---

📦 Deployment

You can deploy using:

Render

Railway

Fly.io


Make sure to:

Set environment variables on the platform

Use MongoDB Atlas

Update Paystack callback URL



---

👤 Author

ClicknEat – Restaurant Chatbot Project

Built for backend assessment & portfolio showcase 🚀

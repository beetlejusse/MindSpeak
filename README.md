# MINDSPEAK

**MINDSPEAK** is a full-stack anonymous messaging platform built using **Next.js**. It allows users to share and view anonymous messages in real-time, fostering open and uninhibited communication.

---

## 🚀 Features

- **Anonymous Messaging**: Submit messages without revealing your identity.
- **Message Feed**: A shared, dynamic feed displaying all user-submitted messages.
- **Secure User Authentication**: Features such as sign-up, sign-in, and OTP-based verification.
- **Interactive UI**: A sleek, responsive interface styled with **Tailwind CSS**.
- **Backend APIs**: Robust APIs to handle message storage, moderation, and user interactions.

---

## 📂 Simplified Directory Structure

```plaintext
beetlejusse-MindSpeak/
├── README.md                  # Project documentation
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.mjs            # Next.js configuration
├── .eslintrc.json             # ESLint configuration
├── src/
│   ├── app/                   # Frontend pages and layouts
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Dashboard page
│   │   └── auth/              # Authentication pages (sign-in, sign-up, verify)
│   ├── api/                   # Backend routes
│   │   ├── send-message/      # API to send anonymous messages
│   │   ├── get-message/       # API to fetch messages
│   │   └── auth/              # User authentication APIs
│   ├── components/            # Reusable UI components
│   ├── helpers/               # Utility functions
│   ├── lib/                   # Database and service integrations
│   ├── schemas/               # Validation schemas
│   ├── context/               # Application context (e.g., AuthProvider)
│   └── types/                 # TypeScript type definitions
```

Follow these steps to set up and run MINDSPEAK on your local machine:

Prerequisites
Node.js (v16 or later)
npm or yarn
MongoDB instance for data storage
1. Clone the Repository
```
git clone https://github.com/beetlejusse/MindSpeak.git
cd MindSpeak
```
2. Install Dependencies
```
npm install
```
3. Configure Environment Variables
Create a .env file in the project root and configure the following variables:
```
DATABASE_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_URL=your_cloudinary_url
EMAIL_SERVICE_API=your_email_service_api_key
```
4. Run the Development Server
```
npm run dev
```
The app will be accessible at http://localhost:3000.


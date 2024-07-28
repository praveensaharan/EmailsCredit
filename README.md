
# Credit-Based Email Visibility Web App

## Overview
This web application, built using the MERN stack (MongoDB, Express, React, Node.js), allows users to search for emails. Emails are initially displayed in a blurred state, and users must spend credits to view them. Each user receives 10 free credits upon registration and can purchase more credits through the website. Once an email is unblurred for a user, it remains unblurred for them permanently.

## Key Components

- **Frontend:** React with Ant Design for the user interface.
- **Backend:** Node.js with Express for server-side logic.
- **Database:** MongoDB for storing user data, email data, and transactions.
- **Authentication:** Clerk for user authentication and management.
- **Payments:** Integration with a payment gateway (like Stripe) for purchasing credits.
- **Email Verification:** APIs for email verification.

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "email": "string",
  "password": "string",
  "credits": "number",
  "unblurredEmails": ["ObjectId"],
  "transactions": [
    {
      "type": "string",
      "amount": "number",
      "date": "date"
    }
  ]
}
```

### Email
```json
{
  "_id": "ObjectId",
  "email": "string",
  "blurred": "boolean",
  "metadata": "object"
}
```

### Transaction
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "type": "string",
  "amount": "number",
  "date": "date"
}
```

## Flow and Components

### User Registration and Login
- Users register and log in using Clerk.
- Upon registration, each user is granted 10 free credits.

### Email Search
- Users search for emails through a search bar.
- Emails are displayed in a blurred state.

### View Email
- When a user attempts to view an email, the system checks if they have enough credits.
- If yes, the required credits are deducted and the email is displayed clearly.
- If no, the user is prompted to purchase more credits.
- Once an email is unblurred, it remains unblurred for that user permanently.

### Credit Purchase
- Users can purchase credits through the website using a payment gateway.
- The user's credit balance is updated upon successful purchase.

## Detailed Design

### Backend (Node.js + Express)

#### User Routes
- `POST /register`: Register a new user with Clerk.
- `POST /login`: Authenticate a user with Clerk.
- `GET /user/credits`: Get the current credit balance of the user.
- `GET /user/unblurred-emails`: Get the list of unblurred emails for the user.

#### Email Routes
- `GET /emails`: Search for emails (returns blurred emails).
- `POST /emails/view/:id`: View an email (deduct credits if not previously unblurred and return the email unblurred).

#### Credit Routes
- `POST /credits/purchase`: Handle credit purchase (integrates with payment gateway).
- `GET /credits/history`: Get the transaction history of a user.

### Frontend (React + Ant Design)

#### Pages
- **HomePage:** Search bar for emails, list of blurred emails.
- **LoginPage:** User login and registration.
- **EmailPage:** Display individual email details (blurred/unblurred).
- **CreditsPage:** Display current credits, purchase more credits.

#### Components
- **EmailList:** Displays a list of emails in a blurred state.
- **EmailItem:** Individual email item, showing blur and option to view.
- **CreditPurchase:** Form and integration with payment gateway for purchasing credits.

## Implementation Steps

1. **Set Up MERN Stack**
   - Set up a React frontend with Ant Design.
   - Set up a Node.js backend with Express.
   - Configure MongoDB and connect it to your backend.

2. **Implement Authentication**
   - Integrate Clerk for user authentication and management.
   - Ensure secure registration and login functionality.

3. **Email Search and Display**
   - Create APIs for searching and retrieving emails.
   - Implement frontend components to search and display blurred emails.

4. **Credit Management**
   - Implement credit deduction logic on the backend.
   - Display and manage credit balance on the frontend.

5. **Persistent Unblurring**
   - Implement logic to keep track of unblurred emails for each user.
   - Update the frontend to show emails as unblurred if they have already been paid for.

6. **Payment Integration**
   - Integrate with a payment gateway like Stripe.
   - Handle credit purchase transactions and update user credits.

7. **Testing and Deployment**
   - Thoroughly test all components and workflows.
   - Deploy the application using a platform like Vercel for the frontend and Heroku for the backend.

This system design includes all necessary features to develop a web app with the specified functionalities using the MERN stack. Adjustments and enhancements can be made based on specific requirements and user feedback.
![image](https://github.com/user-attachments/assets/93a7bb13-b988-49ac-9525-a7cfbd668880)

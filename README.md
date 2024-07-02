# ScholarVista.

**Live Site URL:** [Visit ScholarVista](https://my-project-2f30d.web.app/)

## Explore Admin and Moderator Dashboard

- **Admin Email:** monzil246@gmail.com
- **Admin Password:** 123456aA
- **Moderator Email:** mhmonzil@gmail.com
- **Moderator Password:** 123456aA



## Key Features

- **Banner Slider:** Highlights featured scholarships and important announcements on the homepage.
- **User-Friendly Navigation:**  The site features a banner slider, card sections, and clear navigation that helps users find top scholarships and other important sections easily.
- **Secure and Private Access:** Scholarship details are private and only accessible to logged-in users, ensuring the confidentiality of sensitive information.
- **Interactive User Reviews:** The review section allows students to read and write reviews, offering insights and experiences about different scholarships.
- **Efficient Application Process:** The application process is streamlined with a clear path from viewing scholarship details to applying, including a payment gateway for a smooth transaction.
- **Personalized User Dashboard:** Each user has access to a dashboard where they can manage their profile, applications, and reviews, making it easy to track their progress.
- **Administrative Control:** The admin and moderator roles allow for effective management of scholarships, applications, and user reviews, ensuring the platform remains up-to-date and relevant.
- **Flexible Role Management:** The admin can assign roles and manage user permissions, ensuring the right people have the right level of access and control.
- **Application Feedback:** Moderators and admins can provide feedback on applications, which can be valuable for students looking to improve their chances.
- **Integrated Payment System:** The integration with Stripe ensures secure and efficient handling of payments, making the application process seamless.


## Installation Instructions

To get Tourio up and running on your local machine, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- Firebase account
- Stripe account


**Clone the repository:**
    ```sh
    git clone https://github.com/mh-monzil/scholarVista.git
    cd scholarVista
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**
    ```sh
    cd client
    ```

2. **Install frontend dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the `frontend` directory and add your environment variables:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
    REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
    ```

4. **Run the frontend development server:**
    ```sh
    npm start
    ```

### Backend Setup

1. **Install backend dependencies:**
    ```sh
    cd server
    npm install
    ```

2. **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

3. **Run the backend server:**
    ```sh
    npm start
    ```


### Deploy

To deploy, follow the standard practices for deploying Node.js backend and React frontend applications. You can use services like Heroku, Vercel, Netlify, or Firebase Hosting.

---

Now, you should have scholarVista running locally on your machine.


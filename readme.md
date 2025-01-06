# Tutedude Project

Tutedude is a comprehensive web application that allows users to manage friend requests, interact with posts, and perform other social networking activities. This repository includes both the **frontend** (React) and **backend** (Node.js) components, designed to work seamlessly together.

## 🛠️ Features
- **User Authentication & Authorization**
- **Friend Requests Management**
- **Post Creation and Interaction (Like, Comment, Share)**
- **Media Upload Integration via Cloudinary**
- **Email Integration via Gmail (SMTP)**
- **MongoDB-based Database Storage**

---

## 📋 Prerequisites
Before getting started, ensure you have the following installed on your system:

- **[Node.js](https://nodejs.org/)** (version 14 or above)
- **[MongoDB](https://www.mongodb.com/)** (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud storage)
- **[Cloudinary](https://cloudinary.com/)** (for media uploads)
- **A Gmail Account** (for email-related features)

---

## 🚀 Project Setup

### 1️⃣ Clone the Repository
```bash
# Clone the repository
git clone https://github.com/sohit-mishra/TutedudeAssignment

# Navigate into the project directory
cd <project_directory>
```

### 2️⃣ Backend Setup (Node.js)
#### Install Backend Dependencies
```bash
# Navigate to the backend folder
cd Backend

# Install the required dependencies
npm install
```

#### Configure Environment Variables
Create a `.env` file in the root of the backend project directory and add the following variables:
```env
MONGO_URI=<your_mongo_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
SMTP_EMAIL=<your_gmail_email>
SMTP_PASSWORD=<your_gmail_password>
```
- **MONGO_URI**: Obtain this from your MongoDB Atlas account or use a local MongoDB instance.
- **Cloudinary**: Sign up at Cloudinary to get your API credentials.
- **Gmail SMTP**: Enable less secure apps or set up an app-specific password if using two-factor authentication (2FA).

#### Run the Backend Server
```bash
npm start
```
This will start the backend server, typically available at `http://localhost:5000`. You can configure the port in your server settings.

---

### 3️⃣ Frontend Setup (React)
#### Install Frontend Dependencies
```bash
# Navigate to the frontend folder
cd frontend

# Install the required dependencies
npm install
```

#### Run the Frontend Application
```bash
npm start
```
This will start the React app, typically available at `http://localhost:3000`.

---

### 4️⃣ Database Setup (MongoDB)
#### MongoDB Atlas Setup
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and database.
3. Obtain the connection string and add it to your backend `.env` file under `MONGO_URI`.

#### Local MongoDB Setup
1. Install MongoDB on your machine.
2. Start the MongoDB service.
3. Use a local connection string like:
   ```
   mongodb://localhost:27017/tutedude
   ```
   Add this to your backend `.env` file.

---

### 5️⃣ Cloudinary Setup
1. Sign up for a [Cloudinary](https://cloudinary.com/) account.
2. After signing up, you'll have access to:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Add these values to your backend `.env` file.

---

### 6️⃣ Gmail SMTP Setup
1. Ensure you have access to the Gmail account you want to use for email services.
2. If using two-factor authentication (2FA), create an **App Password** for the Tutedude app.
3. Add your Gmail credentials to the `.env` file:
   ```env
   SMTP_EMAIL=<your_gmail_email>
   SMTP_PASSWORD=<your_app_password>
   ```

---

## 📄 Usage
Once the project is set up, open your browser and navigate to `http://localhost:3000` to access the web application.

### ✅ User Registration & Authentication
- Users can sign up for an account using their email and password.
- After registering, users can log in with their credentials.

### 🖼️ Media Uploads
- Users can upload images and other media files to Cloudinary.
- Uploaded media will be associated with the respective posts.

### 🤝 Friend Requests
- Users can send, accept, or reject friend requests.
- The friends list will update accordingly.

---

## 🧰 Technologies Used
| **Component**      | **Technology**           |
|--------------------|--------------------------|
| Frontend           | React, Axios              |
| Backend            | Node.js, Express          |
| Database           | MongoDB                   |
| File Upload        | Cloudinary                |
| Authentication     | JWT (JSON Web Tokens)     |
| Email Service      | Gmail (SMTP)              |
| Styling            | CSS, Material UI          |

---

## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 🤝 Contributing
We welcome contributions! To contribute:
1. **Fork** the repository.
2. **Create a new branch** for your feature or bug fix.
3. **Commit** your changes.
4. **Submit a pull request** for review.

---

### 💡 Tips for Contributors
- Ensure your code follows the project guidelines.
- Write clear and concise commit messages.
- Include documentation where necessary.

---

## 📞 Support
For any issues or questions, feel free to open an issue or contact the project maintainers.


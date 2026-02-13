# Email Spam Detection System

A full-stack application that uses Machine Learning to detect spam emails. This project consists of a React frontend, a Node.js/Express backend, and a Python Flask ML service.

## 🚀 Features

-   **User Authentication**: Secure signup and login for users.
-   **Email Analysis**: Users can input email content to check if it's spam or ham (not spam).
-   **History**: Users can view their past analysis history.
-   **Machine Learning**: Utilizes a trained model (Naive Bayes/SVM/etc.) to classify emails.
-   **Responsive Design**: Built with React and Material UI for a modern look.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Material UI, Axios, React Router.
-   **Backend**: Node.js, Express, MongoDB, JSON Web Token (JWT).
-   **ML Service**: Python, Flask, Scikit-learn, Pandas, NLTK.

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14+)
-   [Python](https://www.python.org/) (v3.8+)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EmailSpam-Decetion-System
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/spam-detection
JWT_SECRET=your_super_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
# OR for development
npm run dev
```

The backend runs on `http://localhost:5000`.

### 3. ML Service Setup

Navigate to the `ml-service` directory:

```bash
cd ../ml-service
```

Create a virtual environment (optional but recommended):

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask application:

```bash
python app.py
```

The ML service runs on `http://localhost:5001`.

### 4. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd ../frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend typically runs on `http://localhost:5173` (check the console output).

## 🏃‍♂️ Running the Application

1.  Make sure MongoDB is running.
2.  Start the **Backend** (Port 5000).
3.  Start the **ML Service** (Port 5001).
4.  Start the **Frontend**.
5.  Open your browser and navigate to the frontend URL to use the application.

## 📂 Project Structure

```
EmailSpam-Decetion-System/
├── backend/          # Node.js Express API
├── frontend/         # React Vite Application
├── ml-service/       # Python Flask ML Model API
└── README.md         # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

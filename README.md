# Pinspiration — Visual Discovery Platform

A **Pinterest-like Visual Discovery Platform** where users can explore, save, and share image pins with dynamic user interactions and JWT-based authentication.

## 🚀 Features
- User Authentication with **JWT & Bcrypt Password Hashing** 🔐
- Explore Page with **Masonry Grid Layout** 🔍
- Save Pins to User Profile 📌
- Pin Details Page with interactive layout
- **Lazy Loading** for optimized image rendering ⚡
- Responsive Design across all devices 📱💻
- RESTful APIs for user management and pin operations

## 🛠️ Tech Stack
| Technology     | Purpose                    |
|---------------|----------------------------|
| Node.js       | Backend API Development    |
| Express.js    | Server Framework          |
| MongoDB      | Database                  |
| JWT          | User Authentication       |
| Bcrypt       | Password Hashing         |
| EJS          | Templating Engine        |
| CSS          | Responsive UI with Flexbox & Grid |

## 📄 Folder Structure
```
├── models/        # Database models
├── routes/       # API Routes
├── views/        # EJS Templates
├── public/       # Static Assets (CSS, Images)
├── controllers/  # Business Logic
└── app.js        # Entry Point
```

## 🔑 How to Run Locally
1. Clone the repository:
```bash
git clone https://github.com/username/pinnify.git
cd pinnify
```

2. Install dependencies:
```bash
npm install
```

3. Set environment variables in `.env` file:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
```

5. Visit **http://localhost:3000** in your browser 🌐

## 🎯 Future Improvements
- Image Uploads with AWS S3
- WebSockets for real-time notifications
- Advanced Pin Search with Filters
- AI-based Image Tagging

## 📌 Contributing
Pull requests are welcome! Feel free to open an issue for any feature suggestions or bug reports.

## 📄 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by [Your Name](https://github.com/username)


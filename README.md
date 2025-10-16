<h1 align="center">🏠 Airbnb Clone</h1>

<p align="center">
  <b>Hotel Listing Website built with Node.js, Express, MongoDB, and EJS</b>  
  <br/>
  🌐 <a href="https://airbnb-5t79.onrender.com" target="_blank">Live Demo</a>
</p>

---

## 🗂️ Project Structure
```
Airbnb/
├── .gitignore
├── .vscode/
│   └── settings.json
├── README.md
├── app.js
├── cloudConfig.js
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/
│   ├── data.js
│   └── index.js
├── middleware.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── package-lock.json
├── package.json
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── schema.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
└── views/
    ├── error.ejs
    ├── includes/
    │   ├── flash.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users/
        ├── login.ejs
        └── signup.ejs
```

---

## ✨ Features

- 🔐 **User Authentication** — Secure signup/login system  
- 🏡 **CRUD Listings** — Create, read, update, and delete listings  
- 💬 **Reviews** — Add and manage reviews for listings  
- 🗺️ **Interactive Map** — View listings on a map  
- ⚡ **Flash Messages** — Instant notifications  
- ☁️ **Cloudinary Integration** — Store and manage images in the cloud  

---

## 💻 Technologies Used

| Category | Tools |
|-----------|-------|
| **Frontend** | HTML, CSS, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Cloud Services** | Cloudinary |
| **Version Control** | Git, GitHub |
| **Styling** | Bootstrap |
| **Map Integration** | Mapbox API |

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/airbnb.git
   cd airbnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_key
   CLOUDINARY_SECRET=your_secret
   MAPBOX_TOKEN=your_mapbox_token
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Visit in your browser**
   ```
   http://localhost:3000
   ```

---

## 📸 Preview

Coming soon... *(add screenshots or GIFs here!)*

---

## 🧰 Skills & Tools Used

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,react,nodejs,express,mongodb,java,python,cpp,mysql,bootstrap,git,github,photoshop,vscode" />
</p>

---

<p align="center">💡 Built with passion by <b>Anwesha Pal</b></p>

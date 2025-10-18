<h1 align="center">🏠 Airbnb Clone</h1>

<p align="center">
  A full-stack <b>Airbnb-style Listing Web App</b> built with <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, and <b>EJS templates</b>.  
Users can browse property listings, view details with maps, leave reviews, and manage their own listings.
  ---

## 🌐 Live Demo
🔗 [Airbnb Clone on Render](https://airbnb-5t79.onrender.com/listings)

---

## 🏗️ Tech Stack

| Layer | Technology Used |
|-------|----------------|
| 💻 Frontend | HTML, CSS, Bootstrap, EJS |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB with Mongoose |
| ☁️ Hosting | Render |
| 🖼️ Image Storage | Cloudinary |
| 🗺️ Map Integration | Mapbox API |
| 🔒 Authentication | Passport.js |

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

## 🧭 Pages & Features

### 🏠 Home Page (`/listings`)
Displays all property listings in a grid layout with images, title, location, and price.  
🖼️ --- 
![Home Page](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/index.png)

---

### 🏡 Listing Details Page (`/listings/:id`)
Shows full details including title, description, owner, price, location, and image.  
Integrated **Mapbox map** displays the property location.  
🖼️ ---  
![Listing1 Details](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/show1.png)

---

### ✏️ New Listing Page (`/listings/new`)
Form for logged-in users to add new listings.  
Fields include title, description, price, location, and image upload.  
🖼️ ---  
![New Listing](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/new.png)

---

### 🖊️ Edit Listing Page (`/listings/:id/edit`)
Allows listing owners to edit their listings with a pre-filled form.  
🖼️ ---  
![Edit Listing](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/edit.png)

---

### 💬 Reviews Section
Logged-in users can leave star ratings and comments for listings.  
All reviews are displayed below the listing details.  
🖼️ ---  
![Reviews Details](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/show2.png)

---

### 🗺️ Map Feature
Interactive Mapbox map shows the exact location of each listing on the detail page.  
🖼️ *Screenshot Placeholder*  
![Listing3 Details](https://github.com/anwesha24-code/Airbnb/blob/3d5ae5a8ba13305c65a8edfdce2337cedac0e0c0/screenshots/show3.png)

---

## ⚡ Key Features

- Browse all listings with images and details  
- Add, edit, and delete your own listings  
- Leave and manage reviews  
- Interactive maps with Mapbox  
- Responsive, mobile-friendly design  
- Cloud-based image uploads via Cloudinary  

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

## 🧰 Skills & Tools Used

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,mongodb,bootstrap,git,github,vscode" />
</p>

---

<p align="center">💡 Built with passion by <b>Anwesha Pal</b></p>

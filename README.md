# Car Rental System API

## Overview
This project is a RESTful API for a Car Rental System, developed using **Node.js**, **Express**, and **MySQL**. It includes user authentication using JWT and supports CRUD operations for managing users and products.

## Features
- **User Authentication** (Signup, Login with JWT)
- **Protected Routes** (Access restricted based on authentication)
- **CRUD Operations** for Users and Products
- **Secure Password Handling** (Using bcrypt for hashing)
- **Environment Variables** for secret keys and database connections

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **JWT Authentication**
- **bcrypt for Password Hashing**
- **Postman for API Testing**

## Installation
### Prerequisites
- Install **Node.js** and **MySQL Server** on your machine.
- Create a MySQL database named `car_rental`.

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/car-rental-api.git
cd car-rental-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root and add:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=car_rental
JWT_SECRET=
JWT_EXPIRES_IN=10m
```

### 4️⃣ Setup Database
Import the SQL file to set up the database:
```sh
mysql -u root -p car_rental < init_db.sql
```

### 5️⃣ Start the Server
```sh
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint   | Description |
|--------|-----------|-------------|
| POST   | `/api/signup` | Register a new user |
| POST   | `/api/login`  | Login and get JWT token |

### Product Management (Requires JWT Token)
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/products` | Add a new product |
| GET    | `/api/products` | Retrieve all products |
| GET    | `/api/products/:id` | Retrieve a product by ID |
| PUT    | `/api/products/:id` | Update product details |
| DELETE | `/api/products/:id` | Delete a product |

## Testing with Postman
1. **Signup a new user** → `POST /api/signup`
2. **Login to get JWT token** → `POST /api/login`
3. **Use JWT Token** → Copy the token and add it in `Authorization` header as `Bearer Token`.
4. **Test Protected Routes**

## Deployment
For deployment, consider using:
- **Railway.app** / **Render** for hosting Node.js API.
- **PlanetScale** / **Amazon RDS** for MySQL database.

## Contributing
Feel free to fork and improve this project. Submit a pull request if you have a feature to add.

## License
MIT License. Free to use and modify.

🚀 **Happy Coding!**


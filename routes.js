const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");
const authMiddleware = require("./middleware");

const router = express.Router();

// User Registration
router.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", 
      [name, username, hashedPassword], 
      (err) => {
        if (err) return res.status(400).json({ message: err.sqlMessage });
        res.status(201).json({ message: "User registered" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
});

// User Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    res.json({ token });
  });
});

// Update User (Requires Authentication)
router.put("/users/:id", authMiddleware, (req, res) => {
  const { name } = req.body;
  db.query("UPDATE users SET name = ? WHERE id = ?", [name, req.params.id], (err) => {
    if (err) return res.status(400).json({ message: err.sqlMessage });
    res.json({ message: "User updated" });
  });
});

// Add Product (Requires JWT)
router.post("/products", authMiddleware, (req, res) => {
  const { pname, description, price, stock } = req.body;
  db.query("INSERT INTO products (pname, description, price, stock) VALUES (?, ?, ?, ?)", 
    [pname, description, price, stock], 
    (err) => {
      if (err) return res.status(400).json({ message: err.sqlMessage });
      res.status(201).json({ message: "Product added" });
    }
  );
});

// Get All Products
router.get("/products", authMiddleware, (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(400).json({ message: err.sqlMessage });
    res.json(results);
  });
});

// Get Product by ID
router.get("/products/:pid", authMiddleware, (req, res) => {
  db.query("SELECT * FROM products WHERE pid = ?", [req.params.pid], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// Update Product
router.put("/products/:pid", authMiddleware, (req, res) => {
  const { pname, description, price, stock } = req.body;
  db.query("UPDATE products SET pname = ?, description = ?, price = ?, stock = ? WHERE pid = ?", 
    [pname, description, price, stock, req.params.pid], 
    (err) => {
      if (err) return res.status(400).json({ message: err.sqlMessage });
      res.json({ message: "Product updated" });
    }
  );
});

// Delete Product
router.delete("/products/:pid", authMiddleware, (req, res) => {
  db.query("DELETE FROM products WHERE pid = ?", [req.params.pid], (err) => {
    if (err) return res.status(400).json({ message: err.sqlMessage });
    res.json({ message: "Product deleted" });
  });
});

module.exports = router;

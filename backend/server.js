const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// PRODUCTS (dummy)
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 30000 }
  ]);
});

// CHATBOT (SAFE SIMPLE)
app.post('/chat', (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();

  let matched = productsCache.filter(p =>
    p.name.toLowerCase().includes(msg) ||
    (p.category && p.category.toLowerCase().includes(msg)) ||
    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(msg)))
  );

  if (msg.includes("laptop")) {
    matched = productsCache.filter(p =>
      p.category?.toLowerCase().includes("laptop")
    );
  }

  if (msg.includes("phone")) {
    matched = productsCache.filter(p =>
      p.category?.toLowerCase().includes("phone")
    );
  }

  if (matched.length > 0) {
    const top = matched.slice(0, 3);

    let reply = "🤖 Recommended products:\n\n";

    top.forEach((p, i) => {
      reply += `${i + 1}. ${p.name}\n₹${p.price}\nBuy: ${p.buyLink}\n\n`;
    });

    return res.json({ reply });
  }

  res.json({
    reply: "Tell me a need like gaming laptop, student laptop, phone under budget, headphones, etc."
  });
});
// START SERVER (MOST IMPORTANT PART)
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
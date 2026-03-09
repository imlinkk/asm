const express = require("express");
const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

// ========================
// Middleware
// ========================

// Đọc body JSON
app.use(express.json());

// Log mỗi request
app.use(logger);

// ========================
// Routes
// ========================

app.use(taskRoutes);

// ========================
// Khởi động server
// ========================

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

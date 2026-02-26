const express = require("express");
const app = express();
const PORT = 3000;

// ========================
// Middleware
// ========================

// Đọc body JSON
app.use(express.json());

// Middleware log mỗi request: method + url + thời gian
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// ========================
// Dữ liệu tạm (in-memory)
// ========================

let tasks = [];
let nextId = 1;

// ========================
// Helper: validate title
// ========================

function validateTitle(title) {
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return { valid: false, message: "Title là bắt buộc và không được rỗng" };
  }
  const trimmed = title.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return {
      valid: false,
      message: "Title phải có độ dài từ 3 đến 100 ký tự",
    };
  }
  return { valid: true };
}

// ========================
// Routes
// ========================

// GET /api/tasks — Trả về toàn bộ danh sách công việc
// Hỗ trợ query: ?completed=true|false
// Sắp xếp theo createdAt giảm dần (mới nhất lên đầu)
app.get("/api/tasks", (req, res) => {
  let result = [...tasks];

  // Lọc theo completed nếu có query string
  if (req.query.completed !== undefined) {
    const completedFilter = req.query.completed === "true";
    result = result.filter((t) => t.completed === completedFilter);
  }

  // Sắp xếp theo createdAt giảm dần
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.status(200).json(result);
});

// GET /api/tasks/:id — Trả về chi tiết một công việc theo id
app.get("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Không tìm thấy công việc" });
  }

  res.status(200).json(task);
});

// POST /api/tasks — Tạo công việc mới
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  const validation = validateTitle(title);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id — Cập nhật toàn bộ thông tin công việc
app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Không tìm thấy công việc" });
  }

  const { title, completed } = req.body;

  // Validate title
  const validation = validateTitle(title);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  // Validate completed
  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "completed phải là giá trị boolean" });
  }

  task.title = title.trim();
  task.completed = completed;

  res.status(200).json(task);
});

// PATCH /api/tasks/:id — Cập nhật một phần thông tin
app.patch("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Không tìm thấy công việc" });
  }

  const { title, completed } = req.body;

  // Nếu có title thì validate
  if (title !== undefined) {
    const validation = validateTitle(title);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.message });
    }
    task.title = title.trim();
  }

  // Nếu có completed thì validate
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "completed phải là giá trị boolean" });
    }
    task.completed = completed;
  }

  res.status(200).json(task);
});

// DELETE /api/tasks/:id — Xóa công việc theo id
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Không tìm thấy công việc" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// ========================
// Khởi động server
// ========================

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

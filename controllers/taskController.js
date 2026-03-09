const taskModel = require("../models/taskModel");

// GET / — Trang chủ
exports.home = (req, res) => {
    res.status(200).json({
        message: "Task API đang chạy!",
        endpoints: {
            "GET /api/tasks": "Lấy danh sách công việc",
            "GET /api/tasks/:id": "Lấy chi tiết công việc",
            "POST /api/tasks": "Tạo công việc mới",
            "PUT /api/tasks/:id": "Cập nhật toàn bộ công việc",
            "PATCH /api/tasks/:id": "Cập nhật một phần công việc",
            "DELETE /api/tasks/:id": "Xóa công việc",
        },
    });
};

// GET /api/tasks — Trả về toàn bộ danh sách công việc
exports.getAllTasks = (req, res) => {
    const result = taskModel.getAllTasks(req.query.completed);
    res.status(200).json(result);
};

// GET /api/tasks/:id — Trả về chi tiết một công việc
exports.getTaskById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Không tìm thấy công việc" });
    }

    res.status(200).json(task);
};

// POST /api/tasks — Tạo công việc mới
exports.createTask = (req, res) => {
    const { title } = req.body;

    const validation = taskModel.validateTitle(title);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    const newTask = taskModel.createTask(title);
    res.status(201).json(newTask);
};

// PUT /api/tasks/:id — Cập nhật toàn bộ thông tin
exports.updateTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Không tìm thấy công việc" });
    }

    const { title, completed } = req.body;

    const validation = taskModel.validateTitle(title);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    if (typeof completed !== "boolean") {
        return res
            .status(400)
            .json({ error: "completed phải là giá trị boolean" });
    }

    task.title = title.trim();
    task.completed = completed;

    res.status(200).json(task);
};

// PATCH /api/tasks/:id — Cập nhật một phần thông tin
exports.patchTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Không tìm thấy công việc" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        const validation = taskModel.validateTitle(title);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }
        task.title = title.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res
                .status(400)
                .json({ error: "completed phải là giá trị boolean" });
        }
        task.completed = completed;
    }

    res.status(200).json(task);
};

// DELETE /api/tasks/:id — Xóa công việc
exports.deleteTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = taskModel.deleteTask(id);

    if (!deleted) {
        return res.status(404).json({ error: "Không tìm thấy công việc" });
    }

    res.status(204).send();
};

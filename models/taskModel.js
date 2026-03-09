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
// CRUD Operations
// ========================

function getAllTasks(completedFilter) {
    let result = [...tasks];

    if (completedFilter !== undefined) {
        const isCompleted = completedFilter === "true";
        result = result.filter((t) => t.completed === isCompleted);
    }

    // Sắp xếp theo createdAt giảm dần
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
}

function getTaskById(id) {
    return tasks.find((t) => t.id === id);
}

function createTask(title) {
    const newTask = {
        id: nextId++,
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
}

function deleteTask(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}

module.exports = {
    validateTitle,
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
};

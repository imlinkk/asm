# 🚀 Task Management REST API

REST API đơn giản dùng để quản lý danh sách công việc (tasks), xây dựng bằng **Node.js** và **Express**.

> 📌 Dữ liệu được lưu tạm thời trong bộ nhớ (JavaScript array) — không sử dụng database.

## 📌 Tính năng

- ✅ CRUD đầy đủ (Create, Read, Update, Delete)
- 🔎 Lọc task theo trạng thái hoàn thành (`completed`)
- 🛡 Validate title (3–100 ký tự)
- 📅 Sắp xếp task theo thời gian tạo (mới nhất trước)
- 🌐 Chuẩn RESTful API
- 📁 Cấu trúc theo mô hình **MVC**

## 🛠 Công nghệ sử dụng

- Node.js
- Express 5.x

## 📁 Cấu trúc thư mục (MVC)

```
ASM/
├── index.js                    # Entry point – khởi tạo server
├── models/
│   └── taskModel.js            # Model – dữ liệu, validate, CRUD
├── controllers/
│   └── taskController.js       # Controller – xử lý request/response
├── routes/
│   └── taskRoutes.js           # Routes – định nghĩa các endpoint
├── middleware/
│   └── logger.js               # Middleware – log request
├── package.json
└── README.md
```

## ⚙️ Cài đặt & Chạy dự án

```bash
# 1. Clone repository
git clone https://github.com/imlinkk/asm.git

# 2. Di chuyển vào thư mục dự án
cd asm

# 3. Cài đặt dependencies
npm install

# 4. Chạy server
npm start
```

📍 Server mặc định chạy tại: `http://localhost:3000`

## 📂 Cấu trúc dữ liệu

Mỗi task có định dạng:

```json
{
  "id": 1,
  "title": "Học Node.js cơ bản",
  "completed": false,
  "createdAt": "2025-02-25T10:15:00.000Z"
}
```

## 📌 API Endpoints

Base URL: `http://localhost:3000/api/tasks`

| Method   | Endpoint           | Mô tả                        | Status Code      |
|----------|--------------------|-------------------------------|------------------|
| `GET`    | `/api/tasks`       | Lấy toàn bộ danh sách        | 200 OK           |
| `GET`    | `/api/tasks/:id`   | Lấy chi tiết một công việc   | 200 / 404        |
| `POST`   | `/api/tasks`       | Tạo công việc mới             | 201 / 400        |
| `PUT`    | `/api/tasks/:id`   | Cập nhật toàn bộ thông tin   | 200 / 400 / 404  |
| `PATCH`  | `/api/tasks/:id`   | Cập nhật một phần thông tin  | 200 / 400 / 404  |
| `DELETE` | `/api/tasks/:id`   | Xóa công việc                 | 204 / 404        |

### 1️⃣ GET /api/tasks

Lấy toàn bộ danh sách công việc (sắp xếp mới nhất trước).

**Lọc theo trạng thái:**

```
GET /api/tasks?completed=true
GET /api/tasks?completed=false
```

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "Học Node.js cơ bản",
    "completed": false,
    "createdAt": "2025-02-25T10:15:00.000Z"
  }
]
```

### 2️⃣ GET /api/tasks/:id

Lấy chi tiết một công việc.

- Nếu không tìm thấy → `404 Not Found`

```json
{
  "error": "Không tìm thấy công việc"
}
```

### 3️⃣ POST /api/tasks

Tạo công việc mới.

**Request Body:**

```json
{
  "title": "Học Node.js cơ bản"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "title": "Học Node.js cơ bản",
  "completed": false,
  "createdAt": "2025-02-25T10:15:00.000Z"
}
```

**Validate lỗi** → `400 Bad Request`:
- Thiếu title hoặc title rỗng
- Độ dài không từ 3–100 ký tự

### 4️⃣ PUT /api/tasks/:id

Cập nhật toàn bộ thông tin công việc.

**Request Body:**

```json
{
  "title": "Học Node.js nâng cao",
  "completed": true
}
```

**Response:** `200 OK` hoặc `404 Not Found`

### 5️⃣ PATCH /api/tasks/:id

Cập nhật một phần thông tin (title hoặc completed hoặc cả hai).

**Request Body:**

```json
{
  "completed": true
}
```

**Response:** `200 OK` hoặc `404 Not Found`

### 6️⃣ DELETE /api/tasks/:id

Xóa công việc theo id.

**Response:** `204 No Content` hoặc `404 Not Found`

## 🧪 Test API

Có thể sử dụng:

- **Postman**
- **Thunder Client** (VS Code extension)
- **curl**

### Ví dụ dùng curl

```bash
# Tạo task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Học Node.js"}'

# Lấy danh sách
curl http://localhost:3000/api/tasks

# Lọc task hoàn thành
curl http://localhost:3000/api/tasks?completed=true

# Cập nhật task
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Học nâng cao", "completed": true}'

# Xóa task
curl -X DELETE http://localhost:3000/api/tasks/1
```

## 📌 Ghi chú

- Dữ liệu chỉ lưu trong bộ nhớ — khi restart server, dữ liệu sẽ bị mất.
- Phù hợp cho mục đích học tập và thực hành REST API.

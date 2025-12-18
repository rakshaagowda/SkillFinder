# 🎓 SkillFinder — Learning Platform Discovery & Enrollment System

<p align="center">
  <img src="https://img.shields.io/badge/Type-Full--Stack%20Web%20Application-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-SQLite%20%7C%20Prisma-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Auth-JWT%20%7C%20Bcrypt-darkred?style=for-the-badge"/>
</p>

<p align="center">
  <b>A unified platform to discover, explore, and enroll in online & offline learning providers</b><br/>
  <i>DBMS Concepts • Modern Web Stack • Secure Authentication</i>
</p>

---

## 📌 Project Overview

**SkillFinder** is a full-stack web application that connects users with **online and offline learning platforms**.  
It enables users to:

- Browse learning providers
- View platform details (ratings, categories, location, languages)
- Securely enroll in courses
- Manage enrollments through a normalized relational database

The project strongly emphasizes **Database Management System (DBMS) concepts**, implemented using **SQLite** and **Prisma ORM**.

---

## ✨ Key Features

- 🔍 Browse online & offline learning platforms
- ⭐ View ratings, categories, languages, and locations
- 🧾 Secure enrollment system
- 🔐 JWT-based authentication
- 🧠 Well-normalized relational database (3NF)
- 🗂️ Prisma ORM with schema-first design

---

## ⚙️ Tech Stack

| Layer | Technologies |
|------|-------------|
| 🖥️ **Frontend** | [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev) <br/> [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev) <br/> [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com) <br/> [![Lucide](https://img.shields.io/badge/Lucide%20React-000000?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev) <br/> [![React Router](https://img.shields.io/badge/React%20Router-D0021B?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com) |
| ⚙️ **Backend** | [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org) <br/> [![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com) <br/> [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io) |
| 🔐 **Authentication** | [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io) <br/> [![Bcrypt](https://img.shields.io/badge/Bcrypt-003A8F?style=for-the-badge)](https://www.npmjs.com/package/bcrypt) |
| 🗄️ **Database** | [![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html) |
| 🧠 **ORM** | [![Prisma ORM](https://img.shields.io/badge/Prisma%20ORM-Schema--First%20%7C%20Type--Safe-4B32C3?style=for-the-badge)](https://www.prisma.io/docs) |

```mermaid
  flowchart LR
    A[User Interface<br/>React App]
    B[Backend API<br/>Node.js + Express]
    C[ORM Layer<br/>Prisma]
    D[Database<br/>SQLite]

    A -->|Request| B
    B -->|Query| C
    C -->|Read / Write| D
    D -->|Result| C
    C -->|Response| B
    B -->|JSON Data| A


---

## 6️⃣ ER Diagram (Conceptual Data Model)

```md
## 📊 Conceptual Data Model (ER Diagram)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : enrolls
    PLATFORM ||--o{ ENROLLMENT : contains

    USER {
        string id PK
        string username UNIQUE
        string password
        datetime createdAt
    }

    PLATFORM {
        string id PK
        string name
        string type
        string categories
        string languages
        float rating
        string topCourse
        datetime createdAt
    }

    ENROLLMENT {
        string id PK
        string userId FK
        string platformId FK
        datetime enrolledAt
    }
---
```md
## 🗂️ Database Schema Overview

### User
- `id` (Primary Key, UUID)
- `username` (Unique)
- `password` (Hashed)
- `createdAt`
- `enrollments`

### Platform
- `id` (Primary Key, UUID)
- `name`
- `type` (online/offline)
- `categories` (JSON string)
- `languages`
- `rating`
- `topCourse` (Nullable)
- `createdAt`
- `enrollments`

### Enrollment (Junction Table)
- `id` (Primary Key, UUID)
- `userId` (Foreign Key → User)
- `platformId` (Foreign Key → Platform)
- `enrolledAt`
- Composite unique constraint on (`userId`, `platformId`)

## 🧪 DBMS Concepts Implemented

### Entity Integrity
- Every table has a primary key.
- UUIDs ensure global uniqueness.

### Referential Integrity
- Foreign keys enforce valid relationships.
- Enrollment records cannot exist without valid users and platforms.

### Domain Integrity
- Strong typing using String, Float, and DateTime.
- Nullable fields explicitly handled.

### Normalization
- Database design follows Third Normal Form (3NF).
- Many-to-many relationship resolved using a junction table.

### Indexing
- Automatic indexes on primary and unique keys.
- Improves query performance.


## 🔄 CRUD & Database Operations (DML)

- **Create**: User registration, platform enrollment
- **Read**: Dashboard data, platform listings
- **Update**: Ratings and profile updates
- **Delete**: Enrollment removal

Prisma abstracts SQL JOINs using the `include` API and supports aggregation using `_count`.

## 🔐 Security Considerations

- SQL Injection prevention via Prisma parameterized queries
- Password hashing using Bcrypt
- JWT-based stateless authentication
- UUIDs prevent predictable identifiers
## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Git

### Installation & Run

```bash
# Backend
cd server
npm install
npx prisma migrate dev
npm start

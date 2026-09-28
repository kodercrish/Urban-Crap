# Urban Crap

**A home-services booking platform for Bangalore that sends each job to service agents within range, using a C++ shortest-path engine.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.5-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![C++](https://img.shields.io/badge/C++-JNI-00599C?logo=cplusplus&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

## Overview

Urban Crap is a full-stack clone of an urban home-services marketplace. Customers browse services, fill a cart and check out with their locality. The Spring Boot backend then finds agents who have the right skill and asks a native C++ library (called through JNI) for the shortest road distance between the customer's area and each agent. That distance comes from Dijkstra's algorithm run over a graph of 27 Bangalore localities. The order goes to every agent whose service radius covers the distance, and the first agent to accept it gets the job.

The app has three roles: **Customer**, **Service Agent** and **Admin**.

## ✨ Features

- **Customers:** sign up and sign in, browse 6 service categories (Home Appliance & Electrical, Cleaning & Pest Control, Home Repairs & Installation, Painting & Decor, Salon for Men & Women, Gardening & Landscaping), add or remove cart items, check out by picking a locality, view order history and a profile.
- **Location-aware matching:** agents are filtered by skill (Technician, Electrician, Carpenter, Cleaner, Pest Controller, Gardener, Men's/Women's Styler), then by shortest-path distance compared with each agent's service range.
- **Service agents:** a dashboard of incoming requests that refreshes every 5 seconds, with accept/reject actions, a list of accepted orders and a profile page.
- **Admins:** sign in with email, password and access code, add service agents (skills, range, location), and search the list of agents.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router 6, Vite 5, Tailwind CSS 3, react-icons, react-toastify, ESLint 9 |
| Backend | Java 17, Spring Boot 3.3.5 (Web, Data MongoDB, DevTools), Maven Wrapper (Maven 3.9.9) |
| Native module | C++ via JNI: Dijkstra shortest path over a locality graph (`libRangeChecker`) |
| Database | MongoDB (collections: `customers`, `service_agents`, `admins`, `orders`) |

## Project Structure

```
Urban-Crap/
├── frontend/                 # React + Vite client (port 5173)
│   └── src/
│       ├── authentication/   # Role selection landing page
│       ├── customer/         # Customer pages: home, services, cart, orders, profile
│       ├── serviceAgent/     # Agent dashboard, profile, about
│       ├── admin/            # Admin dashboard (add/search agents)
│       └── assets/           # Logo and service images
└── UC-Backend/               # Spring Boot REST API (port 8080)
    └── src/main/
        ├── java/com/example/UC_Backend/
        │   ├── Helper.java           # All REST endpoints (/api/*)
        │   ├── Users/, Order.java    # MongoDB documents
        │   ├── Database/             # Spring Data repositories
        │   ├── HelperFunctionIO/     # Request/response DTOs
        │   └── Extra/                # JNI bridge + C++ sources (Graph, Dijkstra)
        └── resources/
            ├── application.properties
            └── lib/libRangeChecker.dylib   # Prebuilt native lib (macOS arm64)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- JDK 17+ (Maven is not needed because the repo includes `mvnw`)
- A MongoDB instance (local or MongoDB Atlas)
- GCC/G++ **only if you are not on an Apple Silicon Mac**, to rebuild the native library

### 1. Clone

```bash
git clone https://github.com/kodercrish/Urban-Crap.git
cd Urban-Crap
```

### 2. Backend

The backend reads its settings from `UC-Backend/src/main/resources/application.properties`. Spring Boot also accepts environment variables in place of these keys, so you don't have to put credentials in the file:

| Property | Env variable | Example |
|---|---|---|
| `spring.data.mongodb.uri` | `SPRING_DATA_MONGODB_URI` | `mongodb://localhost:27017/Urban_Crap` or `mongodb+srv://<user>:<password>@<cluster>/Urban_Crap` |
| `server.port` | `SERVER_PORT` | `8080` (the frontend expects this port) |

**Native library (skip on Apple Silicon macOS).** The committed `libRangeChecker.dylib` is built for macOS arm64 only. On any other platform, rebuild it from the C++ sources. The Java loader looks for this exact filename, so keep the `.dylib` name even on Linux:

```bash
cd UC-Backend
g++ -std=c++17 -shared -fPIC \
  -I"$JAVA_HOME/include" -I"$JAVA_HOME/include/linux" \
  src/main/java/com/example/UC_Backend/Extra/RangeChecker.cpp \
  -o src/main/resources/lib/libRangeChecker.dylib
cd ..
```

(On an Intel Mac, use Homebrew GCC and `-I"$JAVA_HOME/include/darwin"`.)

**Run the API:**

```bash
cd UC-Backend
export SPRING_DATA_MONGODB_URI="mongodb://localhost:27017/Urban_Crap"
sh mvnw spring-boot:run         # Windows: mvnw.cmd spring-boot:run
```

The API is served at `http://localhost:8080/api`.

**Create an admin.** The API has no admin sign-up endpoint, so insert the first admin into MongoDB by hand. Then use the admin dashboard to add service agents.

```js
// mongosh, database Urban_Crap
db.admins.insertOne({ adminId: 10001, name: "Admin", email: "admin@example.com", password: "changeme", accesscode: "1234" })
```

### 3. Frontend

In a second terminal, from the repo root:

```bash
cd frontend
npm install
npm run dev        # Vite on http://localhost:5173 (also bound to 0.0.0.0)
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

Open **http://localhost:5173** and choose Customer, Service Agent or Admin.

> The frontend calls `http://localhost:8080/api` directly, and the backend's CORS setting only allows `http://localhost:5173`. If you change either port, update both.

## API Overview

All routes are prefixed with `/api`. Every route uses `POST` with a JSON body, except the one marked `GET`.

| Area | Endpoints |
|---|---|
| Auth | `/addcustomer`, `/logincustomer`, `/loginsa`, `/loginadmin` |
| Profiles | `/getcustomerdetails`, `/getagentdetails` |
| Cart & orders | `/addToCart`, `/removeFromCart`, `GET /getCartItems/{customerId}`, `/checkout`, `/order-history` |
| Service agent | `/service-agent/orders`, `/service-agent/acceptOrder`, `/service-agent/rejectOrder` |
| Admin | `/addsa`, `/getAllServiceAgents` |

## Author

Built by **Krish Patel** ([@kodercrish](https://github.com/kodercrish)).

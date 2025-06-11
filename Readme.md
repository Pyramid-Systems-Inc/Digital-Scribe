# The Digital Scribe: An Interactive Hieroglyph Composer

An elegant, interactive web application for translating modern text into a shareable ancient Egyptian hieroglyphic cartouche.

**[Live Demo](https://your-live-demo-url.com)** &nbsp;&nbsp;&nbsp; **[Project Roadmap](#-project-roadmap)**

 <!--- Placeholder: Replace with an actual screenshot when ready -->

## ➤ Project Overview

The Digital Scribe is a web platform designed to bridge the gap between ancient history and modern technology. At its core is a "Hieroglyph Composer" that allows users to translate English or Arabic text into a beautifully rendered hieroglyphic cartouche in real-time.

This project is not just a translator; it's an educational tool and a content creation engine, perfect for attracting interest from clients in marketing, education, and cultural sectors. It showcases the ability to build engaging, polished, and shareable web experiences.

## ✨ Key Features

*   **👑 Real-Time Translation Engine:** As you type, hieroglyphs representing the phonetic sounds of your text appear instantly.
*   **📜 Interactive Glyphs:** Hover over any hieroglyph in the generated cartouche to see a tooltip with its meaning, phonetic value, and a brief description.
*   **🖼️ Stylized Cartouche Generator:** Download your final creation as a high-quality, transparent PNG or a scalable SVG, perfect for sharing on social media or using in other projects.
*   **📚 "Learn" Section:** An integrated mini-encyclopedia featuring a gallery of hieroglyphs, profiles of Egyptian gods, and articles on the history of writing.
*   **🎨 Elegant, Responsive Design:** The UI is inspired by papyrus scrolls and ancient art, yet maintains a clean, modern, and fully responsive aesthetic.

## 🚀 Portfolio Value (Why This Project?)

*   **Showcases Core Web Skills:** Demonstrates full-stack capabilities, including a modern front-end framework (React/Vue), API development (Node.js/Express), and a deep understanding of polished UI/UX design.
*   **High "Wow" Factor:** The immediate visual feedback of seeing one's name transform into hieroglyphs provides an impressive and memorable user experience.
*   **Viral & Shareable Content:** The downloadable cartouche is a personalized digital artifact that users will be eager to share, demonstrating an understanding of how to build products with organic marketing potential.

## 🛠️ Tech Stack

### Currently Implemented
*   **Front-End:** React 19 (with Vite), TypeScript, Axios for API communication
*   **Back-End:** Node.js, Express.js 5, TypeScript, CORS enabled
*   **Data Storage:** JSON-based hieroglyph definitions and translation mappings
*   **Assets:** 30 SVG hieroglyph images with full metadata

### Planned Additions
*   **Styling:** Tailwind CSS, Framer Motion (for animations)
*   **Image Generation:** `html-to-image` library for downloadable cartouches
*   **Database:** MongoDB for "Learn" section content
*   **Deployment:** Vercel (Front-End), Render/Heroku (Back-End)

## 📊 Development Status

### ✅ Completed Features
- **✅ Task 1.1: Project Scaffolding & Environment Setup** - Complete monorepo structure with TypeScript-configured client (React + Vite) and server (Node.js + Express)
- **✅ Task 1.2: Hieroglyph Data Modeling & Sourcing** - 30 hieroglyph definitions with SVG images, complete phonetic translation mapping system
- **✅ Task 1.3: Backend - Translation API Endpoint** - Functional REST API at `POST /api/v1/translate` with input validation and error handling

### 🔧 Current API Endpoints
- **POST** `/api/v1/translate` - Translates English text to hieroglyph sequence
  - **Request Body:** `{ "text": "your text here" }`
  - **Response:** Array of glyph objects with metadata and image URLs

### 🚧 In Development
- Task 1.4: Frontend - Basic Composer & API Integration (Next Phase)

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18.x or higher)
*   npm or yarn
*   Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/digital-scribe.git
    cd digital-scribe
    ```

2.  **Install server dependencies:**
    ```sh
    cd server
    npm install
    ```

3.  **Install client dependencies:**
    ```sh
    cd ../client
    npm install
    ```

4.  **Set up environment variables:**
    *   Create a `.env` file in the `/server` directory.
    *   Add your database connection string and any other required keys (e.g., `MONGO_URI=your_connection_string`).

### Running the Application

1.  **Start the back-end server:**
    ```sh
    cd server
    npm run dev
    ```
    The server will start on `http://localhost:8080` and serve the translation API.

2.  **Start the front-end development server:**
    ```sh
    cd client
    npm run dev
    ```
    The React app will be available at `http://localhost:5173`.

### Testing the API

You can test the translation endpoint directly:

```bash
curl -X POST http://localhost:8080/api/v1/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "hello"}'
```

This will return an array of hieroglyph objects corresponding to the input text.


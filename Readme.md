# The Digital Scribe: An Interactive Hieroglyph Composer

An elegant, interactive web application for translating modern text into a shareable ancient Egyptian hieroglyphic cartouche.

**[Live Demo](https://your-live-demo-url.com)** &nbsp;&nbsp;&nbsp; **[Project Roadmap](#-project-roadmap)**

 <!--- Placeholder: Replace with an actual screenshot when ready -->

## ➤ Project Overview

The Digital Scribe is a web platform designed to bridge the gap between ancient history and modern technology. At its core is a "Hieroglyph Composer" that allows users to translate English or Arabic text into a beautifully rendered hieroglyphic cartouche in real-time.

This project is not just a translator; it's an educational tool and a content creation engine, perfect for attracting interest from clients in marketing, education, and cultural sectors. It showcases the ability to build engaging, polished, and shareable web experiences.

## ✨ Key Features

### ✅ Currently Working (Phase 1 Complete)
*   **👑 Real-Time Translation Engine:** As you type, hieroglyphs representing the phonetic sounds of your text appear instantly via live API integration.
*   **🔄 Live Preview:** Watch your text transform into authentic Egyptian hieroglyphs in real-time as you type.
*   **📊 30+ Hieroglyph Database:** Comprehensive collection of accurately mapped hieroglyphs with full metadata.
*   **🚀 REST API:** Robust backend translation service with input validation and error handling.
*   **⚡ Responsive Interface:** Clean, functional React frontend with debounced API calls for optimal performance.

### ✅ Completed in Phase 2
*   **📜 Interactive Glyphs:** Hover tooltips with hieroglyph meanings and descriptions.
*   **🖼️ Stylized Cartouche Generator:** Visually frames hieroglyphs in the iconic cartouche shape.
*   **🎨 Elegant Theming:** Papyrus-inspired design with modern, responsive aesthetics.

### 🚧 Phase 3: In Progress / Blocked
*   **📚 "Learn" Section:** (In Progress / Blocked due to server crash) Educational content about hieroglyphs and Egyptian history.
*   **💾 Downloadable Cartouches:** (In Progress / Blocked due to broken share link) Save your creation as a high-quality PNG or SVG file.
*   **📱 Social Sharing:** (In Progress / Blocked due to broken share link) Share your hieroglyphic cartouche on social media.

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

### ✅ **PHASE 1 & 2 COMPLETED!** ✅
**Full MVP with enhanced visual experience now complete!**

### ✅ Completed Features
- **✅ Task 1.1: Project Scaffolding & Environment Setup** - Complete monorepo structure with TypeScript-configured client (React + Vite) and server (Node.js + Express)
- **✅ Task 1.2: Hieroglyph Data Modeling & Sourcing** - 30 hieroglyph definitions with SVG images, complete phonetic translation mapping system
- **✅ Task 1.3: Backend - Translation API Endpoint** - Functional REST API at `POST /api/v1/translate` with input validation and error handling
- **✅ Task 1.4: Frontend - Basic Composer & API Integration** - Interactive React frontend with real-time translation display

### 🔧 Current API Endpoints
- **POST** `/api/v1/translate` - Translates English text to hieroglyph sequence
  - **Request Body:** `{ "text": "your text here" }`
  - **Response:** Array of glyph objects with metadata and image URLs

### 🚀 **Live Application**
- **Frontend:** [`http://localhost:5173`](http://localhost:5173) - Interactive hieroglyph composer
- **Backend:** [`http://localhost:8080`](http://localhost:8080) - Translation API server
- **Status:** ✅ Fully operational MVP with real-time text-to-hieroglyph translation

### 🚧 Next Phase
- **Phase 3: Content, Shareability & Feature Expansion** - *In Progress / Blocked*. Adding educational content, download features, and social sharing.

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

### Testing the Application

**🎯 Try the Live Application:**
1. Open [`http://localhost:5173`](http://localhost:5173) in your browser
2. Type any English text into the input field
3. Watch real-time hieroglyph translation appear below
4. Each glyph represents the phonetic sounds of your input

**🔧 Test the API Directly:**
```bash
curl -X POST http://localhost:8080/api/v1/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "hello"}'
```

**📝 Example API Response:**
```json
[
  {
    "glyphId": "D58",
    "unicode": "U+13171",
    "phoneticValue": "h",
    "description": "A foot, representing the 'h' sound.",
    "category": "Human Body",
    "imageUrl": "/glyphs/D58.svg"
  }
]
```

**✨ Try These Sample Inputs:**
- Your name (e.g., "john", "sarah")
- Simple words (e.g., "love", "peace", "home")
- Short phrases (watch the multi-character mappings work!)


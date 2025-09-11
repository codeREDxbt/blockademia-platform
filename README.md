#  Blockademia: Decentralized Learning Platform

    [![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
    [![Vite](https://img.shields.io/badge/Vite-5.3.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
    [![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
    [![Supabase](https://img.shields.io/badge/Supabase-2.44.4-green?style=for-the-badge&logo=supabase)](https://supabase.io/)
    [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-cyan?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

    Welcome to **Blockademia**, a next-generation online learning platform that leverages blockchain technology to offer a secure, transparent, and rewarding educational experience. Our mission is to empower learners by giving them ownership of their educational achievements through verifiable, on-chain certificates.

    ---

    ## ✨ Key Features

    -   **Interactive Course Catalogue**: Browse a wide range of courses in cutting-edge technologies.
    -   **Personalized Dashboards**: Track your learning progress, view completed courses, and monitor your achievements.
    -   **Blockchain-Verified Certificates**: Earn and manage NFT certificates for completed courses, providing undeniable proof of your skills.
    -   **Gamified Rewards System**: Stay motivated with a rewards system that recognizes your dedication and progress.
    -   **Secure Authentication**: Modern, secure user authentication and profile management powered by Supabase.
    -   **Stunning, Responsive UI**: A beautiful and intuitive user interface built with React and Tailwind CSS, ensuring a seamless experience on any device.

    ---

    ## 🚀 Getting Started

    Follow these instructions to get the project up and running on your local machine for development and testing purposes.

    ### Prerequisites

    -   [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
    -   [npm](https://www.npmjs.com/) (usually comes with Node.js)

    ### Installation & Setup

    1.  **Clone the repository** (or use the existing project files):
        ```bash
        # This step is not needed in the current environment
        # git clone https://github.com/your-username/blockademia.git
        # cd blockademia
        ```

    2.  **Install dependencies**:
        This command will install all the necessary packages defined in `package.json`.
        ```bash
        npm install
        ```

    3.  **Set up environment variables**:
        Create a `.env` file in the root of the project and add your Supabase project credentials. You can get these from your Supabase project dashboard.

        ```env
        VITE_SUPABASE_URL=YOUR_SUPABASE_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```

    4.  **Run the development server**:
        This command starts the Vite development server, typically on `http://localhost:3000`.
        ```bash
        npm run dev
        ```

    You should now be able to view the application in your browser!

    ---

    ## 🛠️ Tech Stack

    This project is built with a modern, robust, and scalable tech stack:

    -   **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
    -   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Radix UI for accessible components.
    -   **Backend & Database**: [Supabase](https://supabase.io/) (PostgreSQL, Auth, Storage)
    -   **Routing**: [React Router](https://reactrouter.com/)
    -   **State Management**: React Context API
    -   **Web3 Integration**: [Ethers.js](https://ethers.io/)

    ---

    ## 📂 Project Structure

    The project follows a feature-oriented structure to keep the codebase organized and maintainable.

    ```
    /
    ├── public/              # Static assets
    ├── src/
    │   ├── assets/          # Images, icons, etc.
    │   ├── components/      # Reusable UI components (atoms, molecules, organisms)
    │   │   ├── ui/          # Radix-based UI components
    │   │   └── ...
    │   ├── contexts/        # React Context providers (Auth, Web3, etc.)
    │   ├── lib/             # Utility functions and helpers (e.g., Supabase client)
    │   ├── App.tsx          # Main application component with routing
    │   ├── main.tsx         # Entry point of the application
    │   └── index.css        # Global styles and Tailwind directives
    ├── .env                 # Environment variables (ignored by Git)
    ├── index.html           # Main HTML file
    ├── package.json         # Project dependencies and scripts
    ├── tailwind.config.js   # Tailwind CSS configuration
    └── vite.config.ts       # Vite configuration
    ```

    ---

    ## 🤝 Contributing

    We welcome contributions from the community! If you'd like to contribute, please follow these steps:

    1.  **Fork the repository.**
    2.  **Create a new branch** for your feature or bug fix (`git checkout -b feature/your-feature-name`).
    3.  **Make your changes** and commit them with clear, descriptive messages.
    4.  **Push your changes** to your forked repository.
    5.  **Open a pull request** to the `main` branch of the original repository.

    Please ensure your code adheres to the existing code style and that all tests pass.

    ---

    ## 📄 License

    This project is licensed under the MIT License. See the `LICENSE` file for more details.

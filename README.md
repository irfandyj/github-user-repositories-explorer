# GitHub Repositories Explorer

A modern React application that allows users to search for GitHub users and explore their repositories with a clean, responsive interface.

![GitHub Repositories Explorer](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)

## 🚀 Live Demo

[View Live Application](https://irfandyj.github.io/github-user-repositories-explorer)

## ✨ Features

- **User Search**: Search for GitHub users by username
- **Repository Explorer**: View user repositories with details like stars and descriptions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Smooth loading indicators and skeleton components
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Built with accessibility in mind using Radix UI primitives
- **Real-time Search**: Instant search results with proper debouncing
- **Repository Details**: View repository information including star count and descriptions

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Latest React with modern hooks and features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Fast build tool and development server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### UI & Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Next Themes** - Theme management
- **Sonner** - Toast notifications

### State Management & API
- **Alova 3.3.4** - Lightweight request strategy library
- **React Hook Form 7.65.0** - Performant forms with easy validation
- **Zod 4.1.12** - TypeScript-first schema validation

### Development & Testing
- **Vitest 3.2.4** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **ESLint** - Code linting and formatting
- **Coverage Reports** - Test coverage with V8 provider

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/irfandyj/github-user-repositories-explorer.git
   cd github-user-repositories-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI |
| `npm run test:cov` | Run tests with coverage |

## 🏗️ Project Structure

```
src/
├── api/
│   └── github/           # Auto-generated GitHub API definitions
├── components/
│   ├── molecules/        # Reusable component molecules
│   │   ├── SearchUserForm/
│   │   └── SearchUserAccordion/
│   ├── organisms/        # Complex component organisms
│   │   └── SearchUserCard/
│   └── ui/              # Base UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🎯 Usage

1. **Search for Users**
   - Enter a GitHub username in the search field
   - Click "Search" or press Enter
   - View up to 5 matching users

2. **Explore Repositories**
   - Click on any user to expand their section
   - View their repositories with details
   - Click on repository names to open them on GitHub

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run tests with UI
npm run test:ui
```

### Test Coverage
- Component unit tests
- Integration tests
- User interaction tests
- API mocking

## 🚀 Deployment

### GitHub Pages (Automated)
The project uses GitHub Actions for automatic deployment to GitHub Pages. The deployment is triggered on every push to the `master` branch.

**Workflow Features:**
- Automatic deployment on push to master branch
- Manual deployment trigger available
- Node.js 18 with npm caching
- TypeScript compilation support
- GitHub Pages integration

**Deployment Process:**
1. Push changes to the `master` branch
2. GitHub Actions automatically builds the project
3. Deploys the built files to GitHub Pages
4. Live site updates automatically

### Manual Build & Preview
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### GitHub Actions Workflow
The deployment is handled by `.github/workflows/deploy.yml` which:
- Installs dependencies with npm caching
- Builds the TypeScript project
- Deploys to GitHub Pages using the official GitHub Pages action

## 🔧 Configuration

### API Configuration
The GitHub API integration is configured in `src/api/github/index.ts`:
- Base URL: `https://api.github.com`
- Auto-generated API definitions from GitHub's OpenAPI spec
- Error handling with toast notifications

### Alova Configuration
API definitions are auto-generated from GitHub's OpenAPI specification using the Alova VS Code plugin.

## 🎨 Design System

The project uses a custom design system built on:
- **Tailwind CSS** for utility classes
- **Radix UI** for accessible primitives
- **Custom components** for consistent styling
- **Responsive design** principles

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Irfandy Jiputra**
- GitHub: [@irfandyj](https://github.com/irfandyj)
- Project: [GitHub Repositories Explorer](https://github.com/irfandyj/github-user-repositories-explorer)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Alova](https://alova.js.org/) for the excellent request strategy library
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**
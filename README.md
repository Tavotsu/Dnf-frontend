# Sanos y Salvos - Frontend Application

## Introduction

Sanos y Salvos (formerly known as DNF - Dogs n' Friends) is a modern web application designed to help families reunite with their lost pets. The platform combines community vigilance with advanced geolocation tools to ensure that no pet is far from home for long. 

This repository contains the frontend application, built with a modern React stack, emphasizing performance, responsive design, and user experience. It integrates seamlessly with the backend microservices to provide real-time reporting, interactive maps, and community-driven features.

## Core Features

- **Detailed Lost Pet Reporting**: Provides a comprehensive form allowing users to submit detailed reports. This includes uploading multiple photographs, describing medical or distinctive features, and pinpointing the exact location of the disappearance using an interactive map interface.
- **Interactive Sightings Map**: Integrates Leaflet and OpenStreetMap for real-time visualization of lost pets and recent sightings within a specific geographical area. Users can track potential sightings and coordinate search efforts directly from the map.
- **Notification System**: Keeps users informed about potential matches, new sightings, comments on their reports, and other relevant community updates.
- **Success Stories**: A dedicated section where users can share their reunion stories, fostering hope and motivating the community to continue their collaborative efforts.
- **User Profile Management**: Secure user profiles that allow individuals to manage their active reports, configure notification preferences, and review their history of found pets.
- **Responsive and Premium Design**: Built with a sophisticated user interface using a custom "Sandstone" color palette. The application is fully responsive, ensuring an optimal experience across desktop, tablet, and mobile devices.

## Technology Stack

- **Framework**: React (version 18 or higher) utilizing TypeScript for robust type checking and better developer experience.
- **Styling**: Tailwind CSS (version 4.0) for utility-first styling and custom design system implementation.
- **Routing**: Client-side routing managed internally with a custom state-based router.
- **Maps Integration**: Leaflet paired with React-Leaflet for rendering dynamic, interactive maps.
- **Animations**: Framer Motion (via motion/react) to provide smooth micro-interactions and page transitions.
- **Iconography**: Lucide React for consistent and scalable vector icons.
- **Build Tool**: Vite, providing a fast and optimized development server and production build process.
- **Testing**: Vitest and React Testing Library for comprehensive unit and integration testing.

## Project Structure

The codebase is organized as follows to maintain separation of concerns and scalability:

```text
/src
  /__tests__      # Unit and integration tests for components and views
  /components     # Reusable UI components (Navbar, Footer, NotificationMenu, etc.)
  /constants      # Global constants, configuration values, and static assets references
  /lib            # Shared utilities and helper functions
  /utils          # API communication helpers and authentication utilities
  /views          # Main application views/pages (Home, Report, Map, Auth, UserProfile, etc.)
  App.tsx         # Root component responsible for state management and view orchestration
  index.css       # Global stylesheet, Tailwind directives, and theme configuration
  main.tsx        # Application entry point
/public           # Static public assets (images, favicons)
ENDPOINTS.md      # Documentation of the REST API endpoints and integration details
```

## Setup and Installation

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (version 18.x or higher is recommended)
- npm or yarn package manager

### Installation Steps

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server by running:
```bash
npm run dev
```
Once the server is running, you can access the application in your browser at `http://localhost:3000` (or the port specified in your terminal).

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be generated in the `dist` directory, ready to be served by any static file hosting service.

### Running Tests

To execute the test suite:
```bash
npm run test
```

## Authentication and Testing Credentials

The application connects to a backend API that requires authentication for certain actions (like creating a report or viewing the user profile). For testing purposes during development, you can use the following seeded credentials:

- **Email**: admin@dnf.cl
- **Password**: Admin123!

Alternatively, you can register a new account through the application's registration view.

## API Integration

The frontend communicates with a microservices-based backend via an API Gateway. All requests are routed through `/api/*`. Authentication is handled via JWT tokens, which are stored in the browser's local storage and attached to requests using the `fetchWithAuth` utility located in `src/utils/api.ts`. For more details on the available endpoints, refer to the `ENDPOINTS.md` file.

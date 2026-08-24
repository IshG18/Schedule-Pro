# Schedule-Pro

Schedule-Pro is a React Native calendar application built with Expo.

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- git
- make
- expo

You can verify your Node.js, npm, and Expo installations with:

```
node --version
npm --version
npm expo --version
```

## Installation

Clone the repository:

```
git clone <repository-url>
cd Schedule-Pro
```

Install the project dependencies:

```
npm install --legacy-peer-deps
```

## Running the Project

Start the Expo development server:

```
npx expo start
```

From the Expo development server, you can launch the application on the available platforms or connect a physical device using the Expo development workflow.

## Development

The project uses Expo and Expo Router for React Native development.

The application uses file-based routing. Routes are organized inside the `app` directory, with the `(tabs)` route group used to organize the application's bottom-tab navigation. The `_layout.tsx` files define the navigation layouts for their respective routes.

During development, changes to the application can be tested through the Expo development server. Follow the existing project conventions when creating new screens and reusable components.

## Quality Checks

The project includes automated tooling for maintaining code quality.

### Check

Run formatting, linting, and type checks without making changes:
```
make check
```

### Fix

Automatically format and fix lint issues:
```
make fix
```
Before submitting changes, run the relevant quality checks to ensure the code is properly formatted, passes linting, and contains no TypeScript errors.

## Project Structure

```
Schedule-Pro/
├── app/
│   ├── _layout.tsx          # Root navigation layout
│   └── (tabs)/
│       ├── _layout.tsx      # Bottom tab navigation layout
│       ├── index.tsx        # Default tab
│       └── ...              # Additional tab routes
├── components/              # Reusable React Native components
├── assets/                  # Static assets
├── package.json             # Project configuration and scripts
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Files and directories ignored by Prettier
└── README.md                # Project documentation
```

The project structure may evolve as new application features are added.

## Contributing

Create a feature or chore branch for your changes, make the required updates, and submit a pull request for review.

Keep changes focused and run the project's quality checks before opening a pull request.

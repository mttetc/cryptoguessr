# Crypto Guessr

This app uses React, Typescript, Shadcn, Zustand, Tanstack Query, Vite, Cypress, Binance API, AWS lambda, AWS dynamoDB, AWS api gateway, SAM.

## How to Launch the App

1. **Install Dependencies**:

   ```sh
   npm install
   ```

2. **Start the Development Server**
   ```sh
     npm run dev
   ```

By default, the app will be available at http://localhost:5173.

## How to Run Tests

1. Run Unit Tests
   ```sh
   npm run test
   ```

## How to Run Cypress Tests

1. **Ensure the Development Server is Running**: Make sure the app is running at `http://localhost:5173`. If you need to change the base URL, update the baseUrl in the Cypress configuration file (`cypress.config.js`) and the port in `vite.config.ts`.

2. **Run Cypress**
   ```sh
   npx cypress open
   ```

This will open the Cypress Test Runner where you can run your tests.

## Configuration

**Cypress Configuration**

If your app is not running at `http://localhost:5173`, you need to update the baseUrl in the Cypress configuration file.

For example, in `cypress.config.js`:

```sh
 module.exports = {
     e2e: {
         baseUrl: 'http://localhost:5173',
     },
 };
```

**Vite Configuration**

If you need to change the port for the Vite development server, update the `vite.config.js` file:

```sh
export default {
    server: {
        port: 5173,
    },
};
```

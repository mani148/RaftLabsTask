# RaftLabsTask
# 🏡 PropertyExpo - React Native Property Booking App

A mobile app for exploring and booking properties, built with **React Native**, **TypeScript**, and **Expo**.

## 📱 Features

- 🔍 Search properties by title or location
- 📅 View bookings with check-in/check-out status
- 🗺 Navigate to property details
- 📦 State managed via **Zustand**
- 🔗 Backend integrated using REST APIs (mocked with JSON Server)

## 📦 Tech Stack

- React Native (with Expo)
- TypeScript
- Zustand (state management)
- React Navigation (stack + tabs)
- Lodash (utilities)
- Axios (API calls)
- JSON Server (mock REST API)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mani148/RaftLabsTask.git
cd RaftLabsTask


2. Install dependencies
npm install

3. Setup JSON Server (Mock Backend)
JSON Server provides a quick REST API based on a JSON file.

Install JSON Server globally if you haven't yet:

npm install -g json-server
The db.json file is located in the root directory and contains mock data for properties and bookings.

4. Run JSON Server
In a separate terminal window, start the JSON Server:

json-server --watch db.json --port 3000
This starts the API server at: http://localhost:3000

5. Start the React Native app
npx expo start

6. Run on your device
Install the Expo Go app (from App Store or Play Store)

Scan the QR code displayed in the terminal or browser

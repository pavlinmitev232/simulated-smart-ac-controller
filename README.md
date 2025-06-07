# Simulated Smart AC Controller

A React TypeScript application that simulates controlling a Wi-Fi enabled air conditioner. This app allows users to simulate connecting to an AC unit and control its power state, temperature, and operating modes.

## Features

- **Connection Simulation**: Simulate connecting/disconnecting to a smart AC unit
- **Power Control**: Toggle AC power on/off
- **Temperature Control**: Adjust temperature settings (16-30°C)
- **Mode Selection**: Switch between Cool, Heat, and Fan modes
- **Modern UI**: Built with Tailwind CSS for a sleek, responsive design
- **Real-time Feedback**: Visual indicators for connection status and loading states

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if needed)

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (loaded via CDN)

## Project Structure

```
├── components/
│   ├── SmartACController.tsx  # Main AC controller component
│   └── icons.tsx              # SVG icon components
├── App.tsx                    # Root application component
├── index.tsx                  # Application entry point
├── types.ts                   # TypeScript type definitions
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Note

This is a simulated AC controller for demonstration purposes. No real hardware is being controlled.
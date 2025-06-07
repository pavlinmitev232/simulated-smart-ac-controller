import React, { useState, useCallback } from 'react';
import SmartACController from './components/SmartACController';
import { ACState, ACMode } from './types';

const App: React.FC = () => {
  const [acState, setAcState] = useState<ACState>({
    name: 'Living Room AC',
    isConnected: false,
    isConnecting: false,
    powerOn: false,
    temperature: 22,
    mode: ACMode.COOL,
  });

  const handleConnectToggle = useCallback(() => {
    if (acState.isConnecting) return;

    if (acState.isConnected) {
      // Simulate disconnecting
      setAcState(prev => ({ ...prev, isConnected: false, powerOn: false })); // Turn off AC on disconnect
    } else {
      // Simulate connecting
      setAcState(prev => ({ ...prev, isConnecting: true }));
      setTimeout(() => {
        // Simulate connection success
        setAcState(prev => ({ ...prev, isConnected: true, isConnecting: false }));
      }, 2000); // 2 second delay for connection
    }
  }, [acState.isConnected, acState.isConnecting]);

  const handlePowerToggle = useCallback(() => {
    if (!acState.isConnected || acState.isConnecting) return;
    setAcState(prev => ({ ...prev, powerOn: !prev.powerOn }));
  }, [acState.isConnected, acState.isConnecting]);

  const handleTemperatureChange = useCallback((newTemp: number) => {
    if (!acState.isConnected || acState.isConnecting || !acState.powerOn) return;
    setAcState(prev => ({ ...prev, temperature: newTemp }));
  }, [acState.isConnected, acState.isConnecting, acState.powerOn]);

  const handleModeChange = useCallback((newMode: ACMode) => {
    if (!acState.isConnected || acState.isConnecting || !acState.powerOn) return;
    setAcState(prev => ({ ...prev, mode: newMode }));
  }, [acState.isConnected, acState.isConnecting, acState.powerOn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      <div className="w-full max-w-lg">
        <SmartACController
          acState={acState}
          onConnectToggle={handleConnectToggle}
          onPowerToggle={handlePowerToggle}
          onTemperatureChange={handleTemperatureChange}
          onModeChange={handleModeChange}
        />
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>This is a simulated AC controller. No real hardware is being controlled.</p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
import React from 'react';
import { ACState, ACMode } from '../types';
import { PowerIcon, WifiIcon, SnowflakeIcon, SunIcon, FanIcon, ChevronUpIcon, ChevronDownIcon, LoadingSpinnerIcon } from './icons';

interface SmartACControllerProps {
  acState: ACState;
  onConnectToggle: () => void;
  onPowerToggle: () => void;
  onTemperatureChange: (newTemp: number) => void;
  onModeChange: (newMode: ACMode) => void;
}

const ModeButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, label, isActive, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex flex-col items-center justify-center p-3 space-y-1 rounded-lg transition-all duration-200 ease-in-out
                w-24 h-24
                ${isActive ? 'bg-sky-500 text-white shadow-lg ring-2 ring-sky-300' : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-slate-100'}
                ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-800 hover:bg-slate-800 text-slate-500' : ''}`}
    aria-label={`Set mode to ${label}`}
    title={`Set mode to ${label}`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);


const SmartACController: React.FC<SmartACControllerProps> = ({
  acState,
  onConnectToggle,
  onPowerToggle,
  onTemperatureChange,
  onModeChange,
}) => {
  const { name, isConnected, isConnecting, powerOn, temperature, mode } = acState;

  const handleTempUp = () => {
    if (temperature < 30) onTemperatureChange(temperature + 1);
  };

  const handleTempDown = () => {
    if (temperature > 16) onTemperatureChange(temperature - 1);
  };
  
  const connectionStatusColor = isConnected ? 'text-green-400' : 'text-amber-400';
  const connectionStatusText = isConnecting ? 'Connecting...' : (isConnected ? 'Connected' : 'Disconnected');

  const controlsDisabled = !isConnected || isConnecting;

  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 w-full max-w-md mx-auto my-8 transform transition-all duration-500 ease-in-out">
      {/* Header: Name and Connection Status */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sky-400">{name}</h1>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${isConnected ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
          <WifiIcon className={`w-5 h-5 ${connectionStatusColor}`} />
          <span className={connectionStatusColor}>{connectionStatusText}</span>
          {isConnecting && <LoadingSpinnerIcon className={`w-4 h-4 ml-1 ${connectionStatusColor}`} />}
        </div>
      </div>

      {/* Connection Button */}
      {!isConnecting && (
         <button
            onClick={onConnectToggle}
            className={`w-full py-3 mb-6 rounded-lg text-white font-semibold transition-colors duration-200 ease-in-out
                        ${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'}`}
          >
            {isConnected ? 'Disconnect from AC' : 'Connect to AC'}
          </button>
      )}
      {isConnecting && (
        <div className="w-full py-3 mb-6 rounded-lg text-slate-400 font-semibold bg-slate-700 text-center">
          Attempting Connection...
        </div>
      )}


      {/* Main Display: Power Status and Temperature */}
      <div className={`relative flex flex-col items-center justify-center p-6 mb-6 rounded-lg transition-opacity duration-300 ${controlsDisabled ? 'opacity-60' : 'opacity-100'}`}>
        <div className={`absolute inset-0 rounded-lg ${powerOn && isConnected ? 'bg-sky-600/30 shadow-inner-sky' : 'bg-slate-700/50 shadow-inner-slate'} transition-all duration-500`}></div>
        <div className="relative z-10">
          <button
            onClick={onPowerToggle}
            disabled={controlsDisabled}
            className={`p-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4
                        ${powerOn && isConnected ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-xl focus:ring-sky-300' : 'bg-slate-600 hover:bg-slate-500 text-slate-300 shadow-md focus:ring-slate-400'}
                        ${controlsDisabled ? '!bg-slate-700 !text-slate-500 cursor-not-allowed hover:!bg-slate-700 focus:!ring-0' : ''}`}
            aria-label={powerOn ? 'Turn AC Off' : 'Turn AC On'}
            title={powerOn ? 'Turn AC Off' : 'Turn AC On'}
          >
            <PowerIcon className="w-10 h-10" />
          </button>
          <p className={`mt-3 text-sm font-medium ${powerOn && isConnected ? 'text-sky-300' : 'text-slate-400'}`}>
            {isConnected ? (powerOn ? 'AC ON' : 'AC OFF') : 'AC Offline'}
          </p>
        </div>
        
        <div className="relative z-10 mt-6 flex items-center space-x-4">
            <button 
                onClick={handleTempDown} 
                disabled={controlsDisabled || !powerOn}
                className={`p-2 rounded-full transition-colors ${controlsDisabled || !powerOn ? 'text-slate-600 bg-slate-750 cursor-not-allowed' : 'text-sky-300 hover:bg-sky-500/30 hover:text-sky-200 bg-slate-700'}`}
                aria-label="Decrease temperature"
                title="Decrease temperature"
            >
                <ChevronDownIcon className="w-8 h-8"/>
            </button>
            <div className="text-6xl font-light tabular-nums text-slate-100">
                {temperature}<span className="text-3xl align-top">°C</span>
            </div>
            <button 
                onClick={handleTempUp} 
                disabled={controlsDisabled || !powerOn}
                className={`p-2 rounded-full transition-colors ${controlsDisabled || !powerOn ? 'text-slate-600 bg-slate-750 cursor-not-allowed' : 'text-sky-300 hover:bg-sky-500/30 hover:text-sky-200 bg-slate-700'}`}
                aria-label="Increase temperature"
                title="Increase temperature"
            >
                <ChevronUpIcon className="w-8 h-8"/>
            </button>
        </div>
      </div>


      {/* Mode Controls */}
      <div className={`transition-opacity duration-300 ${controlsDisabled || !powerOn ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 text-center">MODE</h3>
        <div className="grid grid-cols-3 gap-3">
          <ModeButton
            icon={<SnowflakeIcon className="w-8 h-8" />}
            label="Cool"
            isActive={mode === ACMode.COOL}
            onClick={() => onModeChange(ACMode.COOL)}
            disabled={controlsDisabled || !powerOn}
          />
          <ModeButton
            icon={<SunIcon className="w-8 h-8" />}
            label="Heat"
            isActive={mode === ACMode.HEAT}
            onClick={() => onModeChange(ACMode.HEAT)}
            disabled={controlsDisabled || !powerOn}
          />
          <ModeButton
            icon={<FanIcon className="w-8 h-8" />}
            label="Fan"
            isActive={mode === ACMode.FAN}
            onClick={() => onModeChange(ACMode.FAN)}
            disabled={controlsDisabled || !powerOn}
          />
        </div>
      </div>
    </div>
  );
};

export default SmartACController;
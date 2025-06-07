export enum ACMode {
  COOL = 'COOL',
  HEAT = 'HEAT',
  FAN = 'FAN',
}

export interface ACState {
  name: string;
  isConnected: boolean;
  isConnecting: boolean;
  powerOn: boolean;
  temperature: number; // Celsius
  mode: ACMode;
}
    
import { authenticatedRequest } from '../auth/authApi';

export type SensorConnectionStatus = 'ONLINE' | 'OFFLINE' | 'UNAVAILABLE' | 'UNKNOWN';

export type DeviceSensorStatus = {
  id: string;
  potId: number;
  potLabel: string;
  label: string;
  metric: string;
  status: SensorConnectionStatus;
};

export type DeviceSensorStatusResponse = {
  deviceId: number;
  sensors: DeviceSensorStatus[];
};

export function getDeviceSensors(deviceId: number) {
  return authenticatedRequest<DeviceSensorStatusResponse>(`/api/devices/${deviceId}/sensors`);
}

import { authenticatedRequest } from '../auth/authApi';
import type { PotResponse } from '../device/deviceApi';

export function getPots() {
  return authenticatedRequest<PotResponse[]>('/api/pots');
}

export function getPot(potId: number) {
  return authenticatedRequest<PotResponse>(`/api/pots/${potId}`);
}

import { authenticatedRequest } from '../auth/authApi';

export type CultivationSpaceResponse = {
  id: number;
  name: string;
  spaceType: string;
  areaSquareMeters: number;
};

export type CreateCultivationSpaceInput = {
  name: string;
  spaceType: string;
  areaSquareMeters: number;
};

export function getCultivationSpaces() {
  return authenticatedRequest<CultivationSpaceResponse[]>('/api/spaces');
}

export function createCultivationSpace(input: CreateCultivationSpaceInput) {
  return authenticatedRequest<CultivationSpaceResponse>('/api/spaces', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

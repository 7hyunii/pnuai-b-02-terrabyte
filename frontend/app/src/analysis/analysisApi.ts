import { authenticatedRequest } from '../auth/authApi';

export type CropRecommendation = {
  cropCode: string;
  cropName: string;
  total: number;
  reason: string;
  caution: string;
};

export function getCropRecommendations(potId: number) {
  return authenticatedRequest<CropRecommendation[]>(`/api/pots/${potId}/crop-recommendations`);
}

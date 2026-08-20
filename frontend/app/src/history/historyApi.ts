import { authenticatedRequest } from '../auth/authApi';

export type DiagnosticHistoryRecord = {
  observedAt: string;
  score: number;
  summary: string;
  issues: string;
};

export function getDiagnosticHistory(potId: number) {
  return authenticatedRequest<DiagnosticHistoryRecord[]>(`/api/pots/${potId}/diagnostic-history`);
}

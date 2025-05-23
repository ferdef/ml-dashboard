export interface MLModel {
  id: string;
  name: string;
  version: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModelRun {
  id: string;
  modelId: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed';
  parameters?: Record<string, any>;
}

export interface Metric {
  id: string;
  runId: string;
  name: string;
  value: number;
  timestamp: string;
}
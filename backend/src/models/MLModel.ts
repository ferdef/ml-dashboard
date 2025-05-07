export interface MLModel {
  id: string;
  name: string;
  version: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModelRun {
  id: string;
  modelId: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  parameters?: Record<string, any>;
}

export interface Metric {
  id: string;
  runId: string;
  name: string;
  value: number;
  timestamp: Date;
}
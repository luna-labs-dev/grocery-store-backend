import { UseCaseError } from '@/domain/core';

export class ExecutionNotFoundError extends Error implements UseCaseError {
  code: string;
  uuid?: string;

  constructor() {
    super('The execution was not found');
    this.name = 'ExecutionNotFoundError';
    this.code = 'EXECUTION-NOT-FOUND-ERROR';
  }
}

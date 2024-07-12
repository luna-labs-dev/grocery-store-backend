import { Controller, HttpResponse } from '@/api/contracts';
import { injection } from '@/main/di';
import { z } from 'zod';

const { controllers } = injection;

export const addFamilyRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type addFamilyControllerRequest = z.infer<typeof addFamilyRequestSchema>;

export class AddFamillyController implements Controller {
  handle = async (request: any): Promise<HttpResponse> => {
    throw new Error('Method not implemented.');
  };
}

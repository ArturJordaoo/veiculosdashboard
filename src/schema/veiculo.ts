import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleName: z
    .string()
    .min(1, 'Nome do veículo é obrigatório')
    .max(50, 'Nome do veículo deve ter no máximo 50 caracteres'),
  vehiclePlate: z
    .string()
    .min(7, 'Placa do veículo deve ter pelo menos 7 caracteres')
    .max(8, 'Placa do veículo deve ter no máximo 8 caracteres')
    .regex(
      /^(?:[A-Z]{3}\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/,
      'Placa do veículo inválida (ex: ABC1234 ou ABC1D23)',
    ),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

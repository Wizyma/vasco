import z from 'zod';

export const ZTargetSchema = z.object({
  month: z.number(),
  year: z.number(),
  recurringRevenue: z.number(),
  churnRate: z.number(),
  downgradeRate: z.number(),
  upgradeRate: z.number(),
})

export type TargetSchema = z.infer<typeof ZTargetSchema>;
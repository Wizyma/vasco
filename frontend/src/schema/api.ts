import z from 'zod';

export const ZRevenueSchema = z.object({
  month: z.number(),
  year: z.number(),
  recurringRevenue: z.number(),
  churnRate: z.number(),
  downgradeRate: z.number(),
  upgradeRate: z.number(),
});

export const ZAnnualRevenueSchema = z.array(ZRevenueSchema);

export const ZOutcomeAnnualRevenueSchema = z.union([z.object({
  outcome: z.literal('found'),
  entities: ZAnnualRevenueSchema
}), z.object({
  outcome: z.literal('noFound'),
  reason: z.literal('invalidInput')
}), z.object({
  outcome: z.literal('noFound'),
  reason: z.literal('unknowError')
})])


export type AnnualRevenueOutcome = z.infer<typeof ZOutcomeAnnualRevenueSchema>;
export type Revenue = z.infer<typeof ZRevenueSchema>;
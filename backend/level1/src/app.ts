import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { getPerMonths } from "./resolvers/per-month";
import { getPerYear } from "./resolvers/per-year";
import { ZTargetSchema } from "./schema";

// Context
// =======

export const createContext = (ctx: trpcExpress.CreateExpressContextOptions) => {
  return ctx;
};
type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

// Procedures
// ==========

const targetsRouter = createRouter()
  .query("perMonth", {
    input: z.object({ month: z.number().refine(input => input >= 1 || input <= 12), year: z.number() }),
    resolve: ({ input }) => {
      return new Promise((resolve) => {
        const result = getPerMonths(input.month, input.year);
    
        if(result) {
          return resolve({
            outcome: 'found',
            entity: result,
          })
        }
    
        return resolve({
          outcome: 'notFound',
          reason: 'invalidInput',
        });
      })
    },
    output: z.object({
      outcome: z.union([z.literal('found'), z.literal('notFound')]),
      reason: z.literal('invalidInput').optional(),
      entity: ZTargetSchema.optional(),
      error: z.unknown().optional(),
    }),
  })
  .query('perYear', {
    input: z.object({ year: z.number() }),
    resolve: ({ input }) => {
      return new Promise((resolve) => {
        const result = getPerYear(input.year);
    
        if(result) {
          return resolve({
            outcome: 'found',
            entities: result,
          })
        }
    
        return resolve({
          outcome: 'notFound',
          reason: 'invalidInput',
        });
      })
    },
    output: z.object({
      outcome: z.union([z.literal('found'), z.literal('notFound')]),
      reason: z.literal('invalidInput').optional(),
      entities: z.array(ZTargetSchema).optional(),
      error: z.unknown().optional(),
    }),
  });

// Root Router
// ==========

export const appRouter = createRouter().merge("targets.", targetsRouter);

export type AppRouter = typeof appRouter;

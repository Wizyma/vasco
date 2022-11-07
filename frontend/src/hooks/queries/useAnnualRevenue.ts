import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

import type { ZodError } from "zod";

import { ANNUAL_REVENUE_QUERY_KEY, BASE_API_URL, MONTHS } from "../../constants"
import { AnnualRevenueOutcome, ZOutcomeAnnualRevenueSchema } from "../../schema/api";

const fetchAnnualRevenue = async (year: number) => {
  try {
    const response = await axios.get<{result: {data: AnnualRevenueOutcome[]}}>(`${BASE_API_URL}/trpc/targets.perYear?input={"year":${year}}`);
    console.log(response.data)
    const safeData = ZOutcomeAnnualRevenueSchema.safeParse(response.data.result.data);

    if(safeData.success) {
      return safeData.data;
    }

    throw safeData.error;
  } catch(err) {
    // log its
    console.error((err as ZodError<AnnualRevenueOutcome[]>).errors)
  }
}

export const useAnnualRevenue = (year: number) => {
  return useQuery([ANNUAL_REVENUE_QUERY_KEY, year], {
    cacheTime: 60 * 24 * 1000,
    queryFn: (ctx) => fetchAnnualRevenue(parseInt(ctx.queryKey[1].toString(), 10)),
    enabled: Boolean(year),
    select: (data) => {
      if(data?.outcome === 'found') {
        return data.entities.map(entity => ({
          ...entity,
          month: MONTHS[entity.month - 1],
        }))
      } else {
        return []
      }
    }
  })
}
import targets from '../../../data/targets.json'
import { TargetSchema } from '../schema';

export function getPerMonths(month: number, year: number): TargetSchema | null {
  const getYearsData = targets.filter(target => target.year === year);

  if(getYearsData.length) {
    const byMonth = getYearsData.find(data => data.month === month);

    if(byMonth) {
      return {
        ...byMonth,
        churnRate: byMonth.churnRate / 100,
        downgradeRate: byMonth.downgradeRate / 100,
        upgradeRate: byMonth.upgradeRate / 100
      };
    }

    return null;
  } 

  return null;
}
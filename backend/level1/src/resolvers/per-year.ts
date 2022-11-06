import targets from '../../../data/targets.json'
import { TargetSchema } from '../schema';

export function getPerYear(year: number): TargetSchema[] | null {
  const getYearsData = targets.filter(target => target.year === year);

  if(getYearsData.length) {
    return getYearsData;
  } 

  return null;
}
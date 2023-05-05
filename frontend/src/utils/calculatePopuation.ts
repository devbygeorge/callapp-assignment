import { Person } from "@/types/person";

interface CityCounts {
  [key: string]: number;
}

const calculatePopulation = (persons: Person[]) => {
  const cityCounts: CityCounts = {};
  let totalHumans = 0;

  // Count the number of humans in each city
  persons.forEach((person) => {
    const city = person.address.city;
    cityCounts[city] = cityCounts[city] ? cityCounts[city] + 1 : 1;
    totalHumans++;
  });

  // Calculate the percentage of the population in each city
  const cityPopulations = Object.keys(cityCounts).map((city) => {
    const percentage = (cityCounts[city] / totalHumans) * 100;
    return { type: city, value: percentage };
  });

  return cityPopulations;
};

export default calculatePopulation;

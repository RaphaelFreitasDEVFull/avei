// src/actions/location.ts
"use server";

import db from "@/lib/db";

export async function getCountries() {
  return await db.country.findMany({ orderBy: { name: "asc" } });
}

export async function getStates(countryId: string) {
  return await db.state.findMany({
    where: { countryId },
    orderBy: { name: "asc" },
  });
}

export async function getCities(stateId: string) {
  return await db.city.findMany({
    where: { stateId },
    orderBy: { name: "asc" },
  });
}

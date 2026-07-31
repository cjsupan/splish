const BASE_URL = "https://psgc.cloud/api/v2";

export interface Region {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
}

export interface City {
  code: string;
  name: string;
  type: string;
  district: string;
  zip_code: string;
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error("Failed to fetch PSGC data.");
  }

  return response.json();
}

export const psgc = {
  getRegions: () => request<Region[]>("/regions"),

  getProvinces: () => request<Province[]>("/provinces"),

  getCities: async () => {
    const [cities, municipalities] = await Promise.all([
      request<City[]>("/cities"),
      request<City[]>("/municipalities"),
    ]);

    return [...cities, ...municipalities].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  },
};

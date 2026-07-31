import { useQuery } from "@tanstack/react-query";

const BASE = "https://psgc.cloud/api/v2";
const STALE = 24 * 60 * 60 * 1000; // 24 hours — PSGC data rarely changes

export interface PsgcOption {
  label: string;
  value: string;
  code: string;
}

const toOption = (label: string, code: string): PsgcOption => ({
  label,
  value: label,
  code,
});

// ─── Fetch helpers ────────────────────────────────────────────────────────────

const fetchRegions = async (): Promise<PsgcOption[]> => {
  const res = await fetch(`${BASE}/regions`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  const data = await res.json();
  return data?.data
    .map((r: any) => toOption(r.name, r.code))
    .sort((a: PsgcOption, b: PsgcOption) => a.label.localeCompare(b.label));
};

const fetchProvinces = async (regionCode: string): Promise<PsgcOption[]> => {
  // 1. THE FIX: Intercept NCR (1300000000) BEFORE calling the API
  if (regionCode === "1300000000") {
    // Return a dummy province so your Select component has something to show
    return [toOption("Metro Manila", "1300000000")];
  }

  // 2. For all other regions, fetch from the API normally
  const res = await fetch(`${BASE}/regions/${regionCode}/provinces`);
  if (!res.ok) throw new Error("Failed to fetch provinces");
  const data = await res.json();

  return data?.data
    .map((p: any) => toOption(p.name, p.code))
    .sort((a: PsgcOption, b: PsgcOption) => a.label.localeCompare(b.label));
};

const fetchCities = async (code: string): Promise<PsgcOption[]> => {
  // 3. THE FIX: If the code is NCR, fetch cities by REGION.
  // Otherwise, fetch them by PROVINCE.
  const endpoint =
    code === "1300000000"
      ? `${BASE}/regions/${code}/cities-municipalities`
      : `${BASE}/provinces/${code}/cities-municipalities`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch cities");
  const data = await res.json();

  return data?.data
    .map((c: any) => toOption(c.name, c.code))
    .sort((a: PsgcOption, b: PsgcOption) => a.label.localeCompare(b.label));
};

const fetchBarangays = async (cityCode: string): Promise<PsgcOption[]> => {
  const res = await fetch(
    `${BASE}/cities-municipalities/${cityCode}/barangays`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch barangays");
  }

  const data = await res.json();

  return data?.data
    .map((b: any) => toOption(b.name, b.code))
    .sort((a: PsgcOption, b: PsgcOption) => a.label.localeCompare(b.label));
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const usePsgcRegions = () =>
  useQuery({
    queryKey: ["psgc", "regions"],
    queryFn: fetchRegions,
    staleTime: STALE,
  });

export const usePsgcProvinces = (regionCode?: string) =>
  useQuery({
    queryKey: ["psgc", "provinces", regionCode],
    queryFn: () => fetchProvinces(regionCode!),
    enabled: !!regionCode,
    staleTime: STALE,
  });

export const usePsgcCities = (provinceCode?: string | null) =>
  useQuery({
    queryKey: ["psgc", "cities", provinceCode],
    queryFn: () => fetchCities(provinceCode!),
    enabled: !!provinceCode,
    staleTime: STALE,
  });

export const usePsgcBarangays = (cityCode?: string | null) =>
  useQuery({
    queryKey: ["psgc", "barangays", cityCode],
    queryFn: () => fetchBarangays(cityCode!),
    enabled: !!cityCode,
    staleTime: STALE,
  });

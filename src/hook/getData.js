export async function getRegions() {
  const res = await fetch("/data/indonesia_region.json");
  return await res.json();
}

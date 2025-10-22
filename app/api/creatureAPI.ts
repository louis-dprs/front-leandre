import type { Creature } from "~/types/creature";
import { mockCreatures } from "~/mocks/creaturesMock";

export async function getCreaturesLocalized(
  locale: string
): Promise<Creature[]> {
  try {
    const config = useRuntimeConfig();
    const url = `${config.public.apiBase}creatures/localized`;
    const res = await useAuthFetch<Creature[]>(url, { params: { locale } });
    return res as unknown as Creature[];
  } catch {
    console.warn("⚠️ API unreachable, using mock data");
    return mockCreatures;
  }
}

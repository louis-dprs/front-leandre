import type { Class } from "~/types/class";
import { mockClasses } from "~/mocks/classMock";

export async function getClassesLocalized(locale: string): Promise<Class[]> {
  try {
    const config = useRuntimeConfig();
    const url = `${config.public.apiBase}classes/localized`;
    const res = await useAuthFetch<Class[]>(url, { params: { locale } });
    return res as unknown as Class[];
  } catch {
    console.warn("⚠️ API unreachable, using mock data");
    return mockClasses;
  }
}

// app/plugins/oidc.client.ts
export default defineNuxtPlugin(async () => {
  const { fetch, login, loggedIn /*, currentProvider*/ } = useOidcAuth();
  const dbg = (...args: unknown[]) => {
    if (import.meta.dev) console.debug("[OIDC]", ...args);
  };

  // hydrate/valide la session s’il y en a déjà une
  dbg("fetch -> start");
  await fetch().catch((e) => dbg("fetch -> error", e));
  dbg("fetch -> done", { loggedIn: loggedIn.value });
});

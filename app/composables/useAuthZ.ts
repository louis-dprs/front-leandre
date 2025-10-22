export function useAuthZ() {
  const { user } = useOidcAuth();
  const hasRole = (role: string) => {
    const claims = user.value?.claims as Record<string, unknown> | undefined;
    const roles =
      (claims?.realm_access as Record<string, unknown>)?.roles ||
      (claims?.resource_access as Record<string, Record<string, unknown>>)?.[
        "dungeoncrawler-frontend"
      ]?.roles ||
      [];
    return Array.isArray(roles) && roles.includes(role);
  };
  return { hasRole };
}

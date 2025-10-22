// app/composables/useAuthFetch.ts
export function useAuthFetch<T>(
  url: string,
  opts: Record<string, unknown> = {}
) {
  const { user } = useOidcAuth();
  const accessToken = user.value?.accessToken;

  return $fetch<T>(url, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    async onResponseError(ctx) {
      if (ctx.response.status === 401) {
        const { refresh } = useOidcAuth();
        try {
          await refresh();
        } catch {
          // ignore refresh failure
        }
      }
    },
  });
}

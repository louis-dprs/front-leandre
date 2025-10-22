// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, login } = useOidcAuth();
  if (!loggedIn.value) return login();
});

<!-- app/pages/index.vue @-->
<template>
  <PublicLayout>
    <div class="flex flex-col gap-4">
      <!-- Show login button if NOT authenticated -->
      <MenuButton
        v-if="!loggedIn"
        v-model="isStartSelected"
        class="w-72 h-24 text-2xl"
        @click="handleLogin"
      >
        Login / Register
      </MenuButton>

      <!-- Show logout button if authenticated -->
      <MenuButton
        v-if="loggedIn"
        v-model="isLogoutSelected"
        class="w-72 h-24 text-2xl"
        @click="handleLogout"
      >
        Logout ({{ user?.userName || '' }})
      </MenuButton>

      <!-- Show enter dungeon button if authenticated -->
      <MenuButton
        v-model="isOptionsSelected"
        class="w-72 h-24 text-2xl"
        :disabled="!loggedIn"
        @click="handleOptions"
      >
        Enter the dungeon
      </MenuButton>

    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import PublicLayout from "~/components/ui/layout/PublicLayout.vue";
import MenuButton from "~/components/ui/button/MenuButton.vue";

definePageMeta({
  ssr: true,
});

const { loggedIn, user, login, logout } = useOidcAuth();

const isStartSelected = ref(false);
const isLogoutSelected = ref(false);
const isOptionsSelected = ref(false);

// Fetch session on mount
onMounted(async () => {
  // Nothing to fetch; useOidc state is handled by the plugin
});

// Watch for changes in user state
watch(user, () => {});

async function handleLogin() {
  await login();
}

async function handleLogout() {
  await logout();
}

function handleOptions() {
  if (loggedIn.value) {
    navigateTo("/bestiary");
  }
}
</script>

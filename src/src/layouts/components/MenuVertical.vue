<script setup>
import navItems from "@/menu/vertical"
import { useThemeConfig } from "@core/composable/useThemeConfig"

// Components
import NavbarThemeSwitcher from "@/layouts/components/TrocarTema.vue"
import NavSearchBar from "@/layouts/components/BarraPesquisa.vue"
import Footer from "@/layouts/components/Footer.vue"
import NavBarNotifications from "@/layouts/components/Notificacoes.vue"
import UserProfile from "@/layouts/components/UserProfile.vue"

// @layouts plugin
import { VerticalNavLayout } from "@layouts"

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <VSpacer />
        <NavbarThemeSwitcher class="me-1" />
        <NavBarNotifications class="me-2" />
        <NavSearchBar class="ms-lg-n3" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
      <!--
        <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
        </Transition>
      -->
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

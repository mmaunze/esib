<script setup>
import navItems from "@/menu/horizontal"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import { themeConfig } from "@themeConfig"

// Components
import NavSearchBar from "@/layouts/components/BarraPesquisa.vue"
import Footer from "@/layouts/components/Footer.vue"
import NavBarNotifications from "@/layouts/components/Notificacoes.vue"
import NavbarThemeSwitcher from "@/layouts/components/TrocarTema.vue"
import UserProfile from "@/layouts/components/UserProfile.vue"
import { HorizontalNavLayout } from "@layouts"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"

const { appRouteTransition } = useThemeConfig()
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        to="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
      </RouterLink>
      <VSpacer />
      <NavbarThemeSwitcher class="me-1" />
      <NavBarNotifications class="me-2" />
      <NavSearchBar trigger-btn-class="ms-lg-n3" />
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    <!--
      <Transition
      :name="appRouteTransition"
      mode="out-in"
      > 
       
      </Transition> 
    --> 
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
  </HorizontalNavLayout>
</template>

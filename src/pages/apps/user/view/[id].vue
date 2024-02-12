<script setup>
import { useUserListStore } from "@/views/apps/user/useUserListStore"
import UserBioPanel from "@/views/apps/user/view/Utilizador.vue"
import UserTabAccount from "@/views/apps/user/view/Conta.vue"
import UserTabBillingsPlans from "@/views/apps/user/view/Pagamentos.vue"
import UserTabseguranca from "@/views/apps/user/view/Seguranca.vue"
import UserTabConnections from '@/views/apps/user/view/Amigos.vue'
import UserTabNotifications from '@/views/apps/user/view/Notificacoes.vue'


const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: "tabler-user-check",
    title: "Minha Conta",
  },
  {
    icon: "tabler-lock",
    title: "Segurança",
  },
  {
    icon: "tabler-currency-dollar",
    title: "Pagamentos",
  },
  {
    icon: 'tabler-bell',
    title: 'Notificações',
  },
  {
    icon: 'tabler-link',
    title: 'Amigos',
  },
]

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabAccount />
        </VWindowItem>

        <VWindowItem>
          <UserTabseguranca />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>
        <VWindowItem>
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

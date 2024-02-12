<script setup>
import Conexoes from "@/views/pages/definicoes/Conexoes.vue"
import Conta from "@/views/pages/definicoes/Conta.vue"
import Notificacoes from "@/views/pages/definicoes/Notificacoes.vue"
import Pagamentos from "@/views/pages/definicoes/Pagamentos.vue"
import Seguranca from "@/views/pages/definicoes/Seguranca.vue"

import { useRoute } from "vue-router"

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: "Minha Conta",
    icon: "tabler-user",
    tab: "conta",
  },
  {
    title: "Segurança",
    icon: "tabler-lock",
    tab: "seguranca",
  },
  {
    title: "Pagamentos",
    icon: "tabler-file-text",
    tab: "pagamentos",
  },
  {
    title: "Notificações",
    icon: "tabler-bell",
    tab: "notificacoes",
  },
  {
    title: "Amigos",
    icon: "tabler-users-group",
    tab: "amigos",
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'pages-definicoes-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="conta">
        <Conta />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="seguranca">
        <Seguranca />
      </VWindowItem>

      <!-- Billing -->
      <VWindowItem value="pagamentos">
        <Pagamentos />
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="notificacoes">
        <Notificacoes />
      </VWindowItem>

      <!-- Connections -->
      <VWindowItem value="amigos">
        <Conexoes />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-definicoes-tab
</route>

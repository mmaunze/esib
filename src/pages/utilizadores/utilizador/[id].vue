<script setup>
import { useUtilizadorListStore } from "@/views/user/useUtilizadorListStore";
import UserTabAccount from "@/views/user/utilizador/Conta.vue";
import UserTabNotifications from "@/views/user/utilizador/Emprestimos.vue";
import UserTabConnections from "@/views/user/utilizador/Movimentos.vue";
import UserTabBillingsPlans from "@/views/user/utilizador/Pagamentos.vue";
import UserTabseguranca from "@/views/user/utilizador/Seguranca.vue";
import UserBioPanel from "@/views/user/utilizador/Utilizador.vue";

const userListStore = useUtilizadorListStore();
const route = useRoute();
const userData = ref();
const userTab = ref(null);

const tabs = [
  {
    icon: "tabler-user-check",
    title: "Conta",
  },
  {
    icon: "tabler-basket",
    title: "Emprestimos",
  },

  {
    icon: "tabler-currency-dollar",
    title: "Pagamentos",
  },

  {
    icon: "tabler-arrow-up",
    title: "Movimentos",
  },
  {
    icon: "tabler-lock",
    title: "Segurança",
  },
];

userListStore.fetchUser(Number(route.params.id)).then((response) => {
  userData.value = response.data;
});
</script>

<template>
  <VRow v-if="userData">
    <VCol cols="12" md="5" lg="4">
      <UserBioPanel :user-data="userData" />
    </VCol>

    <VCol cols="12" md="7" lg="8">
      <VTabs v-model="userTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.icon">
          <VIcon :size="18" :icon="tab.icon" class="me-1" />
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
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>

        <VWindowItem>
          <UserTabseguranca />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

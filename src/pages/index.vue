<script setup>
import CrmActivityTimeline from "@/views/dashboards/CrmActivityTimeline.vue"
import CrmBrowserStates from "@/views/dashboards/CrmBrowserStates.vue"
import CrmRecentTransactions from "@/views/dashboards/CrmRecentTransactions.vue"
import SobreNos from "@/views/dashboards/EcommerceCongratulationsJohn.vue"

const simpleStatisticsDemoCards = [
  {
    icon: "tabler-currency-dollar",
    color: "info",
    title: "Cursos Superiores",
    subTitle: "Last week",
    stat: "1.28k",
    change: "ver cursos",
  },
  {
    icon: "tabler-chart-bar",
    color: "success",
    title: "Cursos Medios",
    subTitle: "Last week",
    stat: "$4,673",
    change: "ver cursos",
  },
  {
    icon: "tabler-currency-dollar",
    color: "primary",
    title: "Ensino Superior",
    subTitle: "Last week",
    stat: "1.28k",
    change: "ver faculdades",
  },
  {
    icon: "tabler-chart-bar",
    color: "info",
    title: "Ensino Superior",
    subTitle: "Last week",
    stat: "$4,673",
    change: "ver institutos",
  },
  {
    icon: "tabler-currency-dollar",
    color: "warning",
    title: "Exames Superior",
    subTitle: "Last week",
    stat: "1.28k",
    change: "buscar exames",
  },
  {
    icon: "tabler-chart-bar",
    color: "info",
    title: "Exames Medios",
    subTitle: "Last week",
    stat: "$4,673",
    change: "buscar exames",
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Congratulation John -->
    <VCol>
      <SobreNos />
    </VCol>
  </VRow>
  <VRow class="match-height">
    <VCol
      v-for="demo in simpleStatisticsDemoCards"
      :key="demo.title"
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <VCard>
        <VCardText>
          <h4
            :color="demo.color"
            variant="tonal"
            rounded
            size="42"
          >
            {{ demo.title }}
          </h4>
          <p class="text-sm text-disabled my-1 mb-0">
            {{ demo.subTitle }}
          </p>
          <p class="mb-3">
            {{ demo.stat }}
          </p>
          <VBtn
            :color="demo.color"
            onclick="window.print()"
          >
            {{ demo.change }}
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow class="match-height">
    <!-- 👉 Browser States -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmBrowserStates />
    </VCol>

    <!-- 👉 Browser States -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmBrowserStates />
    </VCol>

    <!-- 👉 Browser States -->
    <VCol
      cols="12"
      md="4"
    >
      <CrmBrowserStates />
    </VCol>
  </VRow>
  <VRow class="match-height">
    <!-- 👉 Recent Transactions -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmRecentTransactions />
    </VCol>

    <!-- 👉 Active timeline -->
    <VCol
      cols="12"
      md="6"
    >
      <CrmActivityTimeline />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>

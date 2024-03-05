<script setup>
import CrmActivityTimeline from "@/views/dashboards/CrmActivityTimeline.vue"

import Utilizador from "./Utilizador.vue"

const simpleStatisticsDemoCards = [
  {
    icon: "tabler-arrow-up",
    color: "info",
    title: "Emprestimos Relaizados",
  
    stat: "200",
  },
  {
    icon: "tabler-arrow-down",
    color: "success",
    title: "Devolucoes Sem atraso",
    stat: "199",
  
  },
  {
    icon: "tabler-currency-dollar",
    color: "primary",
    title: "Dinheiro Ganho com Multas",
    stat: "25",
  
  },
  {
    icon: "tabler-chart-bar",
    color: "info",
    title: "Movimentos Realizados",
    stat: "400",
  
  },
]

// Images
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VRow class="match-height">
        <VCol
          v-for="demo in simpleStatisticsDemoCards"
          :key="demo.title"
          cols="12"
          sm="4"
          md="3"
          lg="3"
        >
          <VCard>
            <VCardText>
              <span
                :color="demo.color"
                variant="tonal"
                rounded
                size="42"
              >
                {{ demo.title }}
              </span>
              <p class="mt-3 mb-0 text-h2 text-center">
                {{ demo.stat }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12">
      <CrmActivityTimeline />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>

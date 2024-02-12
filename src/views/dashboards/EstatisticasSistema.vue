<script setup>
const statistics = [
  {
    title: "Cursos",
    stats: "230",
    icon: "tabler-chart-pie-2",
    color: "primary",
  },
  {
    title: "Institutos",
    stats: "56",
    icon: "tabler-users",
    color: "info",
  },
  {
    title: "Universidades",
    stats: "43",
    icon: "tabler-shopping-cart",
    color: "error",
  },
  {
    title: "Exames de Admissão",
    stats: "199",
    icon: "tabler-currency-dollar",
    color: "success",
  },
]
</script>

<template>
  <VCard title="Conteúdos Disponíveis no Sistema">
    <template #append>
      <span class="text-sm text-disabled">...</span>
    </template>

    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex align-center gap-4">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
            >
              <VIcon :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-h5 font-weight-medium">{{ item.stats }}</span>
              <span class="text-sm">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

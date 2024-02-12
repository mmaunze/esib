<script setup>
const isCreateAppVisible = ref(false)

</script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <VCard class="text-high-emphasis text-center">
        <VCardItem class="d-flex flex-column gap-2">
          <template #prepend>
            <VIcon
              size="34"
              icon="tabler-box"
            />
          </template>
          <VCardTitle>Create App</VCardTitle>
        </VCardItem>

        <VCardText>
          <p class="text-base clamp-text">
            Provide application data with this form to create the app dialog popup example, easy to use in any page.
          </p>

          <VBtn @click="isCreateAppVisible = !isCreateAppVisible">
            Fazer Exame
          </VBtn>
        </VCardText>
      </VCard>
      <CreateAppDialog v-model:is-dialog-visible="isCreateAppVisible" />
    </VCol>
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }
}
</style>

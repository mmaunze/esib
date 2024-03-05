<script setup>
import Pagamentos from "@/views/pages/definicoes/Pagamentos.vue"
</script>

<template>
  <VCard class="user-tab-notification">
    <VCardItem>
      <VCardTitle>Emprestimos do Utilizador</VCardTitle>
    </VCardItem>
    <VCol cols="12">
      <!-- 👉 User List  -->
      <Pagamentos />
    </VCol>
  </VCard>
</template>

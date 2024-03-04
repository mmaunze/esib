<script setup>
import HelpCenterLandingArticlesOverview from "@/views/pages/ajuda/HelpCenterLandingArticlesOverview.vue"
import HelpCenterLandingFooter from "@/views/pages/ajuda/HelpCenterLandingFooter.vue"
import HelpCenterLandingKnowledgeBase from "@/views/pages/ajuda/HelpCenterLandingKnowledgeBase.vue"
import axios from "@axios"

const apiData = ref()

// fetching data from the @fake-db
const fetchHelpCenterData = () => {
  return axios.get("/pages/ajuda/landing").then(res => {
    apiData.value = res.data
  })
}

fetchHelpCenterData()
</script>

<template>
  <VCard v-if="apiData">
    <AppSearchHeader
      title="Bem vindo, como podemos ajudar ?"
      subtitle="Common troubleshooting topics: eCommerce, Blogging to payment"
      custom-class="rounded-0"
    />

    <!-- 👉 Artigos Populares -->
    <VCardText class="py-12">
      <h5 class="text-h3 text-center my-6">
        Artigos Populares
      </h5>

      <HelpCenterLandingArticlesOverview :articles="apiData.popularArticles" />
    </VCardText>

    <!-- 👉 Base de Conhecimento -->
    <div>
      <VCardText class="bg-var-theme-background py-12">
        <h5 class="text-h3 text-center my-6">
          Base de Conhecimento
        </h5>

        <HelpCenterLandingKnowledgeBase :categories="apiData.categories" />
      </VCardText>
    </div>

    <!-- 👉 Keep Learning -->
    <VCardText class="py-12">
      <h5 class="text-h3 text-center my-6">
        Keep Learning
      </h5>

      <HelpCenterLandingArticlesOverview :articles="apiData.keepLearning" />
    </VCardText>

    <!-- 👉 Ainda Precisa de Ajuda ? -->
    <HelpCenterLandingFooter />
  </VCard>
</template>

<script setup>
import { VIcon } from 'vuetify/components/VIcon'
import sliderBar1 from '@images/illustrations/sidebar-pic-1.png'
import sliderBar2 from '@images/illustrations/sidebar-pic-2.png'
import sliderBar3 from '@images/illustrations/sidebar-pic-3.png'

const websiteAnalytics = [
  {
    name: 'Cursos',
    slideImg: sliderBar1,
    data: [
      {
        number: '0',
        text: 'Cursos de Saude',
      },
      {
        number: '0',
        text: 'Curso de Letras',
      },
      {
        number: '0',
        text: 'Cursos de Ciencias',
      },
      {
        number: '0',
        text: 'Cursos de Administracao e Gestao',
      },
      
    ],
  },
  {
    name: 'Exames',
    slideImg: sliderBar2,
    data: [
      {
        number: '0',
        text: 'Cursos de Saude',
      },
      {
        number: '0',
        text: 'Curso de Letras',
      },
      {
        number: '0',
        text: 'Cursos de Ciencias',
      },
      {
        number: '0',
        text: 'Cursos de Administracao e Gestao',
      },
      
    ],
  },
  {
    name: 'Instituicoes de Ensino',
    slideImg: sliderBar3,
    data: [
      {
        number: '0',
        text: 'Cursos de Saude',
      },
      {
        number: '0',
        text: 'Curso de Letras',
      },
      {
        number: '0',
        text: 'Cursos de Ciencias',
      },
      {
        number: '0',
        text: 'Cursos de Administracao e Gestao',
      },
      
    ],
  },
]
</script>

<template>
  <VCard color="primary">
    <VCarousel
      cycle
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      :delimiter-icon="() => h(VIcon, { icon: 'fa-circle', size: '10' })"
      height="auto"
      class="carousel-delimiter-top-end web-analytics-carousel"
    >
      <VCarouselItem
        v-for="item in websiteAnalytics"
        :key="item.name"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <h5 class="text-h5 text-white mb-1">
                Prefaculdade
              </h5>
              <p class="text-sm mb-0">
                Sistema de Orientação Vocacional e Profissional
              </p>
            </VCol>

            <VCol
              cols="12"
              sm="6"
              order="2"
              order-sm="1"
            >
              <VRow>
                <VCol
                  cols="12"
                  class="pb-0 pt-1"
                >
                  <p class="font-weight-medium mb-1">
                    {{ item.name }}
                  </p>
                </VCol>

                <VCol
                  v-for="d in item.data"
                  :key="d.number"
                  cols="6"
                  class="text-no-wrap pb-2"
                >
                  <VChip
                    label
                    variant="flat"
                    size="default"
                    color="#685ED8"
                    class="font-weight-medium text-white rounded me-2"
                  >
                    {{ d.number }}
                  </VChip>
                  <span>{{ d.text }}</span>
                </VCol>
              </VRow>
            </VCol>

            <VCol
              cols="12"
              sm="6"
              order="1"
              order-sm="2"
              class="position-relative text-center"
            >
              <img
                :src="item.slideImg"
                class="card-website-analytics-img"
                style="filter: drop-shadow(0 4px 40px rgba(0, 0, 0, 40%));"
              >
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style lang="scss">
.card-website-analytics-img {
  block-size: 150px;
}

@media screen and (min-width: 600px) {
  .card-website-analytics-img {
    position: absolute;
    margin: auto;
    inset-block-end: 40px;
    inset-block-start: -1rem;
    inset-inline-end: 1rem;
  }
}

.web-analytics-carousel {
  .v-carousel__controls {
    .v-btn:not(.v-btn--active) {
      opacity: 0.4;
    }
  }
}
</style>

<script setup>
import { paginationMeta } from "@/@fake-db/utils"
import AddNewMonografiaDrawer from "@/views/obras/monografias/AddNewMonografiaDrawer.vue"
import { useMonografiaListStore } from "@/views/obras/monografias/useMonografiaListStore"

// Dados

const listaMonografias = useMonografiaListStore()

const searchQuery = ref("")
const selectedFaculdade = ref()
const selectedEstado = ref()
const selectedAreaCientifica = ref()
const totalPage = ref(1)
const totalMonografias = ref(0)
const monografias = ref([])

// 👉 Estatisticas
const userListMeta = [
  {
    icon: "tabler-book",
    color: "primary",
    title: "Livros Academicos",
    stats: "459",
  },
  {
    icon: "tabler-book-2",
    color: "error",
    title: "Monografia",
    stats: "163",
  },
  {
    icon: "tabler-library",
    color: "success",
    title: "Revistas",
    stats: "87",
  },
  {
    icon: "tabler-book",
    color: "warning",
    title: "Livros Literarios",
    stats: "237",
  },
]

// 👉 search filters
//******* Tipos de Obras ********/

const faculdades = [
  {
    title: "Faculdade de Engenharia",
    value: "Faculdade de Engenharia",
  },
  {
    title: "Faculdade de Ciencias de Saude",
    value: "Faculdade de Ciencias de Saude",
  },
  {
    title: "Faculdade de Ciencias Naturais",
    value: "Faculdade de Ciencias Naturais",
  },
  {
    title: "Faculdade de Arquitectura e Planeamento Fisico",
    value: "Faculdade de Arquitectura e Planeamento Fisico",
  },
  {
    title: "Faculdade de Ciências Sociais e Humanas",
    value: "Faculdade de Ciências Sociais e Humanas",
  },
  {
    title: "Escola Superior de Negócios - UniLúrio Business School",
    value: "Escola Superior de Negócios - UniLúrio Business School",
  },
  {
    title: "Faculdade de Ciências Agrárias",
    value: "Faculdade de Ciências Agrárias",
  },
]

//******* Estados *********/

const estados = [
  {
    title: "Disponível",
    value: "Disponível",
  },
  {
    title: "Emprestado",
    value: "Emprestado",
  },
  {
    title: "Reservado",
    value: "Reservado",
  },
]

//****** Area Cientificas *********/

const areaCientifica = [
  {
    title: "Filosofia",
    value: "Filosofia",
  },
  {
    title: "Engenharia",
    value: "Engenharia",
  },
  {
    title: "Química",
    value: "Quimica",
  },
  {
    title: "Biologia",
    value: "Biologia",
  },
  {
    title: "Matemática",
    value: "Matematica",
  },
  {
    title: "Ciências Sociais",
    value: "CienciasSociais",
  },
  {
    title: "Medicina",
    value: "Medicina",
  },
  {
    title: "Informática",
    value: "Informatica",
  },
  {
    title: "Psicologia",
    value: "Psicologia",
  },
  {
    title: "Economia",
    value: "Economia",
  },
  {
    title: "Arquitetura",
    value: "Arquitetura",
  },
  {
    title: "História",
    value: "Historia",
  },
  {
    title: "Geografia",
    value: "Geografia",
  },
  {
    title: "Arte",
    value: "Arte",
  },
  {
    title: "Educação",
    value: "Educacao",
  },
  {
    title: "Biomedicina",
    value: "Biomedicina",
  },
  {
    title: "Engenharia Civil",
    value: "EngenhariaCivil",
  },
  {
    title: "Arqueologia",
    value: "Arqueologia",
  },
  {
    title: "Sociologia",
    value: "Sociologia",
  },
  {
    title: "Nutrição",
    value: "Nutricao",
  },
  {
    title: "Farmácia",
    value: "Farmacia",
  },
  {
    title: "Linguística",
    value: "Linguistica",
  },
  {
    title: "Ciência da Computação",
    value: "CienciaDaComputacao",
  },
  {
    title: "Administração",
    value: "Administracao",
  },
  {
    title: "Comunicação Social",
    value: "ComunicacaoSocial",
  },
  {
    title: "Bioquímica",
    value: "Bioquimica",
  },
  {
    title: "Engenharia Elétrica",
    value: "EngenhariaEletrica",
  },
  {
    title: "Antropologia",
    value: "Antropologia",
  },
  {
    title: "Ciências Ambientais",
    value: "CienciasAmbientais",
  },
  {
    title: "Artes Visuais",
    value: "ArtesVisuais",
  },
  {
    title: "Literatura",
    value: "Literatura",
  },
  {
    title: "Ciências Políticas",
    value: "CienciasPoliticas",
  },
  {
    title: "Geologia",
    value: "Geologia",
  },
  {
    title: "Física Quântica",
    value: "FisicaQuantica",
  },
  {
    title: "Engenharia Mecânica",
    value: "EngenhariaMecanica",
  },
  {
    title: "Física",
    value: "Fisica",
  },
]

const options = ref({
  page: 1,
  itemsPerPage: 8,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Funcoes

// 👉 Fetching users
const buscarMonografias = () => {
  listaMonografias
    .fetchMonografias({
      q: searchQuery.value,
      areaCientifica: selectedAreaCientifica.value,
      estado: selectedEstado.value,
      faculdade: selectedFaculdade.value,
      options: options.value,
    })
    .then(response => {
      monografias.value = response.data.monografias
      totalPage.value = response.data.totalPage
      totalMonografias.value = response.data.totalMonografias
      options.value.page = response.data.page
    })
    .catch(error => {
      console.error(error)
    })
}

const addNewMonografia = monografiaData => {
  listaMonografias.addMonografia(monografiaData)

  // refetch User
  buscarMonografias()
}

const deleteMonografia = id => {
  listaMonografias.deleteMonografia(id)

  // refetch User
  buscarMonografias()
}

watchEffect(buscarMonografias)

function administrador() {
  return true
}

const resolveFaculdadeVariant = faculdade => {
  const tipoUtilizadorLowerCase = faculdade //  tipoObra.toLowerCase()
  if (tipoUtilizadorLowerCase === "Faculdade de Ciências Agrárias")
    return {
      color: "primary",
      icon: "tabler-circle-check",
    }
  if (
    tipoUtilizadorLowerCase ===
    "Escola Superior de Negócios - UniLúrio Business School"
  )
    return {
      color: "info",
      icon: "tabler-user",
    }
  if (tipoUtilizadorLowerCase === "Faculdade de Engenharia")
    return {
      color: "warning",
      icon: "tabler-chart-pie-2",
    }
  if (tipoUtilizadorLowerCase === "Faculdade de Ciências Sociais e Humanas")
    return {
      color: "error",
      icon: "tabler-edit",
    }
  if (tipoUtilizadorLowerCase === "Faculdade de Ciencias Naturais")
    return {
      color: "success",
      icon: "tabler-edit",
    }

  return {
    color: "primary",
    icon: "tabler-user",
  }
}

const resolveUserareaCientificaVariant = areaCientifica => {
  const statLowerCase = areaCientifica.toLowerCase()
  if (statLowerCase == "Economia") return "success"
  if (statLowerCase === "biologia") return "waring"
  if (statLowerCase === "quimica") return "info"

  return "error"
}

const resolvEstadoVariant = estado => {
  const statLowerCase = estado.toLowerCase()
  if (statLowerCase == "Disponível") return "success"
  if (statLowerCase === "Reservado") return "waring"
  if (statLowerCase === "Emprestado") return "error"

  return "info"
}

const isAddNewMonografiaDrawerVisible = ref(false)
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="meta in userListMeta"
        :key="meta.title"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <span>{{ meta.title }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h4">
                  {{ meta.stats }}
                </h6>
              </div>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Pesquisar monografias">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select tipoUtilizador -->
              <VCol
                cols="12"
                sm="4"
              >
                <VAutocomplete
                  v-model="selectedFaculdade"
                  label="Seleccionar faculdade "
                  :items="faculdades"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select departamento -->
              <VCol
                cols="12"
                sm="4"
              >
                <VAutocomplete
                  v-model="selectedEstado"
                  label="Seleccionar o estado da obra"
                  :items="estados"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select areaCientifica -->
              <VCol
                cols="12"
                sm="4"
              >
                <VAutocomplete
                  v-model="selectedAreaCientifica"
                  label="Seleccionar a area cientifica"
                  :items="areaCientifica"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="me-3 d-flex gap-3">
              <AppSelect
                :model-value="options.itemsPerPage"
                :items="[
                  { value: 8, title: '8' },
                  { value: 24, title: '24' },
                  { value: 48, title: '48' },
                  { value: 96, title: '96' },
                  { value: -1, title: 'Ver Todos' },
                ]"
                style="width: 6.25rem"
                @update:model-value="options.itemsPerPage = parseInt($event, 8)"
              />
            </div>
            <VSpacer />

            <div class="utilizadores-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 1rem">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Pesquisar monografias"
                  density="compact"
                />
              </div>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewMonografiaDrawerVisible = true"
              >
                Cadastrar monografia
              </VBtn>
            </div>
          </VCardText>

          <VDivider />
        </VCard>

        <!-- SECTION -->
        <section class="mt-7">
          <VRow text-align="center">
            <VCol
              v-for="monografia in monografias"
              :key="monografia.id"
              cols="12"
              sm="6"
              md="3"
              lg="4"
            >
              <VCard class="mb-3">
                <VCardTitle class="mb-4 mt-2 text-wrap">
                  {{ monografia.titulo }}
                </VCardTitle>

                <VImg
                  :src="monografia.fotografia"
                  aspect-ratio="2"
                />

                <!--
                  <span
                  v-else
                  class="text-9xl"
                  >{{ avatarText(user.nome) }}</span> 
                -->

                <VCardText>
                  <div class="d-flex align-center gap-4 text-wrap">
                    <VBtn
                      :color="
                        resolveFaculdadeVariant(monografia.faculdade).color
                      "
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ monografia.faculdade }}
                    </VBtn>
                  </div>
                  <VBtn
                    :color="resolvEstadoVariant(monografia.estado)"
                    variant="tonal"
                    size="small"
                    label
                    class="mb-3"
                  >
                    {{ monografia.estado }}
                  </VBtn>
                  <p class="font-weight-small text-justify">
                    Esta Monografia do curso de
                    <b>{{ monografia.curso }}</b> tem
                    {{ monografia.nrPaginas }} paginas, supervisionado por
                    <b>{{
                      monografia.supervisor + " ; " + monografia.coSupervisor
                    }}</b>
                    publcado no ano de {{ monografia.anoPublicacao }},
                    {{ monografia.faculdade }}
                    <Strong>
                      <br>
                      Autor </Strong>: {{ monografia.autores }}
                    <Strong>
                      <br>
                      Idioma</Strong>: {{ monografia.idioma }}
                    <Strong>
                      <br>
                      Localizacao </Strong>: {{ monografia.localizacao }}
                  </p>
                </VCardText>

                <VCardText
                  v-if="administrador()"
                  class="text-center"
                >
                  <VBtn
                    style="margin-right: 1rem"
                    size="small"
                    color="error"
                    @click="deleteMonografia(monografia.id)"
                  >
                    Remover
                  </VBtn>
                  <VBtn
                    style="margin-left: 1rem"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'utilizadores-utilizador-id',
                      params: { id: monografia.id },
                    }"
                  >
                    Detalhes
                  </VBtn>
                </VCardText>

                <VCardText
                  v-else
                  class="text-center"
                >
                  <VBtn
                    style="margin-right: 1.2rem"
                    size="small"
                    color="success"
                    @click="deleteMonografia(monografia.id)"
                  >
                    Reservar
                  </VBtn>
                  <VBtn
                    style="margin-left: 1.2rem"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'utilizadores-utilizador-id',
                      params: { id: monografia.id },
                    }"
                  >
                    Detalhes
                  </VBtn>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>

          <!-- pagination -->
          <VDivider />

          <div>
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta(options, totalMonografias) }}
            </p>
            <VPagination
              v-model="options.page"
              :length="Math.ceil(totalMonografias / options.itemsPerPage)"
              :total-visible="
                $vuetify.display.xs
                  ? 1
                  : Math.ceil(totalMonografias / options.itemsPerPage)
              "
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  <VIcon>tabler-chevron-left</VIcon>
                </VBtn>
              </template>
              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  <VIcon>tabler-chevron-right</VIcon>
                </VBtn>
              </template>
            </VPagination>
          </div>
        </section>
        <!-- SECTION -->

        <!-- 👉 Add New User -->
        <AddNewMonografiaDrawer
          v-model:isDrawerOpen="isAddNewMonografiaDrawerVisible"
          @user-data="addNewMonografia"
        />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.utilizadores-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>

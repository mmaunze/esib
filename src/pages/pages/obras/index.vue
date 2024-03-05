<script setup>
import { paginationMeta } from "@/@fake-db/utils"
import AddNewObraDrawer from "@/views/pages/obras/AddNewObraDrawer.vue"
import { useObraListStore } from "@/views/pages/obras/useObraListStore"
import { avatarText } from "@core/utils/formatters"

// Dados 

const listaObras = useObraListStore()

const searchQuery = ref("")
const selectedTipoObra = ref()
const selectedEstado = ref()
const selectedAreaCientifica = ref()
const totalPage = ref(1)
const totalObras = ref(0)
const obras = ref([])

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
const tipoObras = [
  {
    title: "Livro Academico",
    value: "Livro Academico",
  },
  {
    title: "Monografia",
    value: "Monografia",
  },
  {
    title: "Revista",
    value: "Revista",
  },
  {
    title: "Livro Literario",
    value: "Livro Literario",
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
  itemsPerPage: 6,
  sortBy: [],
  groupBy: [],
  search: undefined,
})


// Funcoes

// 👉 Fetching users
const buscarObras = () => {
  listaObras
    .fetchObras({
      q: searchQuery.value,
      areaCientifica: selectedAreaCientifica.value,
      estado: selectedEstado.value,
      tipoObra: selectedTipoObra.value,
      options: options.value,
    })
    .then(response => {
      obras.value = response.data.obras
      totalPage.value = response.data.totalPage
      totalObras.value = response.data.totalObras
      options.value.page = response.data.page
    })
    .catch(error => {
      console.error(error)
    })
}

const addNewObra = obraData => {
  listaObras.addObra(obraData)

  // refetch User
  buscarObras()
}

const deleteObra = id => {
  listaObras.deleteObra(id)

  // refetch User
  buscarObras()
}

watchEffect(buscarObras)

function administrador() {
  return true
}

const resolveTipoObraVariant = tipoObra => {
  const tipoUtilizadorLowerCase = tipoObra //  tipoObra.toLowerCase()
  if (tipoUtilizadorLowerCase === "Revista")
    return {
      color: "primary",
      icon: "tabler-circle-check",
    }
  if (tipoUtilizadorLowerCase === "Monografia")
    return {
      color: "info",
      icon: "tabler-user",
    }
  if (tipoUtilizadorLowerCase === "Livro Academico")
    return {
      color: "warning",
      icon: "tabler-chart-pie-2",
    }
  if (tipoUtilizadorLowerCase === "Livro Literario")
    return {
      color: "error",
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

const isAddNewObraDrawerVisible = ref(false)
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
        <VCard title="Pesquisar Uma Obra">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select tipoUtilizador -->
              <VCol
                cols="12"
                sm="4"
              >
                <VAutocomplete
                  v-model="selectedTipoObra"
                  label="Seleccionar tipo de obra "
                  :items="tipoObras"
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
                style="width: 6.25rem;"
                @update:model-value="
                  options.itemsPerPage = parseInt($event, 8)
                "
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem;">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Pesquisar Obras"
                  density="compact"
                />
              </div>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewObraDrawerVisible = true"
              >
                Cadastrar Obra
              </VBtn>
            </div>
          </VCardText>

          <VDivider />
        </VCard>

        
        <!-- SECTION -->
        <section class="mt-7">
          <VRow text-align="center">
            <VCol
              v-for="user in obras"
              :key="user.id"
              cols="12"
              sm="6"
              md="3"
              lg="4"
            >
              <VCard class="mb-3">
                <VCardTitle class="mb-4 mt-2 text-wrap">
                  {{ user.titulo }}
                </VCardTitle>

                <VImg
                  :src="user.fotografia"
                  aspect-ratio="2"
                />
                  
                <!--
                  <span
                  v-else
                  class="text-9xl"
                  >{{ avatarText(user.nome) }}</span> 
                -->

                <VCardText>
                  <div class="d-flex align-center gap-4">
                    <VBtn
                      :color="resolveTipoObraVariant(user.tipoObra).color"
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.tipoObra }}
                    </VBtn>
                    <VBtn
                      :color="resolvEstadoVariant(user.estado)"
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.estado }}
                    </VBtn>
                  </div>
                  <p class="font-weight-small">
                    A obra tem {{ user.nrPaginas }} Paginas, publicada em {{ user.localPublicacao }} no ano de {{ user.anoPublicacao }}
                    <Strong> <br> Autor(es) </Strong>: {{ user.autores }}
                    <Strong> <br> Idioma</Strong>: {{ user.idioma }}
                    <Strong> <br> Referencia</Strong>: {{ user.referencia }}
                    <Strong> <br> Localizacao </Strong>: {{ user.localizacao }}
                  </p>
                  Area Cientifica:
                  <VChip
                    :color="resolveUserareaCientificaVariant(user.areaCientifica)"
                    size="small"
                    label
                    class="text-capitalize"
                  >
                    {{ user.areaCientifica }}
                  </VChip>
                </VCardText>

                
                <VCardText
                  v-if="administrador()"
                  class="text-center"
                >
                  <VBtn
                    style="margin-right: 0.25rem;"
                    size="small"
                    color="error"
                    @click="deleteObra(user.id)"
                  >
                    Remover
                  </VBtn>
                  <VBtn
                    style="margin-left: 0.25rem;"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'apps-user-view-id',
                      params: { id: user.id },
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
                    style="margin-right: 0.25rem;"
                    size="small"
                    color="success"
                    @click="deleteObra(user.id)"
                  >
                    Reservar
                  </VBtn>
                  <VBtn
                    style="margin-left: 0.25rem;"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'apps-user-view-id',
                      params: { id: user.id },
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
              {{ paginationMeta(options, totalObras) }}
            </p>
            <VPagination
              v-model="options.page"
              :length="Math.ceil(totalObras / options.itemsPerPage)"
              :total-visible="
                $vuetify.display.xs
                  ? 1
                  : Math.ceil(totalObras / options.itemsPerPage)
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
        <AddNewObraDrawer
          v-model:isDrawerOpen="isAddNewObraDrawerVisible"
          @user-data="addNewObra"
        />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>

<script setup>
import { paginationMeta } from "@/@fake-db/utils"
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue"
import { useUserListStore } from "@/views/apps/user/useUserListStore"
import { avatarText } from "@core/utils/formatters"

const listaUtilizadores = useUserListStore()

const searchQuery = ref("")
const selectedTipoUtilizador = ref()
const selectedDepartamento = ref()
const selectedAreaCientifica = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const utilizadores = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 8,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// 👉 Fetching users
const buscarUtilizadores = () => {
  listaUtilizadores
    .fetchUsers({
      q: searchQuery.value,
      areaCientifica: selectedAreaCientifica.value,
      departamento: selectedDepartamento.value,
      tipoUtilizador: selectedTipoUtilizador.value,
      options: options.value,
    })
    .then(response => {
      utilizadores.value = response.data.users
      totalPage.value = response.data.totalPage
      totalUsers.value = response.data.totalUsers
      options.value.page = response.data.page
    })
    .catch(error => {
      console.error(error)
    })
}

watchEffect(buscarUtilizadores)

// 👉 search filters
const tipoUtilizadors = [
  {
    title: "Administrador",
    value: "administrador",
  },
  {
    title: "Bibliotecario",
    value: "bibliotecario",
  },
  {
    title: "Estudante",
    value: "estudante",
  },
  {
    title: "Docente",
    value: "docente",
  },
  {
    title: "Cta",
    value: "cta",
  },
]

const departamentos = [
  {
    title: "Departamento de Engenharia Informatica",
    value: "DEI",
  },
  {
    title: "Departamento de Engenharia Mecanica",
    value: "DEM",
  },
  {
    title: "Departamento de Engenharia Geologica",
    value: "DEG",
  },
  {
    title: "Departamento de Engenharia Civil",
    value: "DEC",
  },
]

function administrador() {
  return true
}

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


const resolveUsertipoUtilizadorVariant = tipoUtilizador => {
  const tipoUtilizadorLowerCase = tipoUtilizador.toLowerCase()
  if (tipoUtilizadorLowerCase === "cta")
    return {
      color: "primary",
      icon: "tabler-circle-check",
    }
  if (tipoUtilizadorLowerCase === "bibliotecario")
    return {
      color: "info",
      icon: "tabler-user",
    }
  if (tipoUtilizadorLowerCase === "docente")
    return {
      color: "warning",
      icon: "tabler-chart-pie-2",
    }
  if (tipoUtilizadorLowerCase === "estudante")
    return {
      color: "error",
      icon: "tabler-edit",
    }
  if (tipoUtilizadorLowerCase === "Administrador")
    return {
      color: "success",
      icon: "tabler-device-laptop",
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

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  listaUtilizadores.addUser(userData)

  // refetch User
  buscarUtilizadores()
}

// 👉 List
const userListMeta = [
  {
    icon: "tabler-user",
    color: "primary",
    title: "Estudantes",
    stats: "710",
   
  
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Docentes",
    stats: "134",
   
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Bibliotecarios",
    stats: "19",
   
  },
  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "CTA",
    stats: "76",
   
  },
]

const deleteUser = id => {
  listaUtilizadores.deleteUser(id)

  // refetch User
  buscarUtilizadores()
}
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
        <VCard title="Pesquisar Utilizador">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select tipoUtilizador -->
              <VCol
                cols="12"
                sm="4"
              >
                <VAutocomplete
                  v-model="selectedTipoUtilizador"
                  label="Seleccionar tipo de Utilizador "
                  :items="tipoUtilizadors"
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
                  v-model="selectedDepartamento"
                  label="Seleccionar o Departamento"
                  :items="departamentos"
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
                  label="Seleccionar a Area Cientifica"
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
                  options.itemsPerPage = parseInt($event, 10)
                "
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem;">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Cadastrar Utilizador
              </VBtn>
            </div>
          </VCardText>

          <VDivider />
        </VCard>

        
        <!-- SECTION -->
        <section class="mt-7">
          <VRow text-align="center">
            <VCol
              v-for="user in utilizadores"
              :key="user.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <VCard class="mb-3">
                <VCardTitle class="mb-4 mt-2">
                  {{ user.nome }}
                </VCardTitle>

                <VImg
                  :src="user.avatar"
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
                    <span
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.sexo }}
                    </span>
                    <VBtn
                      :color="resolveUsertipoUtilizadorVariant(user.tipoUtilizador).color"
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.tipoUtilizador }}
                    </VBtn>
                    <VBtn
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.departamento }}
                    </VBtn>
                  </div>
                  <p class="font-weight-small">
                    <br> {{ user.contacto }}
                    <br> {{ user.email }}
                  </p>
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
                    @click="deleteUser(user.id)"
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
                    @click="deleteUser(user.id)"
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
              {{ paginationMeta(options, totalUsers) }}
            </p>
            <VPagination
              v-model="options.page"
              :length="Math.ceil(totalUsers / options.itemsPerPage)"
              :total-visible="
                $vuetify.display.xs
                  ? 1
                  : Math.ceil(totalUsers / options.itemsPerPage)
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
        <AddNewUserDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewUser"
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

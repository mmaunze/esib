<script setup>
import utilizadores from "@/@fake-db/apps/user-list"
import { paginationMeta } from "@/@fake-db/utils"
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue"
import { useUserListStore } from "@/views/apps/user/useUserListStore"


const livro = {
  titulo: "titulo",
  autores: "autores",
  nrPaginas: 10,
  localPublicacao: "localPublicacao",
  anoPublicacao: 2020,
  idioma: "idioma",
  estado: "estado",
  areaCientifica: "areaCientifica",
  fotografia: "fotografia",
  editora: "editora",
  isbn: "isbn",
  edicao: 2,
  volume: 1,
}


const usuario = JSON.parse(localStorage.getItem("userData"))

const Id = Number(usuario.id)
const userIndex = utilizadores.findIndex(e => e.id === Id)
const userData = utilizadores[userIndex]

const userListStore = useUserListStore() // lista de obras

const searchQuery = ref("")
const selectedtipoUtilizador = ref()
const selecteddepartamento = ref()
const selectedareaCientifica = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 8,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

function administrador() {
  return userData.tipoUtilizador.toLowerCase() === "administrador"
}

// 👉 Fetching users
const fetchUsers = () => {
  userListStore
    .fetchUsers({
      q: searchQuery.value,
      areaCientifica: selectedareaCientifica.value,
      departamento: selecteddepartamento.value,
      tipoUtilizador: selectedtipoUtilizador.value,
      options: options.value,
    })
    .then(response => {
      users.value = response.data.users
      totalPage.value = response.data.totalPage
      totalUsers.value = response.data.totalUsers
      options.value.page = response.data.page
    })
    .catch(error => {
      console.error(error)
    })
}

watchEffect(fetchUsers)

// 👉 search filters
const tipoUtilizadors = [
  {
    title: "Administrador",
    value: "Administrador",
  },
  {
    title: "Bibliotecario",
    value: "Bibliotecario",
  },
  {
    title: "Estudante",
    value: "Estudante",
  },
  {
    title: "Docente",
    value: "Docente",
  },
  {
    title: "Outros Funcionarios",
    value: "Cta",
  },
]

const departamentos = [
  {
    title: "Disponivel",
    value: "basic",
  },
  {
    title: "Ecologia Marinha",
    value: "Ecologia Marinha",
  },
  {
    title: "Fisica",
    value: "Fisica",
  },
  {
    title: "Com multa",
    value: "team",
  },
]

const areaCientifica = [
  {
    title: "Livro",
    value: "privado",
  },
  {
    title: "Monografia",
    value: "active",
  },
  {
    title: "Revista",
    value: "inactive",
  },
]

const resolveUsertipoUtilizadorVariant = tipoUtilizador => {
  const tipoUtilizadorLowerCase = tipoUtilizador.toLowerCase()
  if (tipoUtilizadorLowerCase === "cta")
    return {
      color: "warning",
      icon: "tabler-circle-check",
    }
  if (tipoUtilizadorLowerCase === "estudante")
    return {
      color: "success",
      icon: "tabler-user",
    }
  if (tipoUtilizadorLowerCase === "docente")
    return {
      color: "primary",
      icon: "tabler-chart-pie-2",
    }
  if (tipoUtilizadorLowerCase === "bibliotecario")
    return {
      color: "info",
      icon: "tabler-edit",
    }
  if (tipoUtilizadorLowerCase === "administrador")
    return {
      color: "secondary",
      icon: "tabler-device-laptop",
    }

  return {
    color: "warning",
    icon: "tabler-user",
  }
}

const resolveUserareaCientificaVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === "privado") return "warning"
  if (statLowerCase === "active") return "success"
  if (statLowerCase === "inactive") return "secondary"

  return "success"
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

// 👉 List
const userListMeta = [
  {
    icon: "tabler-user",
    color: "primary",
    title: "Livros Academicos",
    stats: "981",
    subtitle: " ",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Monografias",
    stats: "342",
    subtitle: " ",
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Revistas",
    stats: "130",
    subtitle: " ",
  },

  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "Livros Literarios",
    stats: "237",
    subtitle: " ",
  },
]

const deleteUser = id => {
  userListStore.deleteUser(id)

  const Id = Number(id)
  const userIndex = utilizadores.findIndex(e => e.id === Id)
  const utili = utilizadores[userIndex]

  window.alert(
    " usuario \t " +
      utili.nome +
      " Removido \n as " +
      new Date() +
      "\n por " +
      userData.nome,
  )

  // refetch User
  fetchUsers()
}

const verCurso = id => {
  window.print()
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
          <VCardText class="d-flex align-center justify-space-between">
            <div>
              <span class="text-h6">{{ meta.title }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h4">
                  {{ meta.stats }}
                </h6>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard title="Pesquisar obra">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select tipoUtilizador -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedtipoUtilizador"
                  label="Selecionar Campo de Estudo"
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
                <AppSelect
                  v-model="selecteddepartamento"
                  label="Seleccionar Estado"
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
                <AppSelect
                  v-model="selectedareaCientifica"
                  label="Seleccionar Tipo de Obra"
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
                  { value: 4, title: '4' },
                  { value: 8, title: '8' },
                  { value: 24, title: '24' },
                  { value: 48, title: '48' },
                  { value: 98, title: '98' },
                  { value: -1, title: 'Ver tudo' },
                ]"
                style="width: 6.25rem"
                @update:model-value="options.itemsPerPage = parseInt($event)"
              />
            </div>

            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-5,">
              <!-- 👉 Search  -->
              <div style="inline-size: 16rem">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Pesquisar"
                  density="compact"
                />
              </div>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Adicionar nova obra
              </VBtn>
            </div>
          </VCardText>

          <VDivider />
        </VCard>
        <section class="mt-7">
          <VRow text-align="center">
            <VCol
              v-for="user in users"
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
                    <VBtn
                      :color="
                        resolveUsertipoUtilizadorVariant(user.tipoUtilizador)
                          .color
                      "
                      variant="tonal"
                      size="small"
                      label
                      class="mb-3"
                    >
                      {{ user.tipoUtilizador }}
                    </VBtn>
                  </div>
                  <span class="text-capitalize font-weight-medium">{{
                    "      " + user.departamento
                  }}</span>
                  <p
                    :color="
                      resolveUserareaCientificaVariant(user.areaCientifica)
                    "
                    size="small"
                    label
                    class="text-capitalize"
                  >
                    O curso de {{ user.nome }} pela {{ user.departamento }} eh
                    um curso de ensino superior que forma ...
                  </p>
                </VCardText>

                <VCardText
                  v-if="administrador()"
                  class="text-center"
                >
                  <VBtn
                    style="margin-right: 0.25rem"
                    size="small"
                    color="error"
                    @click="deleteUser(user.id)"
                  >
                    Remover
                  </VBtn>
                  <VBtn
                    style="margin-left: 0.25rem"
                    size="small"
                    color="primary"
                    @click="verCurso(user.id)"
                  >
                    Editar
                  </VBtn>
                </VCardText>

                <VCardText
                  v-else
                  class="text-center"
                >
                  <VBtn
                    style="margin-right: 0.25rem"
                    size="small"
                    color="success"
                    @click="deleteUser(user.id)"
                  >
                    Reservar
                  </VBtn>
                  <VBtn
                    style="margin-left: 0.25rem"
                    size="small"
                    color="primary"
                    @click="verCurso(user.id)"
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

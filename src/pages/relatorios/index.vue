<script setup>
import { paginationMeta } from "@/@fake-db/utils"
import AdicionarNovoCurso from "@/views/apps/user/list/AddNewUserDrawer.vue"
import { useUserListStore } from "@/views/apps/user/useUserListStore"
import { avatarText } from "@core/utils/formatters"
import { VDataTableServer } from "vuetify/labs/VDataTable"

const listaCursos = useUserListStore()
const termoPesquisa = ref("")
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPaginas = ref(1)
const totalCursos = ref(0)
const cursos = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 5,
  sortBy: [],
  groupBy: [],
  search: undefined,
})


// 👉 Fetching users
const fetchUsers = () => {
  listaCursos
    .fetchUsers({
      q: termoPesquisa.value,
      status: selectedStatus.value,
      plan: selectedPlan.value,
      role: selectedRole.value,
      options: options.value,
    })
    .then(response => {
      cursos.value = response.data.users
      totalPaginas.value = response.data.totalPage
      totalCursos.value = response.data.totalUsers
      options.value.page = response.data.page
    })
    .catch(error => {
      console.error(error)
    })
}

watchEffect(fetchUsers)


const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  listaCursos.addUser(userData)

  // refetch User
  fetchUsers()
}

// 👉 List
const userListMeta = [
  {
    icon: "tabler-user",
    color: "primary",
    title: "Utilizadores",
    stats: "176",
    subtitle: "Utilizadores Registados",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Obras",
    stats: "991",

    subtitle: "Obras Movimentadas sem Danos",
  },

  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "Movimentos",
    stats: "237",

    subtitle: "Movimentos Registados",
  },
  {
    icon: "tabler-user-exclamation",
    color: "error",
    title: "Multas",
    stats: "1625 MT",

    subtitle: "Dinheiro Ganhos com Multas",
  },
]

const deleteUser = id => {
  listaCursos.deleteUser(id)

  // refetch User
  fetchUsers()
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
              <span>{{ meta.subtitle }}</span>
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
        <VCard title="Gerar Relatorio">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Role -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedRole"
                  label="Selecionar Ano"
                  :items="roles"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Plan -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedPlan"
                  label="Seleccionar o Mes Inicial"
                  :items="plans"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedStatus"
                  label="Seleccionar o Mes final"
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- 👉 Add New User -->
        <AdicionarNovoCurso
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

<script setup>
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue"
import { useUserListStore } from "@/views/apps/user/useUserListStore"

const userListStore = useUserListStore()
const searchQuery = ref("")
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 6,
  sortBy: [],
  groupBy: [],
  search: undefined,
})



// 👉 Fetching users
const fetchUsers = () => {
  userListStore
    .fetchUsers({
      q: searchQuery.value,
      status: selectedStatus.value,
      plan: selectedPlan.value,
      role: selectedRole.value,
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
const roles = [
  {
    title: "Ciências Exactas",
    value: "administrador",
  },
  {
    title: "Ciências Sociais",
    value: "author",
  },
  {
    title: "Ciências Agrarias ",
    value: "editor",
  },
  {
    title: "Ciências de Saúde",
    value: "maintainer",
  },
  {
    title: "Engenharia ",
    value: "subscriber",
  },
  {
    title: "Artes e Cultura",
    value: "administrador",
  },
  {
    title: "Ciencias Polciais e Militares",
    value: "author",
  },
  {
    title: "Ciências Corporativas",
    value: "editor",
  },
]

const plans = [
  {
    title: "Presencial Laboral",
    value: "basic",
  },
  {
    title: "Presencial Pos Laboral",
    value: "company",
  },
  {
    title: "Ensino Online",
    value: "enterprise",
  },
  {
    title: "Ensino a Distancia",
    value: "team",
  },
]

const status = [
  {
    title: "Publica",
    value: "privado",
  },
  {
    title: "Privada",
    value: "active",
  },
  {
    title: "Ambos",
    value: "inactive",
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === "subscriber")
    return {
      color: "warning",
      icon: "tabler-circle-check",
    }
  if (roleLowerCase === "author")
    return {
      color: "success",
      icon: "tabler-user",
    }
  if (roleLowerCase === "maintainer")
    return {
      color: "primary",
      icon: "tabler-chart-pie-2",
    }
  if (roleLowerCase === "editor")
    return {
      color: "info",
      icon: "tabler-edit",
    }
  if (roleLowerCase === "administrador")
    return {
      color: "secondary",
      icon: "tabler-device-laptop",
    }

  return {
    color: "primary",
    icon: "tabler-user",
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === "privado") return "warning"
  if (statLowerCase === "active") return "success"
  if (statLowerCase === "inactive") return "secondary"

  return "primary"
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
    title: "Ciências Exactas",
    stats: "21,459",
    subtitle: "Cursos Disponiveis",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Ciências Sociais",
    stats: "4,567",
    subtitle: "Cursos Disponiveis",
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Ciências Agrarias ",
    stats: "19,860",
    subtitle: "Cursos Disponiveis",
  },

  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: " Ciências de Saúde",
    stats: "237",
    subtitle: "Cursos Disponiveis",
  },
  {
    icon: "tabler-user",
    color: "primary",
    title: "Ciências Corporativas",
    stats: "21,459",

    subtitle: "Cursos Disponiveis",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Engenharia",
    stats: "4,567",

    subtitle: "Cursos Disponiveis",
  },

  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "Artes e Cultura",
    stats: "237",

    subtitle: "Cursos Disponiveis",
  },
  {
    icon: "tabler-user-exclamation",
    color: "error",
    title: "Ciências Policiais e Militares",
    stats: "237",

    subtitle: "Cursos Disponiveis",
  },
]

const deleteUser = id => {
  userListStore.deleteUser(id)

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
        <VCard title="Pesquisar Curso">
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
                  label="Selecionar Campo de Estudo"
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
                  label="Seleccionar Modalidade"
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
                  label="Seleccionar Tipo de Instituicao"
                  :items="status"
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
                  { value: 5, title: '5' },
                  { value: 10, title: '10' },
                  { value: 25, title: '25' },
                  { value: 50, title: '50' },
                  { value: 100, title: '100' },
                  { value: -1, title: 'All' },
                ]"
                style="width: 6.25rem"
                @update:model-value="options.itemsPerPage = parseInt($event, 6)"
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem">
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
                Adicionar novo curso
              </VBtn>
            </div>
          </VCardText>

          <VDivider />
        </VCard>

        <!-- 👉 Add New User -->
        <AddNewUserDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewUser"
        />
      </VCol>
    </VRow>
    
    
    
    <div class="mt-5">
      <!-- Paginação -->
      <VPagination
        v-model="options.page"
        :length="Math.ceil(totalUsers / options.itemsPerPage)"
        :total-visible="
          $vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)
        "
        @click="fetchUsers"
      >
        <template #prev="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Anterior
          </VBtn>
        </template>
        <template #next="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Próximo
          </VBtn>
        </template>
      </VPagination>
    </div>
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

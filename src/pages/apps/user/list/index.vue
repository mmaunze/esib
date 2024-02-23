<script setup>
import { paginationMeta } from "@/@fake-db/utils"
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue"
import { useUserListStore } from "@/views/apps/user/useUserListStore"
import { avatarText } from "@core/utils/formatters"
import { VDataTableServer } from "vuetify/labs/VDataTable"

const userListStore = useUserListStore()
const searchQuery = ref("")
const selectedtipoUtilizador = ref()
const selecteddepartamento = ref()
const selectedareaCientifica = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: "Nome Completo",
    key: "user",
  },
  {
    title: "Tipo Utilizador",
    key: "tipoUtilizador",
  },
  {
    title: "Departamento",
    key: "departamento",
  },
  {
    title: "Contacto",
    key: "contacto",
  },
  {
    title: "Area Cientifica",
    key: "areaCientifica",
  },
  {
    title: "Detalhes",
    key: "actions",
    sortable: false,
  },
]

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
    title: "Basic",
    value: "basic",
  },
  {
    title: "Company",
    value: "company",
  },
  {
    title: "Enterprise",
    value: "enterprise",
  },
  {
    title: "Team",
    value: "team",
  },
]

const areaCientifica = [
  {
    title: "privado",
    value: "privado",
  },
  {
    title: "Active",
    value: "active",
  },
  {
    title: "Inactive",
    value: "inactive",
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

const resolveUserareaCientificaVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase !== "privado") return "success"
  if (statLowerCase === "active") return "waring"
  if (statLowerCase === "inactive") return "error"

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
    title: "Session",
    stats: "21,459",
    percentage: +29,
    subtitle: "Total Users",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Paid Users",
    stats: "4,567",
    percentage: +18,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Active Users",
    stats: "19,860",
    percentage: -14,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "privado Users",
    stats: "237",
    percentage: +42,
    subtitle: "Last week analytics",
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
                <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'">( {{ meta.percentage > 0 ? "+" : "" }}
                  {{ meta.percentage }}%)</span>
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
        <VCard title="Search Filter">
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
                  label="Select tipoUtilizador"
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
                  label="Select departamento"
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
                  label="Select areaCientifica"
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
                  { value: 10, title: '10' },
                  { value: 25, title: '25' },
                  { value: 50, title: '50' },
                  { value: 100, title: '100' },
                  { value: -1, title: 'All' },
                ]"
                style="width: 6.25rem"
                @update:model-value="
                  options.itemsPerPage = parseInt($event, 10)
                "
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>

              <!-- 👉 Export button -->
              <VBtn
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
              >
                Export
              </VBtn>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Add New User
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="users"
            :items-length="totalUsers"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
          >
            <!-- User -->
            <template #item.user="{ item }">
              <div class="d-flex align-center">
                <VAvatar
                  size="34"
                  :variant="!item.raw.avatar ? 'tonal' : undefined"
                  :color="
                    !item.raw.avatar
                      ? resolveUsertipoUtilizadorVariant(
                        item.raw.tipoUtilizador
                      ).color
                      : undefined
                  "
                  class="me-3"
                >
                  <VImg
                    v-if="item.raw.avatar"
                    :src="item.raw.avatar"
                  />
                  <span v-else>{{ avatarText(item.raw.nome) }}</span>
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <RouterLink
                      :to="{
                        name: 'apps-user-view-id',
                        params: { id: item.raw.id },
                      }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ item.raw.nome }}
                    </RouterLink>
                  </h6>

                  <span class="text-sm text-medium-emphasis">@{{ item.raw.email }}</span>
                </div>
              </div>
            </template>

            <!-- 👉 tipoUtilizador -->
            <template #item.tipoUtilizador="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  :size="30"
                  :color="
                    resolveUsertipoUtilizadorVariant(item.raw.tipoUtilizador)
                      .color
                  "
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="
                      resolveUsertipoUtilizadorVariant(item.raw.tipoUtilizador)
                        .icon
                    "
                  />
                </VAvatar>
                <span class="text-capitalize">{{
                  item.raw.tipoUtilizador
                }}</span>
              </div>
            </template>

            <!-- departamento -->
            <template #item.departamento="{ item }">
              <span class="text-capitalize font-weight-medium">{{
                item.raw.departamento
              }}</span>
            </template>

            <!-- areaCientifica -->
            <template #item.areaCientifica="{ item }">
              <VChip
                :color="
                  resolveUserareaCientificaVariant(item.raw.areaCientifica)
                "
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.areaCientifica }}
              </VChip>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn @click="deleteUser(item.raw.id)">
                <VIcon icon="tabler-trash" />
              </IconBtn>

              <IconBtn>
                <VIcon icon="tabler-edit" />
              </IconBtn>

              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
              >
                <VIcon
                  size="24"
                  icon="tabler-dots-vertical"
                />

                <VMenu activator="parent">
                  <VList>
                    <VListItem
                      :to="{
                        name: 'apps-user-view-id',
                        params: { id: item.raw.id },
                      }"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-eye" />
                      </template>

                      <VListItemTitle>View</VListItemTitle>
                    </VListItem>

                    <VListItem link>
                      <template #prepend>
                        <VIcon icon="tabler-pencil" />
                      </template>
                      <VListItemTitle>Edit</VListItemTitle>
                    </VListItem>

                    <VListItem @click="deleteUser(item.raw.id)">
                      <template #prepend>
                        <VIcon icon="tabler-trash" />
                      </template>
                      <VListItemTitle>Delete</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
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
                      Previous
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Next
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

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

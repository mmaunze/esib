<script setup>
import { paginationMeta } from "@/@fake-db/utils";
import AddNewUserDrawer from "@/views/user/AddNewUtilizadorDrawer.vue";
import { useUtilizadorListStore } from "@/views/user/useUtilizadorListStore";

const listaUtilizadores = useUtilizadorListStore();

const searchQuery = ref("");
const selectedtipoUtilizador = ref();
const selecteddepartamento = ref();
const selectedareaCientifica = ref();
const totalPage = ref(1);
const totalUsers = ref(0);
const utilizadores = ref([]);

const options = ref({
  page: 1,
  itemsPerPage: 4,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// 👉 Fetching users
const buscarUtilizadores = () => {
  listaUtilizadores
    .fetchUsers({
      q: searchQuery.value,
      areaCientifica: selectedareaCientifica.value,
      departamento: selecteddepartamento.value,
      tipoUtilizador: selectedtipoUtilizador.value,
      options: options.value,
    })
    .then((response) => {
      utilizadores.value = response.data.users;
      totalPage.value = response.data.totalPage;
      totalUsers.value = response.data.totalUsers;
      options.value.page = response.data.page;
    })
    .catch((error) => {
      console.error(error);
    });
};

watchEffect(buscarUtilizadores);

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
];

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
];

function administrador() {
  return true;
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
    title: "Quimica",
    value: "Quimica",
  },
];

const resolveUsertipoUtilizadorVariant = (tipoUtilizador) => {
  const tipoUtilizadorLowerCase = tipoUtilizador.toLowerCase();
  if (tipoUtilizadorLowerCase === "cta")
    return {
      color: "primary",
      icon: "tabler-circle-check",
    };
  if (tipoUtilizadorLowerCase === "bibliotecario")
    return {
      color: "info",
      icon: "tabler-user",
    };
  if (tipoUtilizadorLowerCase === "docente")
    return {
      color: "warning",
      icon: "tabler-chart-pie-2",
    };
  if (tipoUtilizadorLowerCase === "estudante")
    return {
      color: "error",
      icon: "tabler-edit",
    };
  if (tipoUtilizadorLowerCase === "Administrador")
    return {
      color: "success",
      icon: "tabler-device-laptop",
    };

  return {
    color: "primary",
    icon: "tabler-user",
  };
};

const resolveUserareaCientificaVariant = (stat) => {
  const statLowerCase = stat.toLowerCase();
  if (statLowerCase !== "privado") return "success";
  if (statLowerCase === "active") return "waring";
  if (statLowerCase === "inactive") return "error";

  return "primary";
};

const isAddNewUserDrawerVisible = ref(false);

const addNewUser = (userData) => {
  listaUtilizadores.addUser(userData);

  // refetch User
  buscarUtilizadores();
};

// 👉 List
const userListMeta = [
  {
    icon: "tabler-user",
    color: "primary",
    title: "Estudantes",
    stats: "459",
    percentage: +29,
    subtitle: "Total Users",
  },
  {
    icon: "tabler-user-plus",
    color: "error",
    title: "Docentes",
    stats: "4,567",
    percentage: +18,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-check",
    color: "success",
    title: "Bibliotecarios",
    stats: "19,860",
    percentage: -14,
    subtitle: "Last week analytics",
  },
  {
    icon: "tabler-user-exclamation",
    color: "warning",
    title: "CTA",
    stats: "237",
    percentage: +42,
    subtitle: "Last week analytics",
  },
];

const deleteUser = (id) => {
  listaUtilizadores.deleteUser(id);

  // refetch User
  buscarUtilizadores();
};
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
                <span
                  :class="meta.percentage > 0 ? 'text-success' : 'text-error'"
                  >( {{ meta.percentage > 0 ? "+" : "" }}
                  {{ meta.percentage }}%)</span
                >
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
        <VCard title="Pesquisar Revista">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select tipoUtilizador -->
              <VCol cols="12" sm="4">
                <AppSelect
                  v-model="selectedtipoUtilizador"
                  label="Seleccionar Idioma"
                  :items="tipoUtilizadors"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select departamento -->
              <VCol cols="12" sm="4">
                <AppSelect
                  v-model="selecteddepartamento"
                  label="Seleccionar Estado"
                  :items="departamentos"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select areaCientifica -->
              <VCol cols="12" sm="4">
                <AppSelect
                  v-model="selectedareaCientifica"
                  label="Seleccionar area cientifica"
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
                  { value: 12, title: '12' },
                  { value: 32, title: '32' },
                  { value: 60, title: '60' },
                  { value: -1, title: 'ver tudo' },
                ]"
                style="width: 6.25rem"
                @update:model-value="options.itemsPerPage = parseInt($event, 4)"
              />
            </div>
            <VSpacer />

            <div
              class="utilizadores-search-filter d-flex align-center flex-wrap gap-4"
            >
              <!-- 👉 Search  -->
              <div style="inline-size: 16rem">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Pesquisar revistas"
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
              md="2"
              lg="6"
            >
              <VCard class="mb-3">
                <VCardTitle class="mb-4 mt-2">
                  {{ user.nome }}
                </VCardTitle>

                <VImg :src="user.avatar" aspect-ratio="2" />

                <!--
                  <span
                  v-else
                  class="text-9xl"
                  >{{ avatarText(user.nome) }}</span> 
                -->

                <VCardText>
                  <div class="d-flex align-center gap-4">
                    <span variant="tonal" size="small" label class="mb-3">
                      {{ user.sexo }}
                    </span>
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
                    <VBtn variant="tonal" size="small" label class="mb-3">
                      {{ user.departamento }}
                    </VBtn>
                  </div>
                  <p class="font-weight-small">
                    <br />
                    {{ user.contacto }} <br />
                    {{ user.email }}
                  </p>
                  <VChip
                    :color="primary"
                    size="small"
                    label
                    class="text-capitalize"
                  >
                    {{ user.areaCientifica }}
                  </VChip>
                </VCardText>

                <VCardText v-if="administrador()" class="text-center">
                  <VBtn
                    style="margin-right: 1.2rem"
                    size="small"
                    color="error"
                    @click="deleteUser(user.id)"
                  >
                    Remover
                  </VBtn>
                  <VBtn
                    style="margin-left: 1.2rem"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'utilizadores-utilizador-id',
                      params: { id: user.id },
                    }"
                  >
                    Detalhes
                  </VBtn>
                </VCardText>

                <VCardText v-else class="text-center">
                  <VBtn
                    style="margin-right: 1.2rem"
                    size="small"
                    color="success"
                    @click="deleteUser(user.id)"
                  >
                    Reservar
                  </VBtn>
                  <VBtn
                    style="margin-left: 1.2rem"
                    size="small"
                    color="primary"
                    :to="{
                      name: 'utilizadores-utilizador-id',
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

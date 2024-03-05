<script setup>
import { avatarText, kFormatter } from "@core/utils/formatters"

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const isEditarInformacoesVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

const resolveUserStatusVariant = stat => {
  if (stat === "privado") return "warning"
  if (stat === "active") return "success"
  if (stat === "inactive") return "secondary"

  return "primary"
}

const resolveUsertipoUtilizadorVariant = tipoUtilizador => {
  if (tipoUtilizador === "Administrador")
    return {
      color: "warning",
      icon: "tabler-user",
    }
  if (tipoUtilizador === "Bibliotecario")
    return {
      color: "success",
      icon: "tabler-circle-check",
    }
  if (tipoUtilizador === "Estudante")
    return {
      color: "primary",
      icon: "tabler-chart-pie-2",
    }
  if (tipoUtilizador === "Docente")
    return {
      color: "info",
      icon: "tabler-pencil",
    }
  if (tipoUtilizador === "Cta")
    return {
      color: "secondary",
      icon: "tabler-server-2",
    }

  return {
    color: "primary",
    icon: "tabler-user",
  }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Detalhes -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="100"
            :color="!props.userData.avatar ? 'primary' : undefined"
            :variant="!props.userData.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="props.userData.avatar"
              :src="props.userData.avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.userData.nome) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h4 mt-4">
            {{ props.userData.nome }}
          </h6>

          <!-- 👉 tipoUtilizador chip -->
          <VChip
            label
            :color="resolveUsertipoUtilizadorVariant(props.userData.tipoUtilizador).color"
            size="small"
            class="text-capitalize mt-3"
          >
            {{ props.userData.tipoUtilizador }}
          </VChip>
        </VCardText>

      
        <VDivider />

        <!-- 👉 Detalhes -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Detalhes do Utilizador
          </p>

          

          <!-- 👉 User Detalhes list -->
          <VList class="card-list mt-2">
<VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  id:
                  <span class="text-body-1">
                    {{ props.userData.id }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Username:
                  <span class="text-body-1">
                    {{ props.userData.username }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Email:
                  <span class="text-body-1">{{ props.userData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Departamento:

                  <VChip
                    label
                    size="small"
                    :color="resolveUserStatusVariant(props.userData.departamento)"
                    class="text-capitalize"
                  >
                    {{ props.userData.departamento }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Tipo de Utilizador:
                  <span class="text-capitalize text-body-1">{{
                    props.userData.tipoUtilizador
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Area Cientifica:
                  <span class="text-body-1">
                    {{ props.userData.areaCientifica }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Contacto:
                  <span class="text-body-1">{{ props.userData.contacto }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="props.userData.sexo ==='M'">
              <VListItemTitle>
                <h6 class="text-h6">
                  Sexo:
                  <span class="text-body-1"> Masculino
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem v-else>
              <VListItemTitle>
                <h6 class="text-h6">
                  Sexo:
                  <span class="text-body-1"> Feminino
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Editar and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-4"
            @click="isEditarInformacoesVisible = true"
          >
            Editar
          </VBtn>

          <VBtn
            variant="tonal"
            color="error"
          >
            Banir
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Editar user info dialog -->
  <EditarInformacoes
    v-model:isDialogVisible="isEditarInformacoesVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Actualizar dialog -->
  <ActualizarPlano v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>

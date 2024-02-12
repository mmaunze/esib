<script setup>
import { VDataTable } from "vuetify/labs/VDataTable"

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")

const passwordRequirements = [
  "No mínimo 8 caracteres, quanto mais, melhor",
  "No mínimo um caracter minúsculo ",
  "No mínimo um numero, símbolo ou espaço",
]

const serverKeys = [
  {
    name: "Server Key 1",
    key: "23eaf7f0-f4f7-495e-8b86-fad3261282ac",
    createdOn: "28 Apr 2021, 18:20 GTM+4:10",
    permission: "Full Access",
  },
  {
    name: "Server Key 2",
    key: "bb98e571-a2e2-4de8-90a9-2e231b5e99",
    createdOn: "12 Feb 2021, 10:30 GTM+2:30",
    permission: "Read Only",
  },
  {
    name: "Server Key 3",
    key: "2e915e59-3105-47f2-8838-6e46bf83b711",
    createdOn: "28 Dec 2020, 12:21 GTM+4:10",
    permission: "Full Access",
  },
]

const recentDevicesHeaders = [
  {
    title: "Navegador",
    key: "browser",
  },
  {
    title: "Dispositivo",
    key: "device",
  },
  {
    title: "Localização",
    key: "location",
  },
  {
    title: "Ultima Actividade ",
    key: "recentActivity",
  },
]

const recentDevices = [
  {
    browser: "Chrome no Windows",
    device: "HP Spectre 360",
    location: "New York, NY",
    recentActivity: "28 Apr 2022, 18:20",
    deviceIcon: {
      icon: "tabler-brand-windows",
      color: "primary",
    },
  },
  {
    browser: "Chrome no iPhone",
    device: "iPhone 12x",
    location: "Los Angeles, CA",
    recentActivity: "20 Apr 2022, 10:20",
    deviceIcon: {
      icon: "tabler-device-mobile",
      color: "error",
    },
  },
  {
    browser: "Chrome no Android",
    device: "Oneplus 9 Pro",
    location: "San Francisco, CA",
    recentActivity: "16 Apr 2022, 04:20",
    deviceIcon: {
      icon: "tabler-brand-android",
      color: "success",
    },
  },
  {
    browser: "Chrome no MacOS",
    device: "Apple iMac",
    location: "New York, NY",
    recentActivity: "28 Apr 2022, 18:20",
    deviceIcon: {
      icon: "tabler-brand-apple",
      color: "secondary",
    },
  },
  {
    browser: "Chrome no Windows",
    device: "HP Spectre 360",
    location: "Los Angeles, CA",
    recentActivity: "20 Apr 2022, 10:20",
    deviceIcon: {
      icon: "tabler-brand-windows",
      color: "primary",
    },
  },
  {
    browser: "Chrome no Android",
    device: "Oneplus 9 Pro",
    location: "San Francisco, CA",
    recentActivity: "16 Apr 2022, 04:20",
    deviceIcon: {
      icon: "tabler-brand-android",
      color: "success",
    },
  },
]

const isOneTimePasswordDialogVisible = ref(false)
</script>

<template>
  <VRow>
    <!-- SECTION: Alterar a Senha -->
    <VCol cols="12">
      <VCard title="Alterar a Senha">
        <VForm>
          <VCardText class="pt-0">
            <!-- 👉 Senha Actual -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 Senha Actual -->
                <AppTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  label="Senha Actual"
                  @click:append-inner="
                    isCurrentPasswordVisible = !isCurrentPasswordVisible
                  "
                />
              </VCol>
            </VRow>

            <!-- 👉 Nova Senha -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 Nova Senha -->
                <AppTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  label="Nova Senha"
                  @click:append-inner="
                    isNewPasswordVisible = !isNewPasswordVisible
                  "
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 Confirmar password -->
                <AppTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  label="Confirmar Nova Senha"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <h6 class="text-base font-weight-medium mb-3">
              Requisitos da Senha
            </h6>

            <VList class="card-list">
              <VListItem
                v-for="item in passwordRequirements"
                :key="item"
                :title="item"
                class="text-medium-emphasis"
              >
                <template #prepend>
                  <VIcon
                    size="8"
                    icon="tabler-circle"
                    class="me-3"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Actualizar</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Limpar
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Autenticação de dois factores -->
    <VCol cols="12">
      <VCard title="Autenticação de dois factores">
        <VCardText>
          <h6 class="text-base font-weight-medium mb-3">
            Autenticação de dois factores esta inactiva.
          </h6>
          <p>
            A autenticação de dois factores aidiciona uma camada adicional de
            segurança a sua conta
            <br>
            por solicitar mais do que uma senha para entrar no sistema
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Saber mais.</a>
          </p>

          <VBtn @click="isOneTimePasswordDialogVisible = true">
            Habilitar A2F
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <!-- SECTION Dipositivos Recentes -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Dipositivos Recentes">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          hide-default-footer
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span>
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- SECTION Enable One time password -->
  <TwoFactorAuthDialog v-model:isDialogVisible="isOneTimePasswordDialogVisible" />
  <!-- !SECTION -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 5px;
}

.server-close-btn {
  inset-inline-end: 0.5rem;
}
</style>

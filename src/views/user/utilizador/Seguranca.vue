<script setup>
import { VDataTable } from "vuetify/labs/VDataTable"

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const smsVerificationNumber = ref("+1(968) 819-2547")
const isTwoFactorDialogOpen = ref(false)

// Dipositivos Recentes Headers
const recentDeviceHeader = [
  {
    title: "BROWSER",
    key: "browser",
  },
  {
    title: "DEVICE",
    key: "device",
  },
  {
    title: "LOCATION",
    key: "location",
  },
  {
    title: "RECENT ACTIVITY",
    key: "activity",
  },
]

const recentDevices = [
  {
    browser: " Chrome no Windows",
    icon: "tabler-brand-windows",
    color: "info",
    device: "HP Spectre 360",
    location: "Switzerland",
    activity: "10, July 2021 20:07",
  },
  {
    browser: "Chrome no iPhone",
    icon: "tabler-device-mobile",
    color: "error",
    device: "iPhone 12x",
    location: "Australia",
    activity: "13, July 2021 10:10",
  },
  {
    browser: "Chrome no Android",
    icon: "tabler-brand-android",
    color: "success",
    device: "Oneplus 9 Pro",
    location: "Dubai",
    activity: "14, July 2021 15:15",
  },
  {
    browser: "Chrome no MacOS",
    icon: "tabler-brand-apple",
    color: "secondary",
    device: "Apple iMac",
    location: "India",
    activity: "16, July 2021 16:17",
  },
  {
    browser: "Chrome no Windows",
    icon: "tabler-brand-windows",
    color: "info",
    device: "HP Spectre 360",
    location: "Switzerland",
    activity: "20, July 2021 21:01",
  },
  {
    browser: "Chrome no Android",
    icon: "tabler-brand-android",
    color: "success",
    device: "Oneplus 9 Pro",
    location: "Dubai",
    activity: "20, July 2021 21:01",
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Alterar senha -->
      <VCard title="Alterar senha">
        <VCardText>
          <VAlert
            variant="tonal"
            color="warning"
            class="mb-4"
          >
            <VAlertTitle class="mb-2">
              Ensure that these requirements are met
            </VAlertTitle>
            <span>Minimum 8 characters long, uppercase & symbol</span>
          </VAlert>

          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Nova Senha"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="
                    isNewPasswordVisible = !isNewPasswordVisible
                  "
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Confirmação de Senha"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>

              <VCol cols="12">
                <VBtn type="submit">
                  Alterar senha
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Two step verification -->
      <VCard title="Verificação de 2 etapas">
        <template #subtitle>
          <span class="text-base">
            Keep your account secure with authentication step.
          </span>
        </template>
        <VCardText>
          <div>
            <h4 class="font-weight-medium">
              SMS
            </h4>

            <AppTextField
              :model-value="smsVerificationNumber"
              readonly
            >
              <template #append-inner>
                <div class="d-flex align-center gap-2">
                  <VIcon
                    icon="tabler-edit"
                    size="22"
                    @click="isTwoFactorDialogOpen = true"
                  />

                  <VIcon
                    size="22"
                    icon="tabler-trash"
                  />
                </div>
              </template>
            </AppTextField>
          </div>

          <p class="mb-0 mt-4">
            A autenticação de dois factores aidiciona uma camada adicional de
            segurança a sua conta por solicitar mais do que uma senha para
            entrar no sistema
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Learn more</a>.
          </p>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Dipositivos Recentes -->
      <VCard title="Dipositivos Recentes">
        <VDivider />
        <VDataTable
          :items="recentDevices"
          :headers="recentDeviceHeader"
          hide-default-footer
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                :icon="item.raw.icon"
                :color="item.raw.color"
                :size="22"
                class="me-3"
              />
              {{ item.raw.browser }}
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Enable One Time Password Dialog -->
  <TwoFactorAuthDialog
    v-model:isDialogVisible="isTwoFactorDialogOpen"
    :sms-code="smsVerificationNumber"
  />
</template>

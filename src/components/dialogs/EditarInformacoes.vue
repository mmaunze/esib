<script setup>
const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      fullName: "",
      company: "",
      role: "",
      username: "",
      provincia: "",
      contact: "",
      email: "",
      currentPlan: "",
      status: "",
      avatar: "",
      taskDone: null,
      projectDone: null,
      taxId: "",
      language: "",
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["submit", "update:isDialogVisible"])

const userData = ref(structuredClone(toRaw(props.userData)))
const isUseAsBillingAddress = ref(false)

watch(props, () => {
  userData.value = structuredClone(toRaw(props.userData))
})

const onFormSubmit = () => {
  emit("update:isDialogVisible", false)
  emit("submit", userData.value)
}

const onFormReset = () => {
  userData.value = structuredClone(toRaw(props.userData))
  emit("update:isDialogVisible", false)
}

const dialogModelValueUpdate = val => {
  emit("update:isDialogVisible", val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <BtnFecharModal @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-3">
          Editar User Information
        </VCardTitle>
        <p class="mb-0">
          Updating user Detalhes will receive a privacy audit.
        </p>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Primeiro Nome -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.fullName.split(' ')[0]"
                label="Primeiro Nome"
              />
            </VCol>

            <!-- 👉 Apelido -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.fullName.split(' ')[1]"
                label="Apelido"
              />
            </VCol>

            <!-- 👉 Billing Email -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.email"
                label="Billing Email"
              />
            </VCol>

            <!-- 👉 Status -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.status"
                label="Status"
              />
            </VCol>

            <!-- 👉 Tax Id -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.taxId"
                label="Tax Id"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.contact"
                label="Contact"
              />
            </VCol>

            <!-- 👉 Language -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.language"
                chips
                multiple
                label="Language"
              />
            </VCol>

            <!-- 👉 provincia -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.provincia"
                label="provincia"
              />
            </VCol>

            <!-- 👉 Switch -->
            <VCol cols="12">
              <VSwitch
                v-model="isUseAsBillingAddress"
                density="compact"
                label="Use as a billing address?"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Enviar
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancelar
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

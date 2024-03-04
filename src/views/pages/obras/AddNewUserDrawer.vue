<script setup>
import { emailValidator, requiredValidator } from "@validators"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["update:isDrawerOpen", "userData"])

const isFormValid = ref(false)
const refForm = ref()
const nome = ref("")
const email = ref("")
const departamento = ref("")
const areaCientifica = ref("")
const contacto = ref("")
const tipoUtilizador = ref()
const sexo = ref()
const status = ref()

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit("update:isDrawerOpen", false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit("userData", {
        id: 0,
        nome: nome.value,
        departamento: departamento.value,
        tipoUtilizador: tipoUtilizador.value,
        areaCientifica: areaCientifica.value,
        contacto: contacto.value,
        email: email.value,
        sexo: sexo.value,
        status: status.value,
        avatar: "",
        billing: "Auto Debit",
      })
      emit("update:isDrawerOpen", false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit("update:isDrawerOpen", val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Cadastrar Utilizador"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Nome -->
              <VCol cols="12">
                <AppTextField
                  v-model="nome"
                  :rules="[requiredValidator]"
                  label="Nome Completo"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <!-- 👉 company -->
              <VCol cols="12">
                <AppTextField
                  v-model="departamento"
                  :rules="[requiredValidator]"
                  label="Company"
                />
              </VCol>

              <!-- 👉 Area Cientifica -->
              <VCol cols="12">
                <AppSelect
                  v-model="areaCientifica"
                  label=" 👉 Area Cientifica "
                  :rules="[requiredValidator]"
                  :items="[
                    'Biologia',
                    'Quimica',
                    'Matematica'
                  ]"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <AppTextField
                  v-model="contacto"
                  type="number"
                  :rules="[requiredValidator]"
                  label="👉 Contact"
                />
              </VCol>

              <!-- 👉 Role -->
              <VCol cols="12">
                <AppSelect
                  v-model="tipoUtilizador"
                  label="👉 Tipo de Utilizador"
                  :rules="[requiredValidator]"
                  :items="[
                    'Administrador',
                    'Estudante',
                    'Docente',
                    'Cta',
                    'Bibliotecario',
                  ]"
                />
              </VCol>

              <!-- 👉 Plan -->
              <VCol cols="12">
                <AppSelect
                  v-model="sexo"
                  label="Sexo"
                  :rules="[requiredValidator]"
                  :items="['F', 'M']"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="status"
                  label="Select Status"
                  :rules="[requiredValidator]"
                  :items="[
                    { title: 'publico', value: 'publico' },
                    { title: 'Inactive', value: 'inactive' },
                    { title: 'privado', value: 'privado' },
                  ]"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

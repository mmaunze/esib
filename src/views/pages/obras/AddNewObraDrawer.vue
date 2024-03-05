<script setup>
import AppAutocomplete from "@/src/@core/components/app-form-elements/AppAutocomplete.vue"
import { requiredValidator } from "@validators"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["update:isDrawerOpen", "obraData"])

const isFormValid = ref(false)
const refForm = ref()
const id = ref("")
const titulo = ref("")
const autores = ref("")
const idioma = ref("")
const areaCientifica = ref("")
const nrPaginas = ref("")
const tipoObra = ref()
const localizacao = ref("")
const anoPublicacao = ref("")
const referencia = ref("")
const fotografia = ref("")

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
      emit("obraData", {
        id: 0,
        titulo: titulo.value,
        idioma: idioma.value,
        tipoObra: tipoObra.value,
        areaCientifica: areaCientifica.value,
        nrPaginas: nrPaginas.value,
        autores: autores.value,
        localizacao: localizacao.value,
        localPublicacao: localPublicacao.value,
        fotografia: fotografia.value,
        anoPublicacao: anoPublicacao.value,
        referencia: referencia.value,
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
      title="Cadastrar Obra"
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
                  v-model="id"
                  type="number"
                  :rules="[requiredValidator]"
                  label="👉 Numero de Registo da obra"
                />
              </VCol>

              <!-- 👉 Nome -->
              <VCol cols="12">
                <AppTextField
                  v-model="titulo"
                  :rules="[requiredValidator]"
                  label="Titulo da Obra"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="autores"
                  :rules="[requiredValidator]"
                  label="autores"
                />
              </VCol>

              <!-- 👉 company -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="idioma"
                  label=" 👉 Idioma "
                  :rules="[requiredValidator]"
                  :items="['Biologia', 'Quimica', 'Matematica']"
                />
              </VCol>

              <!-- 👉 Area Cientifica -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="areaCientifica"
                  label=" 👉 Area Cientifica "
                  :rules="[requiredValidator]"
                  :items="['Biologia', 'Quimica', 'Matematica']"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <AppTextField
                  v-model="nrPaginas"
                  type="number"
                  :rules="[requiredValidator]"
                  label="👉 Numero de Paginas"
                />
              </VCol>

              <!-- 👉 Role -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="tipoObra"
                  label="👉 Tipo de Obra"
                  :rules="[requiredValidator]"
                  :items="[
                    'Livro Academico',
                    'Monografia',
                    'Livro Literario',
                    'Revista',
                  ]"
                />
              </VCol>

              <!-- 👉 Plan -->
              <VCol cols="12">
                <AppTextField
                  v-model="localizacao"
                  :rules="[requiredValidator]"
                  label="👉 Localizacao"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <AppTextField
                  v-model="localPublicacao"
                  :rules="[requiredValidator]"
                  label="👉 Local de Publicacao da Obra"
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

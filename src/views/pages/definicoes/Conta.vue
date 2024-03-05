<script setup>
import utilizadores from "@/@fake-db/pages/utilizadores";

const usuario = JSON.parse(localStorage.getItem("userData") || "null");

const Id = Number(usuario.id);
const userIndex = utilizadores.findIndex((e) => e.id === Id);
const userData = utilizadores[userIndex];

const accountData = {
  avatarImg: userData.avatar,
  nome: userData.fullName,
  username: userData.username,
  email: userData.email,
  org: userData.company,
  contact: userData.contact,
  address: userData.address,
  provincia: userData.provincia,
  zip: userData.zip,
};

const refInputEl = ref();
const isConfirmarOpen = ref(false);
const accountDataLocal = ref(structuredClone(accountData));
const isAccountDeactivated = ref(false);

const validateAccountDeactivation = [
  (v) => !!v || "Confirmar Desactivação da Conta",
];

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData);
};

const changeAvatar = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string")
        accountDataLocal.value.avatarImg = fileReader.result;
    };
  }
};

// Limpar avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg;
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Minha Conta">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="tabler-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Carregar Foto</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Limpar</span>
                <VIcon icon="tabler-reload" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Formato Permitdio : JPG, GIF ou PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Primeiro Nome -->
              <VCol md="6" cols="12">
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  label="Primeiro Nome"
                />
              </VCol>

              <!-- 👉 Apelido -->
              <VCol md="6" cols="12">
                <AppTextField
                  v-model="accountDataLocal.lastName"
                  label="Apelido"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="accountDataLocal.org"
                  label="Organization"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="accountDataLocal.contact"
                  label="Telefone"
                />
              </VCol>

              <!-- 👉 Endereço -->
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="accountDataLocal.address"
                  label="Address"
                />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12" md="6">
                <AppSelect
                  v-model="accountDataLocal.provincia"
                  label="Provincia"
                  :items="['Maputo', 'Gaza', 'Inhambane', 'Sofala', 'Manica']"
                />
              </VCol>

              <!-- 👉 Código Postal -->
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="accountDataLocal.zip"
                  label="Código Postal"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="sumbit" @click.prevent="actualizarDados">
                  Actualizar
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Limpar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Remover Conta -->
      <VCard title="Remover Conta">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="Confirmo a desactivação da minha conta"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="isConfirmarOpen = true"
          >
            Desactivar Conta
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirmar Dialog -->
  <Confirmar
    v-model:isDialogVisible="isConfirmarOpen"
    confirmation-question="Tem certeza de que deseja desactivar a sua conta ?"
    confirm-title="Deactivated!"
    confirm-msg="A sua conta foi desactivada com sucesso."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>

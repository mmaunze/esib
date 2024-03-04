<script setup>
import { useAppAbility as permissoesDoUsuario } from "@/plugins/casl/useAppAbility"
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue"
import axios from "@axios"
import { useGenerateImageVariant as geradorVarianteDeImagem } from "@core/composable/useGenerateImageVariant"
import logibBordaEscura from "@images/pages/auth-v2-login-illustration-bordered-dark.png"
import loginBordaClara from "@images/pages/auth-v2-login-illustration-bordered-light.png"
import loginEscuro from "@images/pages/auth-v2-login-illustration-dark.png"
import loginClaro from "@images/pages/auth-v2-login-illustration-light.png"
import authV2MaskDark from "@images/pages/misc-mask-dark.png"
import authV2MaskLight from "@images/pages/misc-mask-light.png"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"
import { emailValidator, requiredValidator } from "@validators"
import { VForm } from "vuetify/components/VForm"

const authThemeImg = geradorVarianteDeImagem(
  loginClaro,
  loginEscuro,
  loginBordaClara,
  logibBordaEscura,
  true,
)

const authThemeMask = geradorVarianteDeImagem(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const ability = permissoesDoUsuario()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()
const email = ref("mlmaunze@gmail.com")
const password = ref("mmaunze")
const rememberMe = ref(true)

const login = () => {
  axios
    .post("/auth/login", {
      email: email.value,
      password: password.value,
    })
    .then(r => {
      const { accessToken, userData, userAbilities } = r.data

      localStorage.setItem("userAbilities", JSON.stringify(userAbilities))
      ability.update(userAbilities)
      localStorage.setItem("userData", JSON.stringify(userData))
      localStorage.setItem("accessToken", JSON.stringify(accessToken))

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : "/")
    })
    .catch(e => {
      const { errors: formErrors } = e.response.data

      errors.value = formErrors
      console.error(e.response.data)
    })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login()
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="7"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h5 class="text-h5 mb-1">
            Bem vindo a
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
          </h5>
        </VCardText>
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Senha"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Lembrar-me"
                  />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'recuperar-senha' }"
                  >
                    Esqueceu a senha?
                  </RouterLink>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Entrar
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>Ainda não possui uma conta?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'criar-conta' }"
                >
                  Criar conta
                </RouterLink>
              </VCol>
              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4">ou</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>

<script setup>
import { initialAbility } from "@/plugins/casl/ability"
import { useAppAbility } from "@/plugins/casl/useAppAbility"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"

const router = useRouter()
const ability = useAppAbility()
const userData = JSON.parse(localStorage.getItem("userData") || "null")

const administrador =()=> {
  return userData.role.toLowerCase() === "administrador"
}

const sair = () => {
  // Remove "userData" from localStorage
  localStorage.removeItem("userData")

  // Remove "accessToken" from localStorage
  localStorage.removeItem("accessToken")
  router.push("/login").then(() => {
    // Remove "userAbilities" from localStorage
    localStorage.removeItem("userAbilities")

    // Limpar ability to initial ability
    ability.update(initialAbility)
  })
}

const userProfileList = [
  { type: "divider" },
  {
    type: "navItem",
    icon: "tabler-message",
    title: "Conversas",
    to: {
      name: "apps-chat",
      params: { id: userData.id },
    },
    badgeProps: {
      color: "error",
      content: "6", // lista de mensagens do user
    },
  },

  { type: "divider" },
  {
    type: "navItem",
    icon: "tabler-credit-card",
    title: "Pagamentos",
    to: {
      name: "pages-definicoes-tab",
      params: { tab: "pagamentos" },
    },
  },
  {
    type: "navItem",
    icon: "tabler-settings",
    title: "Definições",
    to: {
      name: "pages-definicoes-tab",
      params: { tab: "conta" },
    },
  },

  { type: "divider" },
  {
    type: "navItem",
    icon: "tabler-lifebuoy",
    title: "Ajuda e Suporte",
    to: { name: "pages-ajuda" },
  },
  {
    type: "navItem",
    icon: "tabler-help",
    title: "Perguntas Frequentes",
    to: { name: "pages-faq" },
  },
  { type: "divider" },
  {
    type: "navItem",
    icon: "tabler-logout",
    title: "sair",
    onClick: sair,
  },
]
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      :color="!(userData && userData.avatar) ? 'primary' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                  bordered
                >
                  <VAvatar
                    :color="
                      !(userData && userData.avatar) ? 'primary' : undefined
                    "
                    :variant="
                      !(userData && userData.avatar) ? 'tonal' : undefined
                    "
                  >
                    <VImg
                      v-if="userData && userData.avatar"
                      :src="userData.avatar"
                    />
                    <VIcon
                      v-else
                      icon="tabler-user"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{ userData.fullName || userData.username }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userData.role }}</VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <template #prepend>
                  <VIcon
                    class="me-2"
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge v-bind="item.badgeProps" />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-2"
              />
            </template>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

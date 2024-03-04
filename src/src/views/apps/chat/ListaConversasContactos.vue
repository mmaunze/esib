<script setup>
import ChatContact from "@/views/apps/chat/Contactos.vue"
import { useChatStore } from "@/views/apps/chat/useChatStore"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import { useChat } from "./useChat"

const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(["openChatOfContact", "showUserProfile", "close"])

const { resolveAvatarBadgeVariant } = useChat()
const search = useVModel(props, "search")
const store = useChatStore()
</script>

<template>
  <!-- 👉 Chat list header -->
  <div
    v-if="store.profileUser"
    class="chat-list-header"
  >
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      :color="resolveAvatarBadgeVariant(store.profileUser.status)"
      bordered
    >
      <VAvatar
        size="38"
        class="cursor-pointer"
        @click="$emit('showUserProfile')"
      >
        <VImg
          :src="store.profileUser.avatar"
          alt="Utilizador"
        />
      </VAvatar>
    </VBadge>

    <AppTextField
      v-model="search"
      placeholder="Pesquisar..."
      class="ms-4 me-1 chat-list-search"
    >
      <template #prepend-inner>
        <VIcon
          size="22"
          icon="tabler-search"
        />
      </template>
    </AppTextField>

    <IconBtn
      v-if="$vuetify.display.smAndDown"
      @click="$emit('close')"
    >
      <VIcon
        icon="tabler-x"
        class="text-medium-emphasis"
      />
    </IconBtn>
  </div>
  <VDivider />

  <PerfectScrollbar
    tag="ul"
    class="d-flex flex-column gap-y-1 chat-contacts-list px-3 list-none"
    :options="{ wheelPropagation: false }"
  >
    <li>
      <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">Conversas</span>
    </li>

    <ChatContact
      v-for="contact in store.chatsContacts"
      :key="`chat-${contact.id}`"
      :user="contact"
      is-chat-contact
      @click="$emit('openChatOfContact', contact.id)"
    />

    <span
      v-show="!store.chatsContacts.length"
      class="no-chat-items-text text-disabled"
    >Nenhuma conversa Encontrada</span>

    <li>
      <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">Contactos</span>
    </li>

    <ChatContact
      v-for="contact in store.contacts"
      :key="`chat-${contact.id}`"
      :user="contact"
      @click="$emit('openChatOfContact', contact.id)"
    />

    <span
      v-show="!store.contacts.length"
      class="no-chat-items-text text-disabled"
    >Nenhum contacto encontrado</span>
  </PerfectScrollbar>
</template>

<style lang="scss">
.chat-contacts-list {
  --chat-content-spacing-x: 16px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block-end: 0.625rem;
    margin-block-start: 1.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}

.chat-list-search {
  .v-field--focused {
    box-shadow: none !important;
  }
}
</style>

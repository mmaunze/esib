<script setup>
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  noActions: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionCollapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRefresh: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRemove: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
})

const emit = defineEmits([
  'collapsed',
  'refresh',
  'trash',
])

defineOptions({ inheritAttrs: false })

const isContentCollapsed = ref(props.collapsed)
const isCardRemoved = ref(false)
const isOverlayVisible = ref(false)

// hiding overlay
const hideOverlay = () => {
  isOverlayVisible.value = false
}

// trigger collapse
const triggerCollapse = () => {
  isContentCollapsed.value = !isContentCollapsed.value
  emit('collapsed', isContentCollapsed.value)
}

// trigger refresh
const triggerRefresh = () => {
  isOverlayVisible.value = true
  emit('refresh', hideOverlay)
}

// trigger removal
const triggeredRemove = () => {
  isCardRemoved.value = true
  emit('trash')
}
</script>

<template>
  <VExpandTransition>
    <!-- TODO remove div when transition work with v-card components: https://github.com/vuetifyjs/vuetify/issues/15111 -->
    <div v-if="!isCardRemoved">
      <VCard v-bind="$attrs">
        <VCardItem>
          <VCardTitle v-if="props.title || $slots.title">
            <!-- 👉 Title slot and prop -->
            <slot name="title">
              {{ props.title }}
            </slot>
          </VCardTitle>

          <template #append>
            <!-- 👉 Before actions slot -->
            <div>
              <slot name="before-actions" />

              <!-- SECTION Actions buttons -->

              <!-- 👉 Collapse button -->
              <IconBtn
                v-if="(!(actionRemove || actionRefresh) || actionCollapsed) && !noActions"
                @click="triggerCollapse"
              >
                <VIcon
                  size="20"
                  icon="tabler-chevron-up"
                  :style="{ transform: isContentCollapsed ? 'rotate(-180deg)' : null }"
                  style="transition-duration: 0.28s;"
                />
              </IconBtn>

              <!-- 👉 Overlay button -->
              <IconBtn
                v-if="(!(actionRemove || actionCollapsed) || actionRefresh) && !noActions"
                @click="triggerRefresh"
              >
                <VIcon
                  size="20"
                  icon="tabler-refresh"
                />
              </IconBtn>

              <!-- 👉 Close button -->
              <IconBtn
                v-if="(!(actionRefresh || actionCollapsed) || actionRemove) && !noActions"
                @click="triggeredRemove"
              >
                <VIcon
                  size="20"
                  icon="tabler-x"
                />
              </IconBtn>
            </div>
          <!-- !SECTION -->
          </template>
        </VCardItem>

        <!-- 👉 card content -->
        <VExpandTransition>
          <div
            v-show="!isContentCollapsed"
            class="v-card-content"
          >
            <slot />
          </div>
        </VExpandTransition>

        <!-- 👉 Overlay -->
        <VOverlay
          v-model="isOverlayVisible"
          contained
          persistent
          class="align-center justify-center"
        >
          <VProgressCircular indeterminate />
        </VOverlay>
      </VCard>
    </div>
  </VExpandTransition>

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
        {{ avatarText(props.userData.fullName) }}
      </span>
    </VAvatar>

    <!-- 👉 User fullName -->
    <h6 class="text-h4 mt-4">
      {{ props.userData.fullName }}
    </h6>

    <!-- 👉 Role chip -->
    <VChip
      label
      :color="resolveUserRoleVariant(props.userData.role).color"
      size="small"
      class="text-capitalize mt-3"
    >
      {{ props.userData.role }}
    </VChip>
  </VCardText>

  <VCardText class="d-flex justify-center flex-wrap mt-3">
    <!-- 👉 Done task -->
    <div class="d-flex align-center me-8">
      <VAvatar
        :size="38"
        rounded
        color="primary"
        variant="tonal"
        class="me-3"
      >
        <VIcon icon="tabler-checkbox" />
      </VAvatar>

      <div>
        <h6 class="text-h6">
          {{ kFormatter(props.userData.taskDone) }}
        </h6>
        <span class="text-sm">Task Done</span>
      </div>
    </div>

    <!-- 👉 Done Project -->
    <div class="d-flex align-center me-4">
      <VAvatar
        :size="38"
        rounded
        color="primary"
        variant="tonal"
        class="me-3"
      >
        <VIcon icon="tabler-briefcase" />
      </VAvatar>

      <div>
        <h6 class="text-h6">
          {{ kFormatter(props.userData.projectDone) }}
        </h6>
        <span class="text-sm">Project Done</span>
      </div>
    </div>
  </VCardText>

  <VDivider />



  <!-- 👉 Editar and Suspend button -->
  <VCardText class="d-flex justify-center">
    <VBtn
      variant="elevated"
      class="me-4"
      @click="editUser(props.userData)"
    >
      Editar
    </VBtn>

    <VBtn
      variant="tonal"
      color="error"
      @click="deleteUser(props.userData.id)"
    >
      Excluir
    </VBtn>
  </VCardText>
</template>

<style lang="scss">
.v-card-item {
  +.v-card-content {
    .v-card-text:first-child {
      padding-block-start: 0;
    }
  }
}
</style>

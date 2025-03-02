<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const button = ref<HTMLElement>()
const popup = ref<HTMLElement>()
const isOpen = ref(false)
const right = ref(0)

const open = () => {
  if (isOpen.value || !button.value) {
    isOpen.value = false
    return
  }
  isOpen.value = true
  const rect = button.value?.getBoundingClientRect()
  if (!rect) return
  right.value = window.innerWidth - rect.right
}
const close = () => {
  isOpen.value = false
}
onClickOutside(popup, close, {
  ignore: [button],
})
</script>
<template>
  <transition mode="out-in">
    <div class="relative" ref="button" :key="locale">
      <button
        class="flex items-center text-xs font-semibold text-slate-100/80 mt-0.5 group btn-animation"
        @click="open"
      >
        <span class="i-uil:globe block mr-1"></span>
        <span>{{ locale.toUpperCase() }}</span>
        <span
          class="i-uil:angle-down block transition duration-150 opacity-0 group-hover:opacity-100"
        ></span>
      </button>
    </div>
  </transition>
  <Teleport to="#teleports">
    <transition name="lang-popup">
      <div
        ref="popup"
        v-if="isOpen"
        class="fixed top-23 z-200 nav-bg text-slate-100/80 rounded-xl py-1 px-1"
        :style="{ right: right + 'px' }"
      >
        <ul class="flex flex-col">
          <li v-for="l in locales" :key="l.code">
            <NuxtLink
              class="nav-link text-xs font-bold py-1 px-2 flex gap-1 btn-animation block"
              :to="switchLocalePath(l.code)"
              @click="close"
            >
              <span
                class="border border-slate-100/80 rounded-sm text-8px px-1"
                :class="
                  l.code === locale
                    ? 'bg-slate-100/80 text-slate-800/80'
                    : 'text-slate-100/80'
                "
                >{{ l.code.toUpperCase() }}</span
              >
              <span class="font-normal">{{ l.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </Teleport>
</template>
<style scoped>
/* Default transition */
.lang-popup-enter-active,
.lang-popup-leave-active {
  @apply transition duration-300 ease-power4-out;
}

.lang-popup-enter-from,
.lang-popup-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>

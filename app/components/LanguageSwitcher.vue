<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const button = ref<HTMLElement>()
const popup = ref<HTMLElement>()
const isOpen = ref(false)
const right = ref(0)

function open() {
    if (isOpen.value || !button.value) {
        isOpen.value = false
        return
    }
    isOpen.value = true
    const rect = button.value?.getBoundingClientRect()
    if (!rect)
        return
    right.value = window.innerWidth - rect.right
}
function close() {
    isOpen.value = false
}
onClickOutside(popup, close, {
    ignore: [button],
})
</script>

<template>
  <transition mode="out-in">
    <div ref="button" :key="locale" class="relative">
      <button
        class="group btn-animation mt-0.5 flex items-center text-xs text-slate-100/80 font-semibold"
        @click="open"
      >
        <Icon name="i-uil:globe" class="mr-1 block" />
        <span>{{ locale.toUpperCase() }}</span>
        <Icon name="i-uil:angle-down" class="block opacity-0 transition duration-150 group-hover:opacity-100" />
      </button>
    </div>
  </transition>
  <Teleport to="#teleports">
    <transition name="lang-popup">
      <div
        v-if="isOpen"
        ref="popup"
        class="nav-bg fixed top-23 z-200 rounded-xl px-1 py-1 text-slate-100/80"
        :style="{ right: `${right}px` }"
      >
        <ul class="flex flex-col">
          <li v-for="l in locales" :key="l.code">
            <NuxtLink
              class="nav-link btn-animation block flex gap-1 px-2 py-1 text-xs font-bold"
              :to="switchLocalePath(l.code)"
              @click="close"
            >
              <span
                class="border border-slate-100/80 rounded-sm px-1 text-8px"
                :class="
                  l.code === locale
                    ? 'bg-slate-100/80 text-slate-800/80'
                    : 'text-slate-100/80'
                "
              >{{ l.code.toUpperCase() }}</span>
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

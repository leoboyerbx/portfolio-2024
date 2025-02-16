<script setup lang="ts">
import { getLenis } from '~/plugins/lenis.client'

definePageMeta({
  isHomePage: true,
})
useHead({
  titleTemplate: '%siteName',
})

const heroEl = ref()
const projectsEl = ref()
const openSourceEl = ref()
const contactEl = ref()
const mainNav = useMainNavStore()
onMounted(async () => {
  await nextTick()
  mainNav.setTargets(
    heroEl.value.$el,
    projectsEl.value.$el,
    openSourceEl.value.$el,
    contactEl.value.$el
  )
})

onUnmounted(() => {
  mainNav.setTargets()
})

const route = useRoute()
const scrollTo = route.query.scrollTo as string
useRouter().replace(route.path)
onMounted(async () => {
  if (scrollTo) {
    const target = document.getElementById(scrollTo)
    if (target) {
      getLenis().scrollTo(target, {
        immediate: true,
        offset: -128,
      })
    }
  }
})
</script>
<template>
  <div class="flex flex-col">
    <Hero id="hero" ref="heroEl" class="leaving-item" />
    <ProjectList id="projects" ref="projectsEl" class="mb-24 md:mb-2c" />
    <OpenSourceList
      id="openSource"
      ref="openSourceEl"
      class="leaving-item mb-24 md:mb-2c"
    />
    <ContactPush id="contact" ref="contactEl" class="leaving-item mb-1c" />
  </div>
</template>

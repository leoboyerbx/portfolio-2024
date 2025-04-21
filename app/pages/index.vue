<script setup lang="ts">
import { getLenis } from '~/plugins/lenis.client'

definePageMeta({
    isHomePage: true,
})
useHead({
    titleTemplate: '%siteName',
})

const wrapperEl = ref()
const mainNav = useMainNav()
onMounted(async () => {
    await until(() => !!wrapperEl.value).toBeTruthy()
    mainNav.value.targets = [
        wrapperEl.value.querySelector('#hero'),
        wrapperEl.value.querySelector('#projects'),
        // projectsEl.value.$el,
        // openSourceEl.value.$el,
        // contactEl.value.$el,
    ]
})

onUnmounted(() => {
    mainNav.value.targets = []
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

const { locale } = useI18n()
const { data } = await useAsyncData(
    `homepage-${locale.value}`,
    async () => {
        const result = await queryCollection('homepage').where('locale', '=', locale.value).first()
        return result
    },
    {
        dedupe: 'defer',
    },
)
</script>

<template>
  <div ref="wrapperEl" class="flex flex-col">
    <ContentRenderer :value="(data as any)" />
    <div class="h-100"></div>
    <!-- <NuxtLink :to="localePath('/projects/journiz')">
      Go debug
    </NuxtLink> -->
    <!-- <Hero id="hero" ref="heroEl" class="leaving-item" /> -->
    <!-- <ProjectList id="projects" ref="projectsEl" class="mb-24 md:mb-2c" />
    <OpenSourceList
      id="openSource"
      ref="openSourceEl"
      class="leaving-item mb-24 md:mb-2c"
    />
    <ContactPush id="contact" ref="contactEl" class="leaving-item mb-1c" /> -->
  </div>
</template>

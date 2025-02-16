<script setup lang="ts">
const props = defineProps<{
  showPhone?: boolean
}>()
const { t } = useI18n()
const links = computed(() => {
  const base = [
    {
      icon: 'i-uil:github',
      title: 'GitHub',
      url: 'https://github.com/leoboyerbx',
    },
    {
      icon: 'i-uil:linkedin',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/leoboyerbx',
    },
    {
      icon: 'i-uil:envelope',
      title: t('contact.email'),
      url: 'mailto:contact@leoboyer.fr',
    },
  ]
  if (props.showPhone) {
    base.push({
      icon: 'i-uil:phone',
      title: t('contact.phone'),
      url: 'tel:+33782459332',
    })
  }
  return base
})
</script>
<template>
  <div class="flex items-center gap-0.3em">
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      :title="link.title"
      target="_blank"
    >
      <span :class="link.icon" class="block"></span>
    </a>
  </div>
</template>
<style scoped>
a {
  @apply opacity-50 transition duration-300 hover:opacity-100;
}
</style>

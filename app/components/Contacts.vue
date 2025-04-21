<script setup lang="ts">
const { extended } = defineProps<{
    extended?: boolean
}>()
const global = await useGlobal()
const links = computed(() => global.value?.contacts.filter(contact => extended || !contact.extendedOnly))
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
      <Icon :name="link.icon" class="block" />
    </a>
  </div>
</template>

<style scoped>
a {
  @apply opacity-50 transition duration-300 hover:opacity-100;
}
</style>

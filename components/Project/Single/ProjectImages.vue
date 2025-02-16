<script setup lang="ts">
import type { Project } from '~/types/apiTypes'
const props = defineProps<{
  project: Project
}>()
const images = computed(
  () => props.project.images?.map((i) => useStrapiMedia(i.url)) ?? []
)
</script>
<template>
  <section class="pnk-grid">
    <div class="grid-centered-10">
      <ImageGallery :images="images" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
    images: string[]
}>()
</script>

<template>
  <section class="pnk-grid">
    <div class="grid-centered-10">
      <ImageGallery :images="images" />
    </div>
  </section>
</template>

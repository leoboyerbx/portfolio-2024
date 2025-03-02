<script setup lang="ts">
defineProps<{
    images: string[]
}>()
const { target, inView } = useProjectElementInView()
const transition = 'transition-all duration-1000 ease-power4-out'
</script>

<template>
  <div ref="target" class="gallery grid grid-cols-8 gap-4">
    <ImageLightbox
      v-for="image in images"
      :key="image"
      :src="image"
      alt="Gallery Image"
      class="img"
      :class="
        inView
          ? `clip-base opacity-100 ${transition}`
          : ' opacity-0 clip-bottom'
      "
      :style="{ transitionDelay: `${images.indexOf(image) * 100}ms` }"
    />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  .img {
    @apply w-full rounded-lg object-cover overflow-hidden col-span-full;
    @screen md {
      &:nth-child(4n + 1),
      &:nth-child(4n) {
        @apply col-span-5;
      }

      &:nth-child(4n + 2),
      &:nth-child(4n + 3) {
        @apply col-span-3;
      }
    }
  }
}
</style>

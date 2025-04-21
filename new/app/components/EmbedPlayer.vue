<script setup lang="ts">
const props = defineProps<{
    url: string
    thumbnailUrl?: string
}>()
const urlWithAutoplay = computed(() => {
    const url = new URL(props.url)
    url.searchParams.set('autoplay', '1')
    url.searchParams.set('rel', '0')
    return url.toString()
})
const thumb = computed(() => {
    if (props.thumbnailUrl) {
        return props.thumbnailUrl
    }
    if (props.url.startsWith('https://www.youtube.com/embed/')) {
        return (
            `https://img.youtube.com/vi/${
                props.url.split('embed/')[1]
            }/maxresdefault.jpg`
        )
    }
    return ''
})
const clicked = ref(false)
</script>

<template>
  <div
    class="relative aspect-video overflow-hidden border border-slate-500/50 rounded-xl bg-gray-950"
  >
    <iframe
      v-if="clicked"
      :src="urlWithAutoplay"
      frameborder="0"
      class="absolute inset-0 h-full w-full"
      allowfullscreen
    ></iframe>
    <div
      v-else
      class="absolute inset-0 grid h-full w-full place-content-center"
      @click="clicked = true"
    >
      <img
        :src="thumb"
        alt="Video Thumbnail"
        class="absolute inset-0 h-full w-full object-cover opacity-90"
      >
      <button
        class="z-1 grid h-16 w-16 place-content-center rounded-full bg-slate-800/30"
      >
        <Icon name="i-uil:play" class="ml-1 block text-28px" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>

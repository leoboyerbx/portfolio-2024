<script lang="ts" setup>
import { NuxtImg } from '#components'

const props = defineProps<{
  src: string
}>()

const loaded = ref(false)
function onLoad() {
    loaded.value = true
}

const local = computed(() => props.src.startsWith('/'))

// Handle already cached images
onMounted(() => {
  if (local.value) {
    const img = new Image()
    img.src = props.src
    if (img.complete) {
      loaded.value = true
    }
  }
})

function onError() {
  console.error(`Failed to load image: ${props.src}`)
  loaded.value = true // or handle error state differently
}
</script>

<template>
  <img
    v-if="local"
    :src="props.src"
    class="transition duration-200"
    :class="loaded ? 'opacity-100' : 'opacity-0'"
    @load="onLoad"
    @error="onError"
  />
  <NuxtImg
    v-else
    :src="props.src"
    class="transition duration-200"
    :class="loaded ? 'opacity-100' : 'opacity-0'"
    @load="onLoad"
    @error="onError"
  />
</template>

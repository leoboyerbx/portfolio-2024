<script lang="ts" setup>
const props = defineProps<{
    src: string
}>()

const loaded = ref(false)
function onLoad() {
    loaded.value = true
}
// Handle already cached images
onMounted(() => {
    const img = new Image()
    img.src = props.src
    if (img.complete) {
        loaded.value = true
    }
})

function onError() {
    console.error(`Failed to load image: ${props.src}`)
    loaded.value = true // or handle error state differently
}
</script>

<template>
  <img
    :src="props.src"
    class="transition duration-200"
    :class="loaded ? 'opacity-100' : 'opacity-0'"
    @load="onLoad"
    @error="onError"
  >
</template>

<script setup lang="ts">
defineProps<{
    title: string
    embed: string
}>()

const { target, inView } = useProjectElementInView()
const transition = 'transition-all duration-1000 ease-power4-out'
</script>

<template>
  <section ref="target" class="pnk-grid">
    <h2
      v-if="title"
      class="grid-centered-8 section-title mb-8 pb-4 text-center"
      :class="
        inView
          ? `clip-base ${transition}`
          : 'clip-left -translate-x-8 opacity-0'
      "
    >
      {{ title }}
    </h2>
    <div
      class="grid-centered-8"
      :class="
        inView
          ? `opacity-100 delay-200 ${transition}`
          : 'opacity-0 translate-y-8'
      "
    >
      <EmbedPlayer class="w-full" :url="embed" />
    </div>
    <div
      class="text-lg mt-1c prose"
      col="start-2 span-10"
      sm:col="start-3 span-10"
      lg:col="start-3 span-5"
      :class="
        inView
          ? `opacity-100 delay-600 ${transition}`
          : 'opacity-0 translate-y-8'
      "
    >
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
export interface HomeHeroProps {
    beforeName: string
    name: string
    afterName: string
    beforeAdj: string
    vowelPrefix?: string
    afterAdj: string
    adjectives: {
        text: string
        color1: string
        color2: string
        effect: 'wave' | 'shake' | 'blurry'
    }[]
}
</script>

<script setup lang="ts">
const props = defineProps<HomeHeroProps>()
</script>

<template>
  <header id="hero" class="min-h-100vh w-full flex flex-col pb-16 pt-36">
    <div
      class="reveal grid grid-cols-14 md:h-35vh"
      style="animation-delay: 200ms"
    >
      <HeroText :hero="props" col="start-2 span-12" md:col="start-3 span-11" />
    </div>
    <div
      class="reveal grid grid-cols-14 mt-16 md:mt-1/2c"
      style="animation-delay: 400ms"
    >
      <div
        col="start-2 span-10"
        md:col="start-3 span-10"
        class="intro mb-8 max-w-96 flex flex-col gap-3"
        text="lg 2xl:xl"
        font="serif extralight"
      >
        <slot></slot>
      </div>
      <Contacts
        col="start-2 span-10"
        md:col="start-3 span-4"
        class="text-24px"
      />
    </div>
  </header>
</template>

<style>
.intro a {
  text-decoration: underline !important;
}

.reveal {
  animation: reveal 600ms theme('easing.power4-out') both;
  opacity: 0;
}

@keyframes reveal {
  from {
    transform: translateY(24px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

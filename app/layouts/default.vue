<script setup>
const transitions = useTransitions()
</script>

<template>
  <div>
    <MainNav />
    <div class="relative min-h-100vh flex flex-col overflow-clip">
      <div
        class="leaving-item pointer-events-none absolute left-0 block h-300vh w-full duration-700 delay-300 ease-power3-in-out -bottom-6 -top-6"
      >
        <FadeInImage
          src="/img/hero.webp"
          alt="Background image"
          class="h-full w-full blur"
        />
      </div>
      <div
        class="pointer-events-none absolute left-0 z-0 block h-200vh w-full rotate-180 blur grayscale transition-opacity duration-600 -bottom-6"
        :class="
          transitions.isTransitionningToProject ? 'opacity-0' : 'opacity-80'
        "
      >
        <FadeInImage
          src="/img/hero.webp"
          alt="Background image"
          class="h-full w-full blur"
        />
      </div>
      <main class="relative z-10">
        <slot />
      </main>
      <Footer class="leaving-item mt-auto transition duration-300 delay-600" />
    </div>
  </div>
</template>

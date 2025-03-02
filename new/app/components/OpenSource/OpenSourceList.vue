<script setup lang="ts">
const { data: homepage } = await useHomepage()
</script>
<template>
  <section v-if="homepage?.openSource" class="flex flex-col">
    <header class="pnk-grid">
      <ScrollReveal class="grid-centered-8 mb-1c">
        <h2
          class="section-title text-center"
          v-html="homepage.openSource.title"
        ></h2>
      </ScrollReveal>
    </header>
    <article class="pnk-grid">
      <ScrollReveal
        class="mb-12 flex flex-col gap-8"
        col="start-2 span-12"
        md:col="start-2 span-5"
        lg:col="start-3 span-4"
        xl:col="start-3 span-3"
        font="serif extralight"
      >
        <p class="text-lg">
          {{ homepage.openSource.description }}
        </p>
        <p class="text-slate-300 italic">
          {{ homepage.openSource.sideNote }}
        </p>
      </ScrollReveal>
      <ScrollReveal
        :delay="0.15"
        class="flex flex-col"
        col="start-2 span-12"
        md:col="start-8 span-6"
        xl:col="start-8 span-5"
      >
        <OpenSourcePush
          v-for="work in homepage.openSource.projects"
          :key="work.name"
          :work="work"
        ></OpenSourcePush>
      </ScrollReveal>
    </article>
  </section>
</template>

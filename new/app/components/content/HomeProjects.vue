<script setup lang="ts">
const { title, projectsSlugs } = defineProps<{
    title: string
    projectsSlugs: string[]
}>()
</script>

<template>
  <section class="pnk-grid w-full">
    <ScrollReveal class="grid-centered-8 mb-1.5c">
      <h2
        class="section-title leaving-item text-center"
        v-html="title"
      ></h2>
    </ScrollReveal>
    <div class="grid-centered-8 flex flex-col gap-12 sm:gap-36">
      <ProjectPush
        v-for="project in projects.projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { title, projects: projectsSlugs } = defineProps<{
    title: string
    projects: string[]
}>()

const { locale } = useI18n()

const { data: projects } = await useAsyncData(
    `home-projects-${locale.value}`,
    async () => {
        const result = await queryCollection('projects')
            .where('slug', 'IN', projectsSlugs)
            .where('locale', '=', locale.value)
            .all()
        return result
    },
    {
        dedupe: 'defer',
    },
)
</script>

<template>
  <section id="projects" class="pnk-grid w-full">
    <ScrollReveal class="grid-centered-8 mb-1.5c">
      <h2
        class="section-title leaving-item text-center"
        v-html="title"
      ></h2>
    </ScrollReveal>
    <div class="grid-centered-8 flex flex-col gap-12 sm:gap-36">
      <ProjectPush
        v-for="project in projects"
        :key="project.stem"
        :project="project"
      />
    </div>
  </section>
</template>

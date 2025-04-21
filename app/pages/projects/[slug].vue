<script setup lang="ts">
const { t, locale } = useI18n()

const { slug } = useRoute().params
const { data: project } = await useAsyncData(
    `project-${slug}-${locale.value}`,
    async () => {
        const result = await queryCollection('projects').path(`/projects/${locale.value}/${slug}`).first()
        return result
    },
    {
        dedupe: 'defer',
    },
)

if (!project.value) {
    showError({
        statusCode: 404,
        statusMessage: 'Project Not Found',
    })
}
</script>

<template>
  <div v-if="project" class="mb-36 flex flex-col gap-1.5c">
    <Title>{{ project.name }}</Title>
    <Meta
      name="description"
      :content="
        t('project.description', {
          nameAndBaseline: `${project.name} - ${project.baseline}`,
        })
      "
    />
    <ProjectHero :project="project" />
    <ContentRenderer :value="project" :prose="false" class="flex flex-col gap-1.5c" />
    <!-- <ProjectDescription :project="project" />
    <ProjectVideo v-if="project.video" :project="project" />
    <ProjectImages v-if="project.images?.length" :project="project" /> -->
  </div>
</template>

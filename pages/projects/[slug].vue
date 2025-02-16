<script setup lang="ts">
import type { Project } from '~/types/apiTypes'

const { t, locale } = useI18n()
const { find } = useStrapi()

const { slug } = useRoute().params
const { data: project } = await useGlobalRefreshAsyncData(
  `post-single-${slug}-${locale.value}`,
  async () => {
    const { data } = await find<Project>('projects', {
      populate: '*',
      filters: { slug },
      locale: locale.value as any,
    })
    return data[0] as unknown as Project
  },
  {
    dedupe: 'defer',
  }
)
if (!project?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
}
</script>
<template>
  <div class="mb-36 flex flex-col gap-1.5c">
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
    <ProjectDescription :project="project" />
    <ProjectVideo v-if="project.video" :project="project" />
    <ProjectImages v-if="project.images?.length" :project="project" />
  </div>
</template>

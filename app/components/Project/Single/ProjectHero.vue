<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
    project: ProjectsCollectionItem
}>()

const { target, inView } = useProjectElementInView()

const transition = 'transition-all duration-1000 ease-power4-out'
</script>

<template>
  <header ref="target" class="pnk-grid pt-36">
    <div
      class="project-thumb relative row-start-1 aspect-16/10 overflow-hidden border border-slate-300/50 rounded-xl"
      col="start-2 span-12"
      md:col="start-2 span-8"
    >
      <NuxtImg
        :src="project.thumbnail"
        width="1248"
        height="780"
        :alt="`Thumb for ${project.name}`"
        class="h-full w-full object-cover opacity-85"
      />
    </div>
    <div
      class="relative flex flex-col items-end text-right my-1c"
      col="start-2 span-12"
      md="row-start-1 self-end "
      md:col="start-5 span-8"
      lg:col="start-7 span-6"
    >
      <h1
        class="text-9vw font-black leading-120%"
        :class="
          inView
            ? `clip-base ${transition}`
            : 'clip-right translate-x-24 opacity-0'
        "
      >
        {{ project.name }}
      </h1>

      <p
        class="text-6 font-light font-serif md:(pl-8 ml-2c)"
        :class="
          inView
            ? `clip-base delay-200 ${transition}`
            : 'clip-right translate-x-16 opacity-0'
        "
      >
        {{ project.baseline }}
      </p>
    </div>
    <div
      v-if="project.links?.length > 0"
      class="flex gap-2 md:(mt-6 -mx-1) lt-md:(flex-wrap -mx-2)"
      col="start-2 span-10"
      md:col="start-2 span-8"
    >
      <div
        v-for="(link, i) in project.links"
        :key="link.url"
        :class="
          inView ? `opacity-100 ${transition}` : 'opacity-0 translate-y-8'
        "
        :style="{ transitionDelay: `${i * 100 + 400}ms` }"
      >
        <Button
          :href="link.url"
          :target="link.newTab ? '_blank' : ''"
          :icon="link.newTab ? 'i-uil:external-link-alt' : ''"
        >
          {{ link.title }}
        </Button>
      </div>
    </div>
  </header>
</template>

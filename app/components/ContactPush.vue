<script setup lang="ts">
const { data: homepage } = await useHomepage()
</script>

<template>
  <section v-if="homepage" class="pnk-grid pb-6">
    <header class="grid-centered-8">
      <ScrollReveal class="mb-16">
        <h2
          class="section-title text-center"
          v-html="homepage.contact.title"
        ></h2>
      </ScrollReveal>
    </header>
    <article class="grid-centered-8 flex flex-wrap justify-center gap-5">
      <ScrollReveal
        v-for="(link, i) in homepage.contact.links"
        :key="link.url"
        :delay="i * 0.15"
      >
        <Button :href="link.url" :target="link.newTab ? '_blank' : ''">
          {{ link.title }}
        </Button>
      </ScrollReveal>
    </article>
  </section>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <ScrollReveal tag="footer" class="relative pnk-grid pb-12 pt-1c">
    <div
      class="grid-centered-10 flex items-center justify-between gap-x-12 gap-y-2 border border-slate-500/50 rounded-full from-indigo-600/10 to-yellow-200/10 bg-gradient-to-r px-8 py-4 backdrop-blur-xl"
      lt-sm="flex-col rounded-xl"
    >
      <!-- older variant: class="grid-centered-8 flex items-center" -->
      <section class="flex items-center gap-1 text-sm">
        © {{ currentYear }} -
        <a
          href="https://pnk.studio/"
          class="mb-px flex items-center gap-1 text-slate-400 font-extrabold transition duration-200 hover:(text-slate-50 underline)"
          target="_blank"
        >
          <Icon name="i-uil:mountains-sun" class="mb-0.5 inline-block text-lg" />
          <span>pnk.studio</span>
        </a>
      </section>
      <section class="flex items-center">
        <a
          :href="`/api/${$i18n.locale}/resume.pdf`"
          target="_blank"
          class="flex items-center text-sm font-medium opacity-50 transition duration-200 hover:opacity-100"
        >
          <Icon name="i-uil:file-alt" class="mr-1 block" /> CV
        </a>
        <span class="mx-2 text-sm font-light">-</span>
        <Contacts class="text-18px" :extended="true" />
      </section>
    </div>
  </ScrollReveal>
</template>

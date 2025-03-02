<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
const { enabled, refresh, autoRefresh } = usePreview()

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
const { height } = useWindowSize()
</script>
<template>
  <ClientOnly>
    <UseDraggable
      v-if="enabled"
      ref="el"
      class="fixed flex items-center border border-slate-600 rounded bg-gray-900/60 py-2 pl-3 pr-4 z-10000 transition-opacity backdrop-blur-xl"
      :handle="handle"
      :initial-value="{
        x: 24,
        y: height - 72,
      }"
    >
      <button
        ref="handle"
        class="flex cursor-grab border border-transparent rounded py-1.5 text-14px transition active:cursor-grabbing hover:bg-white/20"
      >
        <span class="i-uil:draggabledots"></span>
      </button>
      <span class="pl-2 pr-3 text-sm"> Preview mode enabled </span>

      <button
        class="flex border border-transparent rounded p-1.5 transition hover:bg-white/20"
        :class="
          autoRefresh ? 'border-white/50 bg-white/10' : 'border-transparent'
        "
        @click="autoRefresh = !autoRefresh"
      >
        <span class="i-uil:cloud-redo"></span>
      </button>
      <button
        class="flex border border-transparent rounded p-1.5 transition hover:bg-white/20"
        @click="refresh"
      >
        <span class="i-uil:redo"></span>
      </button>
      <button
        class="flex border border-transparent rounded p-1.5 transition hover:bg-white/20"
        @click="enabled = false"
      >
        <span class="i-uil:times-circle"></span>
      </button>
    </UseDraggable>
  </ClientOnly>
</template>

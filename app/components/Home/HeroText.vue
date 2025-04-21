<script setup lang="ts">
import type { HomeHeroProps } from '../content/HomeHero.vue'
import isVowel from '~/utils/isVowel'

const props = defineProps<{
    hero: HomeHeroProps
}>()

const { locale } = useI18n()

const texts = computed(() => props.hero.adjectives ?? [])

const defaultTextWidth = locale.value === 'fr' ? 361 : 450 // Default values for ssr on 1080p
const textWidths = ref<number[]>([])
const textElements = ref<HTMLElement[]>()
const currentText = ref(0)
const currentTextWidth = computed(() => {
    return textWidths.value[currentText.value] ?? defaultTextWidth
})

const isResizing = ref(true)
async function computeWidths() {
    if (!textElements.value)
        return
    isResizing.value = true
    // await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    for (let i = 0; i < textElements.value.length; i++) {
        textWidths.value[i] = textElements.value[i]?.offsetWidth ?? defaultTextWidth
    }
    isResizing.value = false
}

onMounted(() => {
    computeWidths()
})
useEventListener('resize', () => {
    computeWidths()
})

useIntervalFn(() => {
    currentText.value = (currentText.value + 1) % texts.value.length
}, 3000)
</script>

<template>
  <h1
    class="flex flex-col items-start self-end font-black leading-110%"
    text="12 md:6vw"
  >
    <span class="line" style="--line-index: 0">
      <span class="line-content">
        👋 <br class="sm:hidden">{{ hero.beforeName
        }}<span class="text-theme">{{ hero.name }}</span>{{ hero.afterName }}
      </span>
    </span>
    <span class="line" style="--line-index: 1">
      <span class="line-content">
        <span class="mr-0.25em">{{ hero.beforeAdj }}<br
          v-if="locale === 'fr'"
          class="sm:hidden"
        ></span>
        <span
          class="relative inline-block"
          :style="{
            width: `${currentTextWidth}px`,
            transition: isResizing ? 'none' : 'width 0.3s',
          }"
        >
          <span
            v-for="(text, i) in texts"
            :key="text.text[1]"
            ref="textElements"
            class="left-0 top-0 items-baseline whitespace-nowrap"
            :class="[
              i === texts.length - 1 ? 'relative' : 'absolute',
              currentText === i ? '' : 'pointer-events-none select-none',
            ]"
          >
            <span
              v-if="!!hero.vowelPrefix && isVowel(text.text[0])"
              class="mr-0.25em transition-opacity duration-200 -ml-0.25em"
              :class="[
                currentText === i ? 'opacity-100' : 'opacity-0 delay-50',
              ]"
            >{{ hero.vowelPrefix }}
            </span>
            <TextEffect
              class="transition-opacity"
              :class="[
                currentText === i ? 'opacity-100 delay-200' : 'opacity-0',
              ]"
              :text="text.text"
              :colors="[text.color1, text.color2]"
              :effect="text.effect"
            />
          </span>
        </span>
        <span class="ml-1">{{ hero.afterAdj }}</span>
      </span>
    </span>
  </h1>
</template>

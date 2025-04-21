<script setup lang="ts">
import type { AnimationControls, AnimationOptionsWithOverrides, MotionKeyframesDefinition } from 'motion'
import type { PropType } from 'vue'
import {
    animate,

} from 'motion'

const props = defineProps({
    effect: {
        type: String as PropType<keyof typeof effects>,
        default: 'default',
    },
    delay: {
        type: Number,
        default: 0,
    },
    tag: {
        type: String as PropType<keyof HTMLElementTagNameMap>,
        default: 'div',
    },
})

const effects: Record<
    string,
    [MotionKeyframesDefinition, AnimationOptionsWithOverrides?]
> = {
    default: [{ y: [32, 0], opacity: [0, 1] }, { duration: 0.8 }],
} as const

const effect = computed(() => effects[props.effect])
const target = ref<HTMLElement>()

let animation: AnimationControls
onMounted(() => {
    if (!target.value || !effect.value)
        return
    animation = animate(target.value, effect.value[0], {
        ...effect.value[1],
        delay: props.delay,
    })
    animation.pause()
})

onElementInView(target, () => {
    animation?.play()
})
</script>

<template>
  <component :is="tag" ref="target">
    <slot />
  </component>
</template>

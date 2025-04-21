<script setup lang="ts">
const props = defineProps({
    href: {
        type: String,
        required: false,
        default: null,
    },
    color: {
        type: String as PropType<'primary' | 'secondary' | 'neutral'>,
        required: false,
        default: 'neutral',
    },
    icon: {
        type: String,
        required: false,
        default: null,
    },
    iconBefore: {
        type: Boolean,
        required: false,
        default: false,
    },
})
const tag = props.href ? 'a' : 'button'

const hasBeenClicked = ref(false)
</script>

<template>
  <component
    v-bind="props"
    :is="tag"
    class="pnk-btn btn-animation"
    :class="[{ 'btn-animation': hasBeenClicked }, `pnk-btn-${color}`]"
    @click="hasBeenClicked = true"
  >
    <slot />
    <Icon
      v-if="icon"
      :name="icon"
      :class="{ '-order-1': iconBefore }"
      class="text-sm"
    />
  </component>
</template>

<style scoped>
.pnk-btn-neutral {
  --color: theme('colors.slate.50');
}
.pnk-btn {
  @apply border rounded-full px-5 py-1.5 font-light transition duration-200 inline-flex items-center gap-2;
  color: var(--color);
  --bg-opacity: 15%;
  --border-opacity: 40%;
  border-color: color-mix(
    in srgb,
    var(--color) var(--border-opacity),
    transparent
  );
  background-color: color-mix(
    in srgb,
    var(--color) var(--bg-opacity),
    transparent
  );
}

.pnk-btn:hover {
  --bg-opacity: 10%;
}
</style>

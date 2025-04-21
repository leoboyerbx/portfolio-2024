<script setup lang="ts">
// Define page meta to override any inherited meta
const error = useError()
if (!error.value) {
    await navigateTo('/')
}
const { t } = useI18n()
const statusCode = computed(() => error.value?.statusCode)

const reversedCode = computed(() =>
    statusCode.value?.toString().split('').reverse().join(''),
)
console.error('Error Below')
console.error(error)
const localePath = useLocalePath()

const nav = useMainNav()
onMounted(() => {
    nav.value.hideNav = true
})
onBeforeUnmount(() => {
    nav.value.hideNav = false
})
</script>

<template>
  <NuxtLayout>
    <header class="pnk-grid pt-25vh">
      <!-- Double reverse for z-index -->
      <h1 col="start-3 span-8" class="flex flex-row-reverse justify-end">
        <span v-for="(digit, i) in reversedCode" :key="i" class="digit">{{
          digit
        }}</span>
      </h1>
      <div col="start-3 span-5" class="mt-4vw text-2xl font-semibold">
        <p v-if="statusCode === 404">
          <span>{{ t('error.404.beforeEffect') }}</span>
          <TextEffect
            class="transition-opacity"
            :text="t('error.404.effect')"
            :colors="['#ff6699', '#fce14b']"
            effect="wave"
          />
          <span>{{ t('error.404.afterEffect') }}</span>
        </p>
        <p v-else>
          <span>{{ t('error.generic.beforeEffect') }}</span>
          <TextEffect
            class="transition-opacity"
            :text="t('error.generic.effect')"
            :colors="['#ff6699', '#fce14b']"
            effect="wave"
          />
          <span>{{ t('error.generic.afterEffect') }}</span>
        </p>
      </div>
      <div col="start-3 span-8" class="mt-8 -mx-2">
        <Button @click="navigateTo(localePath('/'))">
          {{
            t('error.back')
          }}
        </Button>
      </div>
      <!-- <DevOnly> -->
      <div class="grid-centered-10 mt-8">
        <pre>
            {{ error?.message }}
          </pre>
      </div>
      <!-- </DevOnly> -->
    </header>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.digit {
  @apply text-16vw leading-100% font-black -mr-2.5vw text-slate-100;
  filter: drop-shadow(30px 0px 6px #22222233);
}
</style>

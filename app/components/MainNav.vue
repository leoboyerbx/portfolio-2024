<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { getLenis } from '~/plugins/lenis.client'

const shared = useMainNav()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

const distancesFromTop = computedWithControl(
    () => shared.value.targets,
    () => {
        const result = []
        for (const target of shared.value.targets) {
            if (target?.getBoundingClientRect) {
                result.push(window.scrollY + target.getBoundingClientRect().top)
            }
        }
        return result
    },
)

useEventListener('resize', () => {
    distancesFromTop.trigger() // Recompute distances on resize
})

const { t, locale } = useI18n()
const links = computed(() => ({
    hero: t('nav.hero'),
    projects: t('nav.projects'),
    openSource: t('nav.openSource'),
    contact: t('nav.contact'),
}))

function scrollTo(linkId: string) {
    const target = document.getElementById(linkId)
    if (!target)
        return
    getLenis().scrollTo(target, {
        offset: -128,
        duration: 1,
        easing: power4.inOut.toFunction(),
    })
}

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 0)

const route = useRoute()
const showNav = computed(() => !!route.meta.isHomePage && !shared.value.hideNav)

const navEl = ref<HTMLElement>()
const menuEl = ref<HTMLElement>()
const backEl = ref<HTMLElement>()
const { width: windowWidth } = useWindowSize()
const { width: backWidth } = useElementBounding(backEl)
const { width: menuWidth } = useElementBounding(menuEl)
const responsiveMenuWith = computed(() =>
    isMobile.value ? windowWidth.value * (12 / 14) : menuWidth.value,
)

const width = computed(() => {
    if (!navEl.value)
        return 0
    return Math.round(showNav.value ? responsiveMenuWith.value : backWidth.value)
})

const router = useRouter()
const localePath = useLocalePath()
function goBack() {
    if (window.history.state.back) {
        router.back()
    }
    else {
        router.push(localePath('/'))
    }
}

const offset = 192
const currentTarget = computedWithControl(
    () => [y.value, isMobile.value, distancesFromTop.value],
    () => {
        if (!isMobile.value) {
            return 0
        }
        if (distancesFromTop.value.length === 0) {
            return 0
        }
        for (let i = distancesFromTop.value.length - 1; i >= 0; i--) {
            if (distancesFromTop.value[i] && (distancesFromTop.value[i]! < y.value + offset)) {
                return i
            }
        }
        return 0
    },
)

const listEl = ref<HTMLElement>()
const { height: listHeight } = useElementBounding(listEl)
const mobileMenuOpen = ref(false)

const mounted = useMounted()
</script>

<template>
  <div
    class="pointer-events-none fixed left-0 top-0 z-50 w-full px-8 py-7"
    :class="
      mounted
        ? 'delay-500 transition duration-600 ease-power4-out'
        : 'transform translate-y-2 opacity-0'
    "
  >
    <!-- {{ store.distancesFromTop }} -->
    <!-- {{ y }} -->
    <!-- {{ isMobile }} -->
    <!-- {{ currentTarget }} -->
    <nav
      ref="navEl"
      class="nav-transition nav-bg pointer-events-auto absolute flex overflow-clip rounded-28px"
      :style="{
        width: `${width}px`,
        height: `${isMobile && mobileMenuOpen ? listHeight + 24 : 56}px`,
        left: showNav ? '50%' : '24px',
        transform: showNav ? 'translateX(-50%)' : 'none',
      }"
      :class="{ transparent: !scrolled && showNav }"
    >
      <button
        ref="backEl"
        :aria-label="t('nav.backToHome')"
        class="child-transition btn-animation block flex-shrink-0 px-3.5"
        :style="{
          transform: showNav ? `translateX(-100%)` : '',
        }"
        @click="goBack"
      >
        <Icon name="i-uil:arrow-left" class="block text-28px" />
      </button>

      <div
        ref="menuEl"
        class="child-transition relative flex flex-shrink-0 items-start px-6 pt-3"
        lt-sm="w-full"
        sm="px-8 py-2 gap-2"
        :style="{
          transform: showNav ? `translateX(-${backWidth}px)` : '',
        }"
      >
        <div
          class="h-8 flex items-center transition-opacity duration-200 -ml-1 sm:hidden"
          :class="{ 'opacity-0': !showNav }"
        >
          <button
            class="nav-link btn-animation grid h-7 w-7 flex-shrink-0 place-content-center"
            :aria-label="t('nav.openMenu')"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon
              name="i-uil:bars"
              class="col-start-1 row-start-1 block text-20px transition duration-200"
              :class="
                mobileMenuOpen
                  ? 'scale-0 ease-power2-in'
                  : 'delay-100 ease-power2-out'
              "
            />
            <Icon
              name="i-uil:times"
              class="col-start-1 row-start-1 block text-22px transition duration-200"
              :class="
                !mobileMenuOpen
                  ? 'scale-0 ease-power2-in'
                  : 'delay-100 ease-power2-out'
              "
            />
          </button>
        </div>
        <transition mode="out-in">
          <div :key="locale" class="relative h-8 flex-grow sm:h-10" lt-sm="h-8">
            <ul
              ref="listEl"
              class="flex transition-transform duration-400 ease-power4-in-out"
              lt-sm="flex-col absolute top-0 left-0 items-start"
              sm="items-center gap-2"
              md="gap-4"
              :style="{
                transform: `translateY(${currentTarget * -32 * +!mobileMenuOpen}px)`,
              }"
            >
              <li
                v-for="(title, linkId, i) in links"
                :key="linkId"
                class="flex-shrink-0 transition-opacity duration-300"
                :class="
                  (showNav && i === currentTarget) || mobileMenuOpen
                    ? 'delay-100'
                    : 'lt-sm:opacity-0 delay-0'
                "
              >
                <a
                  :href="`#${linkId}`"
                  class="nav-link btn-animation block px-2 py-1 sm:(px-3 py-2)"
                  @click.prevent="scrollTo(linkId), (mobileMenuOpen = false)"
                >
                  {{ title }}
                </a>
              </li>
            </ul>
          </div>
        </transition>
        <div class="ml-4 h-8 flex flex-shrink-0 items-center -mr-2 sm:h-10">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
$duration: 0.5s;
$ease: theme('easing.power4-in-out');
.nav-transition {
  transition:
    transform $duration $ease,
    width $duration $ease,
    height 400ms theme('easing.power4-in-out'),
    left $duration $ease,
    background-color 0.2s,
    border-color 0.2s;
}
.child-transition {
  transition: transform $duration $ease;
}
</style>

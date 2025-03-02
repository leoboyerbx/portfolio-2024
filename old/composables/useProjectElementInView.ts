import { inView as motioninView } from 'motion'
export const useProjectElementInView = (
  options: Parameters<typeof onElementInView>[2] & { leaving?: boolean } = {},
  target?: MaybeRef<HTMLElement | undefined>
) => {
  const inView = ref(false)
  target = target || ref<HTMLElement>()

  let cleanup: VoidFunction
  if (!options.margin) options.margin = '0px 50px -10% 50px'
  onBeforeUnmount(() => cleanup?.())
  const startWatchingElement = () => {
    const el = unref(target)
    if (!el) return
    cleanup = motioninView(
      el,
      (entry: IntersectionObserverEntry) => {
        inView.value = entry.isIntersecting
        if (options.leaving) {
          return () => {
            inView.value = false
          }
        }
      },
      options
    )
  }

  const store = useTransitionsStore()
  if (!store.isTransitionningToProject) {
    onMounted(startWatchingElement)
  } else {
    watch(
      () => store.isTransitionningToProject,
      () => startWatchingElement(),
      { once: true }
    )
  }

  return { inView, target }
}

import { inView } from 'motion'

export function onElementInView(
    target: MaybeRef<HTMLElement | undefined>,
    callback: (entry: IntersectionObserverEntry) => any,
    options: Parameters<typeof inView>[2] = {},
) {
    let cleanup: VoidFunction
    if (!options.margin)
        options.margin = '0px 50px -10% 50px'
    onMounted(() => {
        const el = unref(target)
        if (!el)
            return
        cleanup = inView(el, callback, options)
    })
    onBeforeUnmount(() => cleanup?.())
}

export default function useElementInView(
    options: Parameters<typeof onElementInView>[2] & { leaving?: boolean } = {},
    target?: MaybeRef<HTMLElement | undefined>,
) {
    target = target || ref<HTMLElement>()
    const inView = ref(false)
    onElementInView(
        target,
        (entry) => {
            inView.value = entry.isIntersecting
            if (options.leaving) {
                return () => {
                    inView.value = false
                }
            }
        },
        options,
    )
    return { inView, target }
}

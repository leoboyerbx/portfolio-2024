export const useMainNavStore = defineStore('mainNav', () => {
    const targets = ref<HTMLElement[]>([])
    const distancesUpdate = ref(0) // shitty solution, temp
    const distancesFromTop = computed(() => {
        const result = []
        for (const target of targets.value) {
            if (target?.getBoundingClientRect) {
                result.push(window.scrollY + target.getBoundingClientRect().top)
            }
        }
        distancesUpdate.value // meh
        return result
    })

    useEventListener('resize', () => {
        distancesUpdate.value++ // erf
    })

    const setTargets = (...elements: HTMLElement[]) => {
        targets.value = elements
    }

    return { targets, distancesFromTop, setTargets }
})

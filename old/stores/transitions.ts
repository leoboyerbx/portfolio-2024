export const useTransitionsStore = defineStore('transitions', () => {
  const isTransitionningToProject = ref(false)

  const linkRect = ref<DOMRect>()
  const isLeaving = ref(false)

  return { linkRect, isTransitionningToProject, isLeaving }
})

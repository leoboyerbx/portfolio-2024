export function useTransitions() {
    return useState('transitions', () => ({
        isTransitionningToProject: false,
        linkRect: undefined as DOMRect | undefined,
        isLeaving: false,
    }))
}

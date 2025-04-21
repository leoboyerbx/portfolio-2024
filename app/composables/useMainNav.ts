export function useMainNav() {
    return useState('mainNav', () => ({
        targets: [] as HTMLElement[],
        hideNav: false,
    }))
}

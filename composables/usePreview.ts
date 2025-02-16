export const bus = useEventBus('refresh')

export default function usePreview() {
    const refresh = () => {
        bus.emit()
    }
    const { enabled } = usePreviewMode({
        shouldEnable: () => {
            return !!import.meta.dev || window?.location.host.startsWith('preview')
        },
    })
    const autoRefresh = ref(enabled.value)

    const runAutoRefresh = () => {
        if (enabled.value && autoRefresh.value) {
            refresh()
        }
    }
    if (enabled.value) {
        const visibility = useDocumentVisibility()
        whenever(() => visibility.value === 'visible', runAutoRefresh)
        const focus = useWindowFocus()
        whenever(focus, runAutoRefresh)

        useIntervalFn(runAutoRefresh, 2000)
    }

    return { enabled, refresh, autoRefresh }
}

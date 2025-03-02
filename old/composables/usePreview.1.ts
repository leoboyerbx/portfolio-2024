import { bus } from './usePreview'

export default function usePreview() {
    const route = useRoute()
    const refresh = () => {
        bus.emit()
    }
    const { enabled } = usePreviewMode({
        shouldEnable: () => {
            return !!route.query.previewEnabled
        },
    })
    return
}

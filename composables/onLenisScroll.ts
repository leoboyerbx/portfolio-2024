import type Lenis from '@studio-freight/lenis/types'
import { getLenis } from '~/plugins/lenis.client'

export default function (callback: (e: Lenis) => void) {
    let cleanup: () => void
    onMounted(() => {
        const lenis = getLenis()
        cleanup = lenis.on('scroll', callback)
    })

    onUnmounted(() => {
        if (cleanup) cleanup()
    })
}

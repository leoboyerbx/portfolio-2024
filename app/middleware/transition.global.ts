import { animate } from 'motion'
import { getLenis } from '~/plugins/lenis.client'

// @unocss-include
export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server)
        return

    const store = useTransitions()

    if (store.value.isTransitionningToProject) {
        from.meta.pageTransition = {
            name: 'toProject',
            mode: 'out-in',
            css: false,
            async onLeave(_, done) {
                document.body.classList.add('leaving-page')
                await until(() => store.value.isLeaving).toBe(false)
                document.body.classList.remove('leaving-page')
                done()
            },
        }
        to.meta.scrollToTop = false
        to.meta.pageTransition = {
            mode: 'out-in',
            css: false,
            async onEnter(el, done) {
                const thumb = el.querySelector('.project-thumb')
                const linkThumbRect = store.value.linkRect
                if (!thumb || !linkThumbRect) {
                    done()
                    return
                }
                // FLIP animation: First -> Last -> Invert -> Play
                // First

                // Last
                thumb.classList.remove('flip-first')
                const targetRect = thumb.getBoundingClientRect()
                const targetTop = targetRect.top + window.scrollY

                // Invert
                const invertX = linkThumbRect.left - targetRect.left
                const invertY = linkThumbRect.top - targetTop

                thumb.setAttribute(
                    'style',
                    `
          position: fixed;
          top: ${targetTop}px;
          left: ${targetRect.left}px;
          width: ${targetRect.width}px;
          height: ${targetRect.height}px;
          transform-origin: 0 0;
        `,
                )

                const lenis = getLenis()
                lenis.scrollTo(0, {
                    duration: 0.9,
                    easing: power4.inOut.toFunction(),
                    lock: true,
                })
                await animate(
                    thumb,
                    {
                        transform: [
                            `translate(${invertX}px, ${invertY}px)`,
                            'translate(0, 0) scale(1)',
                        ],
                        width: [`${linkThumbRect.width}px`, `${targetRect.width}px`],
                        height: [`${linkThumbRect.height}px`, `${targetRect.height}px`],
                    },
                    {
                        duration: 0.9,
                        easing: power4.inOut,
                    },
                ).finished

                thumb.removeAttribute('style')
                store.value.isTransitionningToProject = false
                store.value.linkRect = undefined
                done()
            },
        }
    }
    else {
        to.meta.pageTransition = {
            name: 'default-page',
            mode: 'out-in',
            onBeforeLeave() {
                getLenis().stop()
            },
            onAfterEnter() {
                getLenis().start()
            },
        }
        from.meta.pageTransition = to.meta.pageTransition
    }
})

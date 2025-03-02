import Lenis from 'lenis'

let lenisInstance: Lenis
export const getLenis = () => lenisInstance

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:beforeMount', () => {
        const lenis = new Lenis()
        lenisInstance = lenis
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    })
})

import { cubicBezier } from '@motionone/easing'

class BezierEasing extends Array {
    constructor(...args: number[]) {
        super(...args)
        this.length = 4
    }

    toFunction() {
        return cubicBezier(this[0], this[1], this[2], this[3])
    }
}

export const sine = {
    in: new BezierEasing(0.47, 0, 0.745, 0.715),
    out: new BezierEasing(0.39, 0.575, 0.565, 1),
    inOut: new BezierEasing(0.445, 0.05, 0.55, 0.95),
} as const
export const power2 = {
    in: new BezierEasing(0.55, 0.085, 0.68, 0.53),
    out: new BezierEasing(0.25, 0.46, 0.45, 0.94),
    inOut: new BezierEasing(0.455, 0.03, 0.515, 0.955),
} as const
export const power3 = {
    in: new BezierEasing(0.55, 0.055, 0.675, 0.19),
    out: new BezierEasing(0.215, 0.61, 0.355, 1),
    inOut: new BezierEasing(0.645, 0.045, 0.355, 1),
} as const
export const power4 = {
    in: new BezierEasing(0.895, 0.03, 0.685, 0.22),
    out: new BezierEasing(0.165, 0.84, 0.44, 1),
    inOut: new BezierEasing(0.77, 0, 0.175, 1),
} as const
export const power5 = {
    in: new BezierEasing(0.755, 0.05, 0.855, 0.06),
    out: new BezierEasing(0.23, 1, 0.32, 1),
    inOut: new BezierEasing(0.86, 0, 0.07, 1),
} as const
export const expo = {
    in: new BezierEasing(0.95, 0.05, 0.795, 0.035),
    out: new BezierEasing(0.19, 1, 0.22, 1),
    inOut: new BezierEasing(1, 0, 0, 1),
} as const
export const circ = {
    in: new BezierEasing(0.6, 0.04, 0.98, 0.335),
    out: new BezierEasing(0.075, 0.82, 0.165, 1),
    inOut: new BezierEasing(0.785, 0.135, 0.15, 0.86),
} as const
export const back = {
    in: new BezierEasing(0.6, -0.28, 0.735, 0.045),
    out: new BezierEasing(0.175, 0.885, 0.32, 1.275),
    inOut: new BezierEasing(0.68, -0.55, 0.265, 1.55),
} as const

// Elastic easing from gsap
function easeInOutFromOut(easeOut: (t: number) => number) {
    return (p: number) =>
        p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2
}
const _2PI = 2 * Math.PI
function buildElastic(type: 'in' | 'out' | 'inOut', amplitude: number, period: number) {
    const p1 = amplitude >= 1 ? amplitude : 1 // note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
    let p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1)
    const p3 = (p2 / _2PI) * (Math.asin(1 / p1) || 0)
    const easeOut = (p: number) =>
        p === 1 ? 1 : p1 * 2 ** (-10 * p) * Math.sin((p - p3) * p2) + 1
    const ease
    = type === 'out'
        ? easeOut
        : type === 'in'
            ? (p: number) => 1 - easeOut(1 - p)
            : easeInOutFromOut(easeOut)
    p2 = _2PI / p2 // precalculate to optimize
    return ease
}

export const elastic = {
    out: (amplitude: number, period: number) =>
        buildElastic('out', amplitude, period),
    in: (amplitude: number, period: number) =>
        buildElastic('in', amplitude, period),
    inOut: (amplitude: number, period: number) =>
        buildElastic('inOut', amplitude, period),
} as const

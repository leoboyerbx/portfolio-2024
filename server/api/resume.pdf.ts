import proxyResume from "../utils/proxyResume"

export default defineEventHandler((event) => {
    return proxyResume(event)
})

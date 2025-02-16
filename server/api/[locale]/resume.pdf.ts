import proxyResume from "~/server/utils/proxyResume"

export default defineEventHandler((event) => {
    return proxyResume(event, getRouterParam(event, 'locale'))
})

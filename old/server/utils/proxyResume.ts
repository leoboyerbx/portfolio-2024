export default async function proxyResume(event: H3Event, locale = 'en') {
  const url = process.env.STRAPI_URL ?? 'http://localhost:1337'
  const { data } = (await $fetch(url + '/api/homepage', {
    query: {
      populate: 'resume',
      locale,
    },
  })) as any
  if (!data.resume) {
    throw createError({ statusCode: 404 })
  }
  return proxyRequest(event, url + data.resume.url)
}

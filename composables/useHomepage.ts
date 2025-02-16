export async function useHomepage() {
  const { locale } = useI18n()
  const { findOne } = useStrapi()

  const { data } = await useGlobalRefreshAsyncData(
    'homepage-' + locale.value,
    async () => {
      const result = await findOne<Homepage>('homepage', undefined, {
        populate:
          'hero.adjectives,projects.projects.thumbnail,openSource.projects,contact.links',
        locale: locale.value as any,
      })
      return result.data as unknown as Homepage
    },
    {
      dedupe: 'defer',
    }
  )

  return { data }
}

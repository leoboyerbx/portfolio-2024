export async function useStrapiHomepage() {
  const { locale } = useI18n()
  const { findOne } = useStrapi()

  const { data } = await useGlobalRefreshAsyncData(
    'homepage-strapi-' + locale.value,
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

export async function useContentHomepage() {
  const { locale } = useI18n()
  const {data} = useAsyncData(
    'homepage-' + locale.value,
    () => queryCollection('homepage').where('locale', '=', locale.value).first()
  )
  return data
}

export async function useHomepage() {
  return useStrapiHomepage()
}

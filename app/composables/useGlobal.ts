export async function useGlobal() {
    const { locale } = useI18n()
    const { data } = await useAsyncData(
        `global-${locale.value}`,
        async () => {
            const result = await queryCollection('global').where('locale', '=', locale.value).first()
            return result
        },
        {
            dedupe: 'defer',
        },
    )
    return data
}

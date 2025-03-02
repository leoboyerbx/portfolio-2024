export default function useGlobalRefreshAsyncData<T>(
  key: string,
  handler: Parameters<typeof useAsyncData<T>>[1],
  options: Parameters<typeof useAsyncData<T>>[2] = undefined
) {
  const bus = useEventBus('refresh')
  const result = useAsyncData<T>(key, handler, options)

  bus.on(() => result.refresh())

  return result
}

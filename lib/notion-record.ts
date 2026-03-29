import { type Block, type ExtendedRecordMap } from 'notion-types'

export function getRecordValue<T>(record: unknown): T | null {
  if (!record) {
    return null
  }

  let value = record as any
  while (value && typeof value === 'object' && 'value' in value) {
    value = value.value
  }

  return value as T
}

export function getPageBlock(
  recordMap: ExtendedRecordMap,
  pageId?: string
): Block | null {
  const blockId = pageId ?? Object.keys(recordMap.block || {})[0]
  if (!blockId) {
    return null
  }

  const blockRecord = recordMap.block?.[blockId]
  if (!blockRecord) {
    return null
  }

  return getRecordValue<Block>(blockRecord)
}

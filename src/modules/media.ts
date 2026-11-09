const MINIO_ORIGIN = 'http://localhost:9000'

export const mediaUrl = (url?: string) => (url ? url.replace(MINIO_ORIGIN, '') : '')

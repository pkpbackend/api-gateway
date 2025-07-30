import { SYNC_KEY } from '../config/env'

export default async function SyncMiddleware(req, res, next) {
  const availableSyncKey = SYNC_KEY
  const syncKey = req.cookies.syncKey

  if (syncKey !== availableSyncKey) {
    return res.status(403).json({ error: 'Access denied' })
  }
  next()
}

import jwt from 'jsonwebtoken'

export async function AuthExApi(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.substr(7)
    : req.cookies.tokenExApi

  if (!token) {
    return res.status(403).json({ message: 'Access denied' })
  }

  try {
    const decoded = jwt.verify(
      token,
      '$2y$10$6JXcil0nvFj41.FIHYSTtenIL6Hc9Ua1ZkYKJkD9lvQxlP3DlD26G'
    )

    res.locals.token = token
    res.locals.profile = decoded

    req.data = {
      ...decoded,
      token: token,
    }
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Access denied' })
  }

  next()
}

export async function EnsureAccess(req, res, next, access) {
  if (access.includes(req.data.role)) {
    return next()
  } else {
    return res.status(403).send({ message: 'Akses dilarang...' })
  }
}

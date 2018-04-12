export default function requireAuthentication(req, res, next) {
  if (!req.authorizedUser) {
    res.status(401).json({message: 'Authentication required' });
    return;
  }

  next();
}

export function NotFound(res, msg) {
  res.status(404).json({message: msg});
}

export function BadRequest(res, msg) {
  res.status(400).json({message: msg});
}

export function Unauthenticated(res) {
  res.status(401).json({ message: 'Authentication required' });
}

export function Unauthorized(res) {
  res.status(403).json({ message: 'You are not authorized to perform this action' });
}

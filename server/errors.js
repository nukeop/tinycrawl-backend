export function NotFound(res, msg) {
  res.status(404).json({message: msg});
}

export default function createEndpoint(router) {
  router.get('/health', (req, res) => {
    res.json({
      service: true,
      timestamp: + new Date()
    });
  });
}

import mongoose from 'mongoose';

export default function createEndpoint(router) {
  router.get('/health', async (req, res) => {
    const pingResult = await mongoose.connection.db.admin().ping();
    
    res.json({
      service: true,
      db: pingResult.ok === 1,
      timestamp: + new Date()
    });
  });
}

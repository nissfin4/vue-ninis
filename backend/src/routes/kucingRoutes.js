import { getSemuaKucing, tambahKucing } from '../controllers/kucingController.js'

export default async function (fastify) {
  fastify.get('/kucing', getSemuaKucing)
  fastify.post('/kucing', tambahKucing)
}

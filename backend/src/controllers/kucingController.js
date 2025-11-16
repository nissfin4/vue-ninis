import kucingService from '../services/kucingService.js'

export const getSemuaKucing = async (req, reply) => {
  reply.send(await kucingService.getAll())
}

export const tambahKucing = async (req, reply) => {
  const data = await kucingService.create(req.body)
  reply.send(data)
}

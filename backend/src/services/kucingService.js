import { getKucingAll, createKucing } from '../models/kucingModel.js'

export default {
  getAll: () => getKucingAll(),
  create: (data) => createKucing(data),
}

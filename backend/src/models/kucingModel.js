import pool from '../config/database.js'

export const getKucingAll = async () => {
  const [rows] = await pool.query(`
    SELECT k.id_kucing, k.usia, k.foto,
           jk.jenis_kucing, jk.id_jenis_kucing,
           jg.jenis_kelamin, jg.id_jenis_kelamin,
           kk.kondisi_kucing, kk.id_kondisi_kucing
    FROM kucing k
    LEFT JOIN jenis_kucing jk ON k.id_jenis_kucing = jk.id_jenis_kucing
    LEFT JOIN jenis_kelamin jg ON k.id_jenis_kelamin = jg.id_jenis_kelamin
    LEFT JOIN kondisi_kucing kk ON k.id_kondisi_kucing = kk.id_kondisi_kucing
  `)
  return rows
}

export const createKucing = async (data) => {
  const { id_jenis_kucing, id_jenis_kelamin, id_kondisi_kucing, usia, foto } = data

  const [result] = await pool.query(
    `INSERT INTO kucing (id_jenis_kucing, id_jenis_kelamin, id_kondisi_kucing, usia, foto)
     VALUES (?, ?, ?, ?, ?)`,
    [id_jenis_kucing, id_jenis_kelamin, id_kondisi_kucing, usia, foto],
  )

  return { id_kucing: result.insertId, ...data }
}

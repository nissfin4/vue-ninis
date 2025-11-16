import pool from '../config/database.js'

export const getShelterAll = async () => {
  const [rows] = await pool.query(`
    SELECT s.id_shelter, s.nama_shelter, s.foto,
           l.kota, l.alamat,
           u.username AS pemilik
    FROM shelter s
    LEFT JOIN lokasi l ON s.id_lokasi = l.id_lokasi
    LEFT JOIN user u ON s.id_user = u.id_user
  `)
  return rows
}

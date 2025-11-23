async function rawatKucingRoutes(fastify, options) {

  fastify.get("/rawat/kucing", async () => {
    const [rows] = await fastify.mysql.query(`
      SELECT 
        k.id_kucing,
        k.nama_kucing,
        k.usia,
        k.foto,
        jk.jenis_kucing,
        jkel.jenis_kelamin,
        kk.kondisi_kucing AS kondisi
      FROM kucing k
      JOIN jenis_kucing jk ON jk.id_jenis_kucing = k.id_jenis_kucing
      JOIN jenis_kelamin jkel ON jkel.id_jenis_kelamin = k.id_jenis_kelamin
      JOIN kondisi_kucing kk ON kk.id_kondisi_kucing = k.id_kondisi_kucing
      ORDER BY k.id_kucing ASC;
    `);
    return rows;
  });

  fastify.get("/rawat/kucing/:id/reminders", async (req) => {
    const [rows] = await fastify.mysql.query(`
      SELECT 
        id_pengingat AS id,
        judul AS title,
        waktu AS time,
        frekuensi AS frequency,
        status AS checked
      FROM kucing_pengingat
      WHERE id_kucing = ?;
    `, [req.params.id]);

    return rows;
  });

  fastify.get("/rawat/kucing/:id/aktivitas", async (req) => {
    const [rows] = await fastify.mysql.query(`
      SELECT 
        id_aktivitas AS id,
        judul AS title,
        deskripsi AS details,
        DATE_FORMAT(tanggal, '%e') AS day,
        DATE_FORMAT(tanggal, '%b') AS month,
        CONCAT('Pukul ', DATE_FORMAT(waktu, '%H:%i')) AS time,
        alarm
      FROM kucing_aktivitas
      WHERE id_kucing = ?
      ORDER BY tanggal ASC;
    `, [req.params.id]);

    return rows;
  });

}

export default rawatKucingRoutes;

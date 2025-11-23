<template>
  <main>
    <div class="main-header">
      <h1>Peringkat</h1>
      <span class="breadcrumb">PERINGKAT / PENGGUNA</span>
    </div>

    <div class="leaderboard-top3">
      <div class="top-user-card">
        <div class="rank-badge silver">2</div>
        <img :src="topUsers[1].avatar" alt="Foto Pengguna">
        <div class="stars">★★★★☆</div>
        <h3>{{ topUsers[1].nama }}</h3>
        <p>Total Points</p>
        <div class="total-points">{{ topUsers[1].totalPoin }}</div>
        <div class="point-details">
          <span>Poin Adopsi <span class="points">{{ topUsers[1].poinAdopsi }}</span></span>
          <span>Poin Lapor <span class="points">{{ topUsers[1].poinLapor }}</span></span>
          <span>Poin Donasi <span class="points">{{ topUsers[1].poinDonasi }}</span></span>
        </div>
      </div>
      <div class="top-user-card main">
        <div class="rank-badge gold">1</div>
        <img :src="topUsers[0].avatar" alt="Foto Pengguna">
        <div class="stars">★★★★★</div>
        <h3>{{ topUsers[0].nama }}</h3>
        <p>Total Points</p>
        <div class="total-points">{{ topUsers[0].totalPoin }}</div>
        <div class="point-details">
          <span>Poin Adopsi <span class="points">{{ topUsers[0].poinAdopsi }}</span></span>
          <span>Poin Lapor <span class="points">{{ topUsers[0].poinLapor }}</span></span>
          <span>Poin Donasi <span class="points">{{ topUsers[0].poinDonasi }}</span></span>
        </div>
      </div>
      <div class="top-user-card">
         <div class="rank-badge bronze">3</div>
        <img :src="topUsers[2].avatar" alt="Foto Pengguna">
        <div class="stars">★★★★☆</div>
        <h3>{{ topUsers[2].nama }}</h3>
        <p>Total Points</p>
        <div class="total-points">{{ topUsers[2].totalPoin }}</div>
        <div class="point-details">
          <span>Poin Adopsi <span class="points">{{ topUsers[2].poinAdopsi }}</span></span>
          <span>Poin Lapor <span class="points">{{ topUsers[2].poinLapor }}</span></span>
          <span>Poin Donasi <span class="points">{{ topUsers[2].poinDonasi }}</span></span>
        </div>
      </div>
    </div>

    <div class="leaderboard-table-wrapper">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nama</th>
            <th>Poin Adopsi</th>
            <th>Poin Lapor</th>
            <th>Poin Donasi</th>
            <th>Total Poin</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in leaderboardData" :key="user.id">
            <td>{{ user.rank }}</td>
            <td>
              <img :src="user.avatar" alt="Avatar">
              <span>{{ user.nama }}</span>
            </td>
            <td>{{ user.poinAdopsi }}</td>
            <td>{{ user.poinLapor }}</td>
            <td>{{ user.poinDonasi }}</td>
            <td class="total"><strong>{{ user.totalPoin }}</strong></td>
            <td>
  <i class="fa-solid fa-ellipsis tindakan-btn"
     @click="openModal(user.id, user.nama)">
  </i>
</td>

          </tr>
        </tbody>
      </table>
    </div>
  </main>

  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modalTitle">{{ modalTitle }}</h3>
        <button @click="closeModal" class="modal-close">&times;</button>
      </div>
      <div id="modalBody" class="modal-body">
        <div v-if="historyData.length === 0">
          <p>Tidak ada riwayat poin untuk pengguna ini.</p>
        </div>
        <div v-else>
          <div v-for="item in historyData" :key="item.description" class="history-item">
            <div :class="['icon', item.type]">
              <i :class="['fa-solid', item.icon]"></i>
            </div>
            <div class="history-info">
              <strong>{{ item.description }}</strong>
            </div>
            <div class="history-points">+{{ item.points }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"

const leaderboardData = ref([])
const defaultAvatar = "/image/peringkat/shaqonel.png"

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/peringkat")

  leaderboardData.value = res.data
    .sort((a, b) => b.total_poin - a.total_poin)
    .map((item, index) => ({
      id: item.id_user,
      nama: item.username,
      rank: index + 1,
      avatar: item.avatar || defaultAvatar,

      poinAdopsi: item.poinAdopsi ?? 0,
      poinLapor: item.poinLapor ?? 0,
      poinDonasi: item.poinDonasi ?? 0,
      totalPoin: item.total_poin ?? 0,

      tindakan: item.tindakan || ""
    }))
})

const topUsers = computed(() => {
  if (leaderboardData.value.length < 3) return [{}, {}, {}]

  return [
    leaderboardData.value[0],
    leaderboardData.value[1],
    leaderboardData.value[2]
  ]
})

const isModalOpen = ref(false)
const modalTitle = ref("")
const historyData = ref([])

async function openModal(id, name) {
  modalTitle.value = `Riwayat Poin untuk ${name}`

  // 🔥 ambil riwayat asli dari backend (sama seperti di profil)
  const res = await axios.get(`http://localhost:3000/api/users/${id}/poin-history`)

  historyData.value = res.data.map(item => ({
    description: item.deskripsi,
    points: item.poin,
    icon:
      item.id_poin === 1 ? "fa-paw" :
      item.id_poin === 2 ? "fa-hand-holding-dollar" :
      "fa-flag",
    type:
      item.id_poin === 1 ? "adopsi" :
      item.id_poin === 2 ? "donasi" :
      "lapor"
  }))

  isModalOpen.value = true
}


</script>



<style scoped>
@import '@/assets/css/pages/peringkat.css';
/* CSS untuk modal dan tabel sudah ada di main.css (global) */
.tindakan-btn {
  cursor: pointer;
}

</style>
<template>
  <aside class="sidebar">
        <div class="sidebar-header">
            AdoptMeow
        </div>
        <nav>
            <h3>Fitur Utama</h3>
            <ul>
              <li><RouterLink to="/app/home"><i class="fa-solid fa-house"></i> Beranda</RouterLink></li>
              <li><RouterLink to="/app/lapor"><i class="fa-solid fa-flag"></i> Lapor</RouterLink></li>
              <li><RouterLink to="/app/adopsi"><i class="fa-solid fa-paw"></i> Adopsi</RouterLink></li>
              <li><RouterLink to="/app/donasi"><i class="fa-solid fa-hand-holding-dollar"></i> Donasi</RouterLink></li>
              <li><RouterLink to="/app/peringkat"><i class="fa-solid fa-ranking-star"></i> Peringkat</RouterLink></li>
              <li><RouterLink to="/app/rawat-kucing"><i class="fa-solid fa-notes-medical"></i> Rawat Kucing</RouterLink></li>
            </ul>

            <h3>Pengguna</h3>
            <ul>
                <li><a href="#"><i class="fa-solid fa-user"></i> Profil</a></li>
                <li><a href="#"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a></li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

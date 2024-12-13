<template>
  <div class="container">
    <div class="sidebar" :class="{ 'is-collapsed': mainStore.isSidebarCollapsed }">
      <button class="toggle" @click="toggleSidebar">
        {{ mainStore.isSidebarCollapsed ? '>' : '<' }}
      </button>
      <CSwitcher v-if="!mainStore.isSidebarCollapsed" />
      <CSearch v-if="!mainStore.isSidebarCollapsed" v-model="mainStore.searchQuery" />
      <SUserList :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CSwitcher from '../../../components/CSwitcher.vue'
import CSearch from '../../../components/CSearch.vue'
import SUserList from './SUserList.vue'
import { useMainStore } from '../../Main/main'

const mainStore = useMainStore()

const searchQuery = ref('')

function toggleSidebar() {
  mainStore.isSidebarCollapsed = !mainStore.isSidebarCollapsed
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  background: #f0f0f0;
}

.sidebar {
  width: 300px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 20px;
  border-right: 1px solid #ddd;
  transition: width 0.3s ease-in-out;
  position: relative;
}

.sidebar.is-collapsed {
  width: 50px;
}

.sidebar .header {
  display: flex;
  align-items: center;
}

.sidebar .toggle {
  margin-left: auto;
  padding: 5px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, 0);
}

.sidebar .search {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.update-list {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

@media screen and (max-width: 490px) {
  .sidebar {
    position: absolute;
    height: 100vh;
    padding: 10px;
    width: 200px;
  }
}
</style>

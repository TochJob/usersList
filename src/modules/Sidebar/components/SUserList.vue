<script setup lang="ts">
import { useMainStore } from '../../Main/main'

import type { UserItem } from '@/modules/Main/type'

defineProps<{
  searchQuery: string
}>()

const mainStore = useMainStore()

function selectUser(user: UserItem) {
  mainStore.selectUser(user)
}
</script>

<template>
  <ul class="user-list">
    <li
      v-for="user in mainStore.filteredUsers"
      :key="user.id"
      :class="{
        selected: user.id === mainStore.selectedUser?.id,
        center: mainStore.isSidebarCollapsed,
      }"
      @click="selectUser(user)"
    >
      <img v-if="mainStore.selectedTab === 0" :src="user.avatar" alt="user" class="avatar" />
      <span class="avatar" v-else>{{ user.rating }}</span>
      <span v-if="!mainStore.isSidebarCollapsed">{{ user.first_name }} {{ user.last_name }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: background 0.3s;
    &:hover,
    &.selected {
      background: #e9e9e9;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      margin: 0;
    }
  }
}
</style>

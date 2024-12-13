<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useMainStore } from '../main'
import MUser from './MUser.vue'

const mainStore = useMainStore()

onBeforeMount(() => {
  if (!mainStore.usersList.length) {
    mainStore.fetchUsersList()
  }
})
</script>

<template>
  <section class="main">
    <MUser v-if="mainStore.selectedUser" :user="mainStore.selectedUser" />
  </section>
</template>

<style lang="scss" scoped>
.main {
  background: gray;
  width: 100%;
  padding: 10px 20px;
}

@media screen and (max-width: 490px) {
  .main {
    padding-left: 70px;
  }
}
</style>

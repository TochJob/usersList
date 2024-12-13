<script setup lang="ts">
import AppPage from './modules/Main/pages/AppPage.vue'
import AppSidebar from './modules/Sidebar/components/AppSidebar.vue'
</script>

<template>
  <div class="wrapper">
    <AppSidebar />
    <AppPage />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
}
</style>

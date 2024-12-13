<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../modules/Main/main'

const mainStore = useMainStore()
const tabs = [
  {
    header: 'Clients',
    id: 0,
  },
  {
    header: 'Rating',
    id: 1,
  },
]
const selectedTab = ref(0)

function selectTab(index: number) {
  mainStore.selectedTab = index
}
</script>

<template>
  <div class="tabs">
    <div class="tab-header">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :class="{
          selectedTab: mainStore.selectedTab == index,
          unselectedTab: selectedTab != index,
        }"
        @click="selectTab(tab.id)"
      >
        <span>{{ tab.header }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-header {
  display: flex;
  font-weight: 600;
  color: #333;
  background: #ddd;

  .tab {
    padding: 10px 20px;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: none;
    flex: 1 1 auto;
    text-align: center;
    font-size: 14px;

    &:hover {
      background: AliceBlue;
    }
  }
}

.selectedTab {
  background: #fff;
}

.tabs {
  width: 100%;
  background: #fff;

  .tab-content {
    background: #fff;
    padding: 20px 40px;
    line-height: 1.5;
  }
}

@media screen and (max-width: 490px) {
  .tab-header {
    .tab {
      padding: 10px;
    }
  }

  .tabs .tab-content {
    padding: 20px 20px;
  }
}
</style>

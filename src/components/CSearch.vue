<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  modelValue: string | Ref<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <div class="input-container">
    <input
      type="text"
      class="search"
      placeholder="Enter username to search"
      :value="modelValue"
      @input="onInputChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

.search {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search:focus {
  outline: none;
  border-color: #5b9bd5;
  box-shadow: 0 0 5px rgba(91, 155, 213, 0.5);
}
</style>

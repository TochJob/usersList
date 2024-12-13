<script setup lang="ts">
import { watch, ref } from 'vue'
import { useMainStore } from '../main'
import type { UserItem, UserLocal } from '../type'

const mainStore = useMainStore()
const props = defineProps<{
  user: UserItem
}>()
const rating = ref(props.user.rating)
const comment = ref(props.user.comment)

function increaseRating() {
  rating.value++
}

function decreaseRating() {
  if (rating.value > 0) rating.value--
}

function saveListInLocal(list: UserLocal[]) {
  localStorage.setItem('usersList', JSON.stringify(list))
}

function saveData() {
  const savedObject = {
    id: props.user.id,
    rating: rating.value,
    comment: comment.value,
  }

  // Update user in mainStore
  const foundedUser = mainStore.usersList.find((item) => item.id === savedObject.id)
  if (foundedUser) {
    Object.assign(foundedUser, savedObject)
  } else {
    mainStore.usersList.push({ ...savedObject, ...props.user })
  }

  // Сохраняем данные в localStorage
  const localUsers = JSON.parse(localStorage.getItem('usersList') || '[]') as UserLocal[]
  const index = localUsers.findIndex((item) => item.id === savedObject.id)

  if (index !== -1) {
    localUsers[index] = { ...localUsers[index], ...savedObject }
  } else {
    localUsers.push(savedObject)
  }

  saveListInLocal(localUsers)
}

watch(
  () => props.user,
  () => {
    rating.value = props.user.rating
    comment.value = props.user.comment
  },
)
</script>

<template>
  <div class="details">
    <div class="card">
      <img :src="user.avatar" alt="" class="avatar-large" />
      <h3>{{ user.first_name }}</h3>
      <p>{{ user.email }}</p>
      <div class="rating">
        <button @click="decreaseRating">-</button>
        <span>{{ rating }}</span>
        <button @click="increaseRating">+</button>
      </div>
      <textarea class="textarea" placeholder="Enter a note" v-model="comment"></textarea>
      <button @click="saveData" class="save">Save</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.card .avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.card h3 {
  margin: 10px 0;
}

.card .rating {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.card .rating button {
  width: 30px;
  height: 30px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 50%;
  cursor: pointer;
}

.card .rating span {
  margin: 0 10px;
}

.card textarea {
  width: 80%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

.card .save {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media screen and (max-width: 490px) {
  .card {
    width: 200px;
  }
}
</style>

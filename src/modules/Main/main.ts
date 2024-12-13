import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import API_ENV from '@/api/api.config'
import type { UserItem } from './type'
const { apiGetUsers } = API_ENV

export const useMainStore = defineStore('main', () => {
  const usersList = ref<UserItem[]>([])
  const selectedUser = ref<UserItem>()
  const searchQuery = ref('')
  const selectedTab = ref<number>(0)
  const isSidebarCollapsed = ref(false)

  const filteredUsers = computed(() => {
    // Фильтрация по `first_name` и `last_name`
    let users = usersList.value.filter((user) => {
      const fullName = `${user?.first_name?.toLowerCase()} ${user?.last_name?.toLowerCase()}`
      return fullName.includes(searchQuery.value.toLowerCase())
    })

    // Сортировка на основе выбранного таба
    if (selectedTab.value === 0) {
      users = users.sort((a, b) => a.last_name.localeCompare(b.last_name))
    } else if (selectedTab.value === 1) {
      users = users.sort((a, b) => b.rating - a.rating)
    }

    return users
  })

  function selectUser(user: UserItem) {
    selectedUser.value = user
  }

  async function fetchUsersList() {
    try {
      const { data } = await axios.get(apiGetUsers)
      const localUsers = localStorage.getItem('usersList')
      const parsedUsers: UserItem[] = localUsers ? JSON.parse(localUsers) : []

      const usersData: UserItem[] = data.data.map((item: UserItem) => {
        return {
          ...item,
          rating: parsedUsers.find((el) => el.id === item.id)?.rating || 0,
          comment: parsedUsers.find((el) => el.id === item.id)?.comment || '',
        }
      })
      if (usersData) {
        usersList.value = usersData
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    usersList,
    selectedUser,
    searchQuery,
    filteredUsers,
    selectedTab,
    isSidebarCollapsed,
    selectUser,
    fetchUsersList,
  }
})

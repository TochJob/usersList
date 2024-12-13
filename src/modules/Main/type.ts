interface UserLocal {
  id: number
  rating: number
  comment: string
}

interface UserItem extends UserLocal {
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export type { UserItem, UserLocal }

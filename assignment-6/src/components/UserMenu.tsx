import { useAuthContext } from '@/src/auth/AuthContext'
import Button from './Button'

export default function UserMenu() {
  const { auth, logout } = useAuthContext()

  return auth && <Button onClick={logout}>Log out</Button>
}

import { useMemo } from 'react'

interface Role {
  id: number
  name: string
}

const useHasRole = (roles?: Array<Role>) => {
  const memoizedRoles = useMemo(() => roles?.map((role) => role.name), [roles])

  const hasRole = (role: 'ROLE_USER' | 'ROLE_ADMIN') => memoizedRoles?.includes(role)

  return hasRole
}

export default useHasRole

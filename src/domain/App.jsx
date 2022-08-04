import { useMemo } from 'react'

import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
  ClipboardListIcon,
  CollectionIcon,
  BookOpenIcon
} from '@heroicons/react/outline'

import { AppProvider } from '../contexts/AppContext'
import { useSessionContext } from '../contexts/SessionContext'

const getMainNavItems = (user, accessLevel) => {
  let navItems = []

  if (accessLevel == 'aluno')
    navItems = [
      { name: 'Minhas Turmas', href: '/minhas-turmas', icon: HomeIcon },
      { name: 'Turmas Abertas', href: '/turmas', icon: ViewListIcon },
      {
        name: 'Exercícios',
        href: '/exercicios',
        icon: ClipboardListIcon
      },
      { name: 'Cursos', href: '/cursos', icon: BookOpenIcon }
    ]

  return navItems
}

const App = ({ children }) => {
  const { user, accessLevel } = useSessionContext()
  const mainNavItems = useMemo(
    () => getMainNavItems(user, accessLevel),
    [accessLevel]
  )

  return <AppProvider mainNavItems={mainNavItems}>{children}</AppProvider>
}

export default App

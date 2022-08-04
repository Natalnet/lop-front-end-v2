import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect
} from 'react'

import {
  ClipboardListIcon,
  ClipboardCheckIcon,
  BookOpenIcon,
  UsersIcon,
  ViewGridIcon
} from '@heroicons/react/outline'
import _ from 'lodash'

import useRecord from '../hooks/useRecord'
import { PageSubHeader } from '../components/Layout'

const ClassContext = createContext()

const useClassContext = () => useContext(ClassContext)

const ClassProvider = ({ classId, pageHeader, children }) => {
  const {
    record: classRecord,
    isLoading: isLoadingClass,
    isError: isErrorClass,
    isSuccess: isSuccessClass,
    isEmpty: isEmptyClass
  } = useRecord('/class', classId)

  const navItems = [
    {
      name: 'Dashboard',
      href: `/turmas/${classId}/dashboard`,
      icon: ViewGridIcon
    },
    {
      name: 'Listas de Exercícios',
      href: `/turmas/${classId}/listas-de-exercicios`,
      icon: ClipboardListIcon
    },
    {
      name: 'Provas',
      href: `/turmas/${classId}/provas`,
      icon: ClipboardCheckIcon
    },
    {
      name: 'Cursos',
      href: `/turmas/${classId}/cursos`,
      icon: BookOpenIcon
    },
    {
      name: 'Participantes',
      href: `/turmas/${classId}/participantes`,
      icon: UsersIcon
    }
  ]

  return (
    <ClassContext.Provider
      value={{
        classRecord,
        isLoadingClass,
        isErrorClass,
        isSuccessClass,
        isEmptyClass
      }}
    >
      {pageHeader(classRecord)}
      <PageSubHeader navItems={navItems} />
      {children}
    </ClassContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
const withClass = (Component, props) => componentProps => {
  return (
    <ClassProvider {...componentProps} {...props}>
      <Component {...componentProps} {...props} />
    </ClassProvider>
  )
}

export { useClassContext, ClassProvider, withClass }

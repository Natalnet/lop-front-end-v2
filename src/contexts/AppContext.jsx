import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect
} from 'react'

import _ from 'lodash'

const AppContext = createContext()

const useAppContext = () => useContext(AppContext)

const AppProvider = ({ mainNavItems: propMainNavItems, children }) => {
  const [mainNavItems, setMainNavItems] = useState(propMainNavItems)

  useEffect(() => {
    setMainNavItems(propMainNavItems)
  }, [propMainNavItems])

  return (
    <AppContext.Provider value={{ mainNavItems, setMainNavItems }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
const withApp = (Component, props) => componentProps => {
  return (
    <AppProvider {...componentProps} {...props}>
      <Component {...componentProps} {...props} />
    </AppProvider>
  )
}

export { useAppContext, AppProvider, withApp }

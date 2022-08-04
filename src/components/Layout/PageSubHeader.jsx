import Link from 'next/link'
import classNames from 'classnames'

const PageSubHeader = ({ navItems = [] }) => {
  const isActive = href =>
    typeof window !== 'undefined' && location.pathname.startsWith(href)

  return (
    <div className="bg-gray-100">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Selecione uma página
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={navItems.find(navItem => isActive(navItem.href))?.name}
        >
          {navItems.map(navItem => (
            <option key={navItem.name}>{navItem.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="sm:px-6 lg:px-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {navItems.map(navItem => (
              <Link key={navItem.name} href={navItem.href} passHref>
                <a
                  className={classNames(
                    isActive(navItem.href)
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={isActive(navItem.href) ? 'page' : undefined}
                >
                  {navItem.icon && (
                    <navItem.icon
                      className={classNames(
                        isActive(navItem.href)
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-0.5 mr-2 h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span>{navItem.name}</span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default PageSubHeader

import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const PageSubHeader = ({ navItems = [] }) => {
  const router = useRouter()
  const isActive = href =>
    typeof window !== 'undefined' && location.pathname.startsWith(href)

  const handleNavigate = e => router.push(e.target.value)

  return (
    <div className="bg-slate-800">
      <div className="sm:hidden">
        <div className="p-3 border-b border-slate-700">
          <label htmlFor="tabs" className="sr-only">
            Selecione uma página
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
            defaultValue={
              navItems.find(navItem => isActive(navItem.href))?.href
            }
            onChange={handleNavigate}
          >
            {navItems.map(navItem => (
              <option key={navItem.name} value={navItem.href}>
                {navItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="sm:px-6 lg:px-8 border-b border-slate-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {navItems.map(navItem => (
              <Link key={navItem.name} href={navItem.href} passHref>
                <a
                  className={classNames(
                    isActive(navItem.href)
                      ? 'border-secondary text-slate-200'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-secondary',
                    'flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={isActive(navItem.href) ? 'page' : undefined}
                >
                  {navItem.icon && (
                    <navItem.icon
                      className={classNames(
                        isActive(navItem.href)
                          ? 'text-secondary'
                          : 'text-slate-600 group-hover:text-slate-400',
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

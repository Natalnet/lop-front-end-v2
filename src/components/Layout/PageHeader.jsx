import { Helmet } from 'react-helmet'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon
} from '@heroicons/react/solid'
import Link from 'next/link'

const PageHeader = ({ pageTitle = '', description, breadcrumbs = [] }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="page-header min-h-[100px] border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          {/* {breadcrumbs && breadcrumbs.length > 0 && (
            <div>
              <nav className="sm:hidden" aria-label="Back">
                <a
                  href="#"
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeftIcon
                    className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Voltar
                </a>
              </nav>
              <nav className="flex w-full mb-2" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                  <li>
                    <div>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <HomeIcon
                          className="flex-shrink-0 h-3 w-3"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Home</span>
                      </a>
                    </div>
                  </li>
                  {breadcrumbs.map(({ slug, name, href, active }, index) => (
                    <li key={name}>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 h-3 w-3 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <Link href={href} passHref>
                          <a
                            className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700"
                            aria-current={active ? 'page' : undefined}
                          >
                            {name}
                          </a>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          )} */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg leading-6 font-semibold text-gray-900 sm:truncate">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {/* <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
          >
            Share
          </button>
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          >
            Create
          </button>
        </div> */}
      </div>
    </>
  )
}

export default PageHeader

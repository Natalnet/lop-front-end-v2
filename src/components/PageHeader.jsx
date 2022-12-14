import { Helmet } from 'react-helmet'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

import Container from '../components/Container'

const PageHeader = ({ pageTitle = '', breadcrumbs = [] }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="page-header mb-10">
        <Container className="container mx-auto">
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
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  {breadcrumbs.map(({ slug, name, href, active }, index) => (
                    <li key={slug}>
                      <div className="flex items-center">
                        {index > 0 && (
                          <ChevronRightIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        <Link href={href} passHref>
                          <a className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            {name}
                          </a>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {pageTitle}
              </h2>
            </div>
            {/* <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Editar
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Publicar
            </button>
          </div> */}
          </div>
        </Container>
      </div>
    </>
  )
}

export default PageHeader

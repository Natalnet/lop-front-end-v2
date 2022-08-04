import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LoadWrapper from '../../../components/LoadWrapper'
import useRecords from '../../../hooks/useRecords'
import Layout, { PageHeader } from '../../../components/Layout'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query
  const {
    records: classes,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecords('/class/open')

  return (
    <Layout>
      <PageHeader
        pageTitle="Turmas"
        breadcrumbs={[{ slug: 'classes', name: 'Turmas', href: '/turmas' }]}
      />

      <LoadWrapper
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        isEmpty={isEmpty}
      >
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {classes &&
              classes.map(list => (
                <li key={list.id}>
                  <Link href={`/turmas/${classId}/listas/${list.id}`}>
                    <a className="block hover:bg-gray-50">
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-4 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0 flex-1 pr-4 md:grid md:grid-cols-2 md:gap-4">
                            <div className="flex items-center">
                              <p className="text-md font-medium text-blue-600 truncate">
                                {list.title}
                              </p>
                              {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                              <MailIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">{list.id}</span>
                            </p> */}
                            </div>
                            {/* <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on{' '}
                                <time
                                  dateTime={list.classHasListQuestion.createdAt}
                                >
                                  {list.classHasListQuestion.createdAt}
                                </time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                                {list.questionsCount}
                              </p>
                            </div>
                          </div> */}
                          </div>
                        </div>
                        <div>
                          <ChevronRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </LoadWrapper>
    </Layout>
  )
}

export default ClassPage

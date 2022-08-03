import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LoadWrapper from '../../../../components/LoadWrapper'
import useRecord from '../../../../hooks/useRecord'
import useRecords from '../../../../hooks/useRecords'
import Layout from '../../../../components/Layout'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query
  const {
    record: classItem,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecord('/class', classId)
  const { records: lists } = useRecords('/listQuestion', {
    params: { idClass: classId }
  })

  return (
    <Layout
      pageTitle={classItem?.name}
      breadcrumbs={[
        { slug: 'my-classes', name: 'Minhas Turmas', href: '/aluno' },
        {
          slug: 'class',
          name: classItem?.name,
          href: `/aluno/turmas/${classId}`
        },
        {
          slug: 'list',
          name: 'Listas',
          href: `/aluno/turmas/${classId}/listas`
        }
      ]}
    >
      <LoadWrapper
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        isEmpty={isEmpty}
      >
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {lists &&
              lists.map(list => (
                <li key={list.id}>
                  <Link href={`/aluno/turmas/${classId}/listas/${list.id}`}>
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

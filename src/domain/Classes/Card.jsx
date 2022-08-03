import _ from 'lodash'
import Link from 'next/link'

const ClassCard = ({
  id,
  name,
  code,
  description,
  languages: _languages,
  usersCount,
  listsCount,
  testsCount,
  year,
  semester,
  author
}) => {
  const languages = _.isArray(_languages) ? _languages : JSON.parse(_languages)

  return (
    <Link href={`/aluno/turmas/${id}`} passHref>
      <a className="bg-white shadow overflow-hidden sm:rounded-lg h-full flex flex-col">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg leading-6 font-bold text-gray-900">
                {name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{code}</p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              {languages && (
                <img
                  src={`/languages/${languages[0]}.svg`}
                  alt={languages[0]}
                />
              )}
            </div>
          </div>
        </div>
        <div className=" px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Descrição</dt>
              <dd className="mt-1 text-sm text-gray-900">{description}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Semestre</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {year}.{semester}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Participantes
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{usersCount}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Listas</dt>
              <dd className="mt-1 text-sm text-gray-900">{listsCount}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Provas</dt>
              <dd className="mt-1 text-sm text-gray-900">{testsCount}</dd>
            </div>
          </dl>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 mt-auto">
          <div className="w-full flex items-center justify-between">
            <img
              className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-4"
              src={author.imageUrl}
              alt=""
            />
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">
                  {author.name}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {author.email}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ClassCard

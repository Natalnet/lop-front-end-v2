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
    <Link href={`/turmas/${id}`} passHref>
      <a className="bg-white dark:bg-slate-800 shadow-sm border border-slate-700 overflow-hidden sm:rounded-lg h-full flex flex-col">
        <div className="border-b border-slate-700 px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg leading-6 font-bold text-slate-400 dark:text-white">
                {name}
              </h3>
              <p className="mt-1 text-sm text-slate-300 dark:text-slate-400">
                {code}
              </p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              {languages && (
                <img
                  src={`/languages/${languages[0]}.svg`}
                  alt={languages[0]}
                  className="w-12 h-12"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
            <div className="col-span-2">
              <dt className="text-sm font-medium text-slate-300">Descrição</dt>
              <dd className="mt-1 text-sm text-slate-400">{description}</dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-300">Semestre</dt>
              <dd className="mt-1 text-sm text-slate-400">
                {year}.{semester}
              </dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-300">
                Participantes
              </dt>
              <dd className="mt-1 text-sm text-slate-400">{usersCount}</dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-300">Listas</dt>
              <dd className="mt-1 text-sm text-slate-400">{listsCount}</dd>
            </div>
            <div className="col-span-1">
              <dt className="text-sm font-medium text-slate-300">Provas</dt>
              <dd className="mt-1 text-sm text-slate-400">{testsCount}</dd>
            </div>
          </dl>
        </div>
        <div className="border-t border-slate-700 px-4 py-5 sm:px-6 mt-auto">
          <div className="w-full flex items-center justify-between">
            <img
              className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-4"
              src={author.imageUrl}
              alt=""
            />
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-slate-400 text-sm font-medium truncate">
                  {author.name}
                </h3>
              </div>
              <p className="mt-1 text-slate-300 text-sm truncate">
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

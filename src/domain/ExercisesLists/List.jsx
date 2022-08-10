import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import LoadWrapper from '../../components/LoadWrapper'
import useRecords from '../../hooks/useRecords'

import ExercisesListItem from './ListItem'

const ExercisesLists = ({ classId }) => {
  const {
    records: exercicesLists,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecords('/listQuestion', {
    params: { idClass: classId }
  })

  return (
    <>
      <LoadWrapper
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        isEmpty={isEmpty}
      >
        <div className="bg-transparent  overflow-hidden">
          <ul role="list" className="divide-y divide-slate-700">
            {exercicesLists &&
              exercicesLists.map(exercisesList => (
                <ExercisesListItem
                  key={exercisesList.id}
                  classId={classId}
                  {...exercisesList}
                />
              ))}
          </ul>
        </div>
      </LoadWrapper>
    </>
  )
}

export default ExercisesLists

import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

import useRecord from '../../../../../../hooks/useRecord'
import { ClassProvider } from '../../../../../../contexts/ClassContext'
import Layout, { PageHeader } from '../../../../../../components/Layout'
import ExercisesList from '../../../../../../domain/ExercisesLists/Show'

const ClassExercisesListPage = () => {
  const router = useRouter()
  const { classId, exercisesListId } = router.query
  const {
    record: exercicesList,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecord('/listQuestion', exercisesListId, {
    query: { idClass: classId }
  })

  return (
    <Layout>
      <ClassProvider classId={classId}>
        <ExercisesList
          classId={classId}
          exercisesListId={exercisesListId}
          {...exercicesList}
        />
      </ClassProvider>
    </Layout>
  )
}

export default ClassExercisesListPage

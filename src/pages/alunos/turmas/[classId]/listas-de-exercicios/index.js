import { useRouter } from 'next/router'

import { ClassProvider } from '../../../../../contexts/ClassContext'
import Layout, { PageHeader } from '../../../../../components/Layout'
import ExercisesLists from '../../../../../domain/ExercisesLists/List'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query

  return (
    <Layout>
      <ClassProvider classId={classId}>
        <ExercisesLists classId={classId} />
      </ClassProvider>
    </Layout>
  )
}

export default ClassPage

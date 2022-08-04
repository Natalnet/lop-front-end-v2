import { useEffect } from 'react'

import { useRouter } from 'next/router'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query

  useEffect(() => {
    if (classId) router.push(`/turmas/${classId}/dashboard`)
  }, [classId])

  return <></>
}

export default ClassPage

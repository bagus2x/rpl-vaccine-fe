import AdminLayout from '@/components/common/AdminLayout'
import { NextPageWithLayout } from '@/utils/types'
import { ReactElement } from 'react'

const A: NextPageWithLayout = () => {
  return <div>hai</div>
}

A.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default A

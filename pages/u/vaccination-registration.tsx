import UserLayout from '@/components/common/UserLayout'
import { NextPageWithLayout } from '@/utils/types'
import { ReactElement } from 'react'

const VaccinationRegistration: NextPageWithLayout = () => {
  return <div>Daftar Vaksinasaaai</div>
}

VaccinationRegistration.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default VaccinationRegistration

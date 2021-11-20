import useVaccinations from '@/hooks/query/vaccinations'
import React from 'react'

interface VaccinationCardProps {
    id: number
    title: string
    vaccine: string
    description: string | null
    picture: string | null
    startDate: number
    lastDate: number
  }
  

const ListVaccination = () => {
	const vaccinations = useVaccinations()

    return (
        <div>
            {vaccinations.data?.map((vcn, i) => <div key={i}>{JSON.stringify(vcn)}</div>)}
        </div>
    )
}

export default ListVaccination

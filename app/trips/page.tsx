export const dynamic = 'force-dynamic';


import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'
// import TripsClient from './TripsClient'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState 
                title='Unauthorized'
                subtitle='Please Login'
                />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(reservations.length === 0) {
        return (
            <EmptyState 
                title='No Trips Found'
                subtitle='Looks like you have not reserved any trips'
                />
        )
    }

    return (
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
    )
 
}

export default TripsPage

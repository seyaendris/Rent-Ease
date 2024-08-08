import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getReservations from '../actions/getReservations'
import ReservationsClient from './ReservationsClient'
// import ReservationsClient from './ReservationsClient'


const ReservationsPage = async () => {
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
        authorId: currentUser.id
    })

    if(reservations.length === 0) {
        return (
            <EmptyState 
                title='No Reservations Found'
                subtitle='Looks like you do not have any reservations on your properties'
                />
        )
    }

    return (
        <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
    )
}

export default ReservationsPage

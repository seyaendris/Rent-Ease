import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'

const ListingPage = () => {
    return (
        <EmptyState 
            title='No Favorites found!'
            subtitle='Looks like you did not get your favorite place'
            />
    )
}

export default ListingPage

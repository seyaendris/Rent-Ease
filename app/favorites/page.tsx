export const dynamic = 'force-dynamic';


import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoriteClient from './FavoriteClient'

const ListingPage = async () => {
    const currentUser = await getCurrentUser()
    const listings = await getFavoriteListings()

    if(listings.length === 0) {
        return (
            <EmptyState 
                title='No Favorites found!'
                subtitle='Looks like you did not get your favorite place'
                />
        )
    }

    return (
        <FavoriteClient 
            listings={listings}
            currentUser={currentUser}
            />
    )
    
}

export default ListingPage

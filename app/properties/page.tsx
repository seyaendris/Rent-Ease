export const dynamic = 'force-dynamic';


import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getListings from '../actions/getListings'
import PropertiesClient from './PropertiesClient'
// import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState 
                title='Unauthorized'
                subtitle='Please Login'
                />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0) {
        return (
            <EmptyState 
                title='No Properties Found'
                subtitle='Looks like you have no properties'
                />
        )
    }

    return (
        <PropertiesClient 
            listings={listings}
            currentUser={currentUser}
            />
    )
 
}

export default PropertiesPage

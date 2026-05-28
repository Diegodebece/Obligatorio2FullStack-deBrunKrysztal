import React from 'react'
import Aside from '../components/viewer/ViewerAside'
import ViewerSummary from '../components/viewer/ViewerSummary'
import ViewerTracking from '../components/viewer/ViewerTracking'
import ViewerAI from '../components/viewer/ViewerAI'
import ViewerCatalog from '../components/viewer/ViewerCatalog'
import ViewerStats from '../components/viewer/ViewerStats'

const ViewerPage = () => {
    return (
        <main className="layout">

            <ViewerAside />

            <ViewerSummary />

            <ViewerCatalog />

            <ViewerTracking />

            <ViewerStats />

            <ViewerAI />

        </main>
    )
}

export default ViewerPage
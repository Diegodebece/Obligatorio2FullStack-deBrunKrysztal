import React from 'react'
import AdminAside from '../components/admin/AdminAside'
import AdminSeriesManagement from '../components/admin/AdminSeriesManagement'
import AdminUsersManagement from '../components/admin/AdminUsersManagement'

const AdminPage = () => {
  return (
    <main className="layout admin-layout">
        <AdminAside />

        <section className="content">

          <AdminSeriesManagement />



          <AdminCategoriesManagement />

          <AdminUsersManagement />

          <AdminTrackingStats />

        </section>
      </main>
  )
}

export default AdminPage
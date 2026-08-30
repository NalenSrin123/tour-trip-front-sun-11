import React, { useState } from 'react'
import DestinationDashboard from './pages/admin/destinations/indexPageDestination'
import CreatePageDestination from './pages/admin/destinations/CreatePageDestination'
import ViewPageDestination from './pages/admin/destinations/ViewPageDestination'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [destinationToEdit, setDestinationToEdit] = useState(null)
  const [destinationToView, setDestinationToView] = useState(null)

  const handleAddClick = () => {
    setDestinationToEdit(null)
    setCurrentPage('create')
  }

  const handleEditClick = (destination) => {
    setDestinationToEdit(destination)
    setCurrentPage('create')
  }

  const handleViewClick = (destination) => {
    setDestinationToView(destination)
    setCurrentPage('view')
  }

  if (currentPage === 'view') {
    return (
      <ViewPageDestination 
        destination={destinationToView}
        onBack={() => setCurrentPage('dashboard')}
      />
    )
  }

  if (currentPage === 'create') {
    return (
      <CreatePageDestination 
        onCancel={() => setCurrentPage('dashboard')} 
        initialData={destinationToEdit}
      />
    )
  }

  return (
    <DestinationDashboard 
      onAddClick={handleAddClick} 
      onEditClick={handleEditClick}
      onViewClick={handleViewClick}
    />
  )
}

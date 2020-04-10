import React from 'react'

const FilterForm = ({ 
    searchFilter,
    handleSearchFilterChange
  }) => {
  
    return (
      <div>
        filter shown with: <input 
          value={searchFilter}
          onChange={handleSearchFilterChange}
        />
      </div>
    )
  }

export default FilterForm
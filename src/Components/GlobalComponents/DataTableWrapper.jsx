import React from 'react';
import DataTable from 'react-data-table-component';

const DataTableWrapper = ({ columns, data, onRowClicked }) => {
  const handleRowClicked = (row) => {
    onRowClicked(row);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
      striped
      onRowClicked={handleRowClicked}
      customStyles={{
        headRow: {
          style: {
            backgroundColor: 'rgba(13, 34, 44, 1)',
            color: 'white',
          },
        },
      }}
    />
  );
};

export default DataTableWrapper;

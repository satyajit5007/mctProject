import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';

function App() {
  const [tableData, setTableData] = useState([
    { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
    { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
    { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
    { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
  ])
  const columns = [
    { title: "Name", field: "name", sorting: false, filtering: false, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone", align: "center", grouping: false },
    {
      title: "Age", field: "age", emptyValue: () => <em>null</em>,
      render: (rowData) => <div style={{ background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",borderRadius:"4px",paddingLeft:5 }}>{rowData.age >= 18 ? "18+" : "18-"}</div>,
       searchable: false,
    },
    { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
    { title: "City", field: "city",filterPlaceholder:"filter" },
    { title: "Aadhar Number", field: "fee", type: "number required",
    cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" }, },
  ]
  return (
    <div className="App">
      <h1 align="center">Directory app</h1>
      <h4 align='center'>Material Table </h4>

      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}
        actions={[
          
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
           paging: true, 
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom", addRowPosition: "first", actionsColumnIndex: -1, 
           showTextRowsSelected: false, selectionProps: rowData => ({
            disabled: rowData.age == null, searchFieldAlignment:"left",
            // color:"primary"
          }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336",color:"#fff"}
        }}
        title="Student Information"
        icons={{ Add: () => <AddIcon /> }} />
      
    </div>
  );
}

export default App;

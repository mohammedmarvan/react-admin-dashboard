import Header from "@/components/header";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MainTable from "@/components/main-table"

const Orders = () => {
    const [isTableLoading, setIsTableLoading] = useState(false);
    var isFetching = false;
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder]= useState("desc");
    const [orderBy, setOrderBy] = useState("orderId");
    const [isMounted, setIsMounted] = useState(false);

    const fetchOrderTableData = async(sort = false, paginationModel = false) => {

      sort = sort || [{ field: orderBy, sort: order}];
      paginationModel = paginationModel || { pageSize: rowsPerPage, page: page };
      if (!sort || !paginationModel || sort.length === 0) return;

      let params = { sortModel: sort, paginationModel };
      const response = await fetch('/api/orders/getOrderList',{
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              'Content-Type': 'application/json',
            },
      })
      if (response.ok) {
          const data = await response.json()
          if ( data.status == 'success' && data.data ) {
              setTableData(data.data.data);
          }
      }
  }

    const handleRowsPerPageChange = async(e) => {
      try{
        setIsTableLoading(true);
        const newRowsPerPage = parseInt(e.target.value);
        const paginationModel = { pageSize: newRowsPerPage, page: page};
        await fetchOrderTableData(false, paginationModel);
        setRowsPerPage(newRowsPerPage);
        setIsTableLoading(false);
      }catch(e) {
        setIsTableLoading(false);
      }
    }

    const handlePageChange = async(newPage) => {
      try {
        setIsTableLoading(true);
        if (page === newPage) return;

        const paginationModel = { pageSize: rowsPerPage, page: newPage};
        await fetchOrderTableData(false, paginationModel);
        setPage(newPage);
        setIsTableLoading(false);
      }catch(e) {
        setIsTableLoading(false);
      }
    }

    const handleSortChange = (newOrderBy) => async() => {
      try {
        setIsTableLoading(true);
        const sortModel = [{ field: newOrderBy, sort: order == 'desc' ? 'asc' : 'desc' }];
        await fetchOrderTableData(sortModel, false);
        setOrder((previ) => previ === 'desc' ? 'asc' : 'desc');
        setOrderBy(newOrderBy);
        setIsTableLoading(false);
      }catch(e) {
        setIsTableLoading(false);
      }
    } 

    useEffect(() => {
        (async() => {
            if (!isFetching) {
              isFetching = true;
              setIsTableLoading(true);
              await fetchOrderTableData();
              isFetching = false;
              setIsTableLoading(false);
            }
        })()
        setIsMounted(true);
    }, [])
    
    const columns = [
      { field: "orderId", headerName: "Order ID" },
      { field: "referId", headerName: "Increment ID" },
      { field: "customerName", headerName: "Customer Name", },
      { field: "phoneNumber", headerName: "Phone Number" },
      { field: "grandTotal", headerName: "Grand Total" },
      { field: "status", headerName: "Order Status" }
    ];
  
    return (
      <Box m="20px">
        <Header
          title="ORDERS"
          subtitle="Check the orders here"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
        >

          { isMounted  && <MainTable
            headers={columns}
            orderBy={orderBy}
            order={order}
            handleSortChange={handleSortChange}
            isLoading={isTableLoading}
            tableData={tableData}
            pageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            page={page}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />}

        </Box>
      </Box>
    );
};

export default Orders;
import { Box, Button, useTheme, Typography, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "@/components/header";
import StatBox from "@/components/statbox";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import ProgressCircle from "@/components/progress-circle";
import { useState, useEffect } from "react";
import LineChart from "@/components/line-chart";
import React                       from "react";
import TextTransition, { presets } from "react-text-transition";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expressOrders, setExpressOrders] = useState(0);
  const [expressOrderPercentage, setExpressOrderPercentage] = useState(0);
  const [scheduledOrders, setScheduledOrders] = useState(0);
  const [scheduledOrderPercentage, setScheduledOrderPercentage] = useState(0);
  const [shippedOrders, setShippedOrders] = useState(0);
  const [shippedOrderPecentage, setShippedOrderPercentage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orderLineChartData, setOrderLineChartData] = useState([]);
  const [totalOrderUp, setTotalOrderUp] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [expressOderUp, setExpressOrderUp] = useState(1);
  const [scheduledOrderUp, setSheduledOrdersUp] = useState(1);
  const [shippedOrderUp, setShippedOrderUp] = useState(1);

  const getExpressOrderPercentage = (expressO, totalO) => {
    if (expressO <= 0 || totalO <= 0) return 0;

    if (isNaN(expressO) || isNaN(totalO)) return 0;

    return (expressO/totalO);
  }

  const getScheduledOrderPercentage = (scheduledO, total0) => {
    if (scheduledO <= 0 || total0 <= 0) return 0;

    if (isNaN(scheduledO) || isNaN(total0)) return 0;

    return (scheduledO/total0);
  }

  const getShippedOrderPercentage = (shippedO, total0) => {
    if (shippedO <= 0 || total0 <= 0) return 0;

    if (isNaN(shippedO) || isNaN(total0)) return 0;

    return (shippedO/total0);
  }

  const fetchDashBoardData = async() => {
    const response = await fetch('/api/dashboard/getDashboardData')
    
    if (response.ok) {
      const data = await response.json()
  
      if (data && data.status == 'success') {
        updateDashBoardData(data.data);
      }
    }
  }

  const updateDashBoardData = (data) => {

    if (expressOrders < data.pendingExpressOrders) {
      setExpressOrderUp(1);
    }else {
      setExpressOrderUp(0);
    }

    if (totalOrders < data.totalOrders) {
      setTotalOrderUp(1);
    }else {
      setTotalOrderUp(0);
    }

    if (scheduledOrders < data.pendingScheduledOrders) {
      setSheduledOrdersUp(1);
    }else {
      setSheduledOrdersUp(0);
    }

    if (shippedOrders < data.dispatchedOrders) {
      setShippedOrderUp(1);
    }else {
      setShippedOrderUp(0);
    }

    setExpressOrders(data.pendingExpressOrders);
    setScheduledOrders(data.pendingScheduledOrders);
    setShippedOrders(data.dispatchedOrders);
    setExpressOrderPercentage(getExpressOrderPercentage(data.pendingExpressOrders, data.totalOrders));
    setScheduledOrderPercentage(getScheduledOrderPercentage(data.pendingScheduledOrders, data.totalOrders));
    setShippedOrderPercentage(getShippedOrderPercentage(data.dispatchedOrders, data.totalOrders));
    setTotalOrders(data.totalOrders);
    setOrderLineChartData(data.chartData);
  }

  useEffect(() => {
  
    if (!isMounted) {
      fetchDashBoardData();
      setIsMounted(true);
    }
    
    const fetchInterval = setInterval(async() => {
      await fetchDashBoardData();
    }, 10000)
    return () => clearInterval(fetchInterval);
  }, [])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={expressOrders.toLocaleString('en-US')}
            title={
              <TextTransition springConfig={presets.slow} direction={expressOderUp ? "up" : "down"}>
                {expressOrders.toLocaleString('en-US')}
              </TextTransition>
            }
            subtitle="Express Orders"
            progress={expressOrderPercentage}
            increase={(expressOrderPercentage * 100).toFixed(2) + '%'}
            icon={
              <DirectionsBikeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={scheduledOrders.toLocaleString('en-US')}
            title={
              <TextTransition springConfig={presets.slow} direction={scheduledOrderUp ? "up" : "down"}>
                {scheduledOrders.toLocaleString('en-US')}
              </TextTransition>
            }
            subtitle="Scheduled Orders"
            progress={scheduledOrderPercentage}
            increase={(scheduledOrderPercentage * 100).toFixed(2) + '%'}
            icon={
              <AccessAlarmIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={shippedOrders.toLocaleString('en-US')}
            title={
              <TextTransition springConfig={presets.slow} direction={shippedOrderUp ? "up" : "down"}>
                {shippedOrders.toLocaleString('en-US')}
              </TextTransition>
            }
            subtitle="Shipped Orders"
            progress={shippedOrderPecentage}
            increase={(shippedOrderPecentage * 100 ).toFixed(2) + '%'}
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                HOURLY ORDER COUNT
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                <TextTransition springConfig={presets.slow} direction={totalOrderUp ? "up" : "down"}>
                  {totalOrders.toLocaleString('en-US')}
                </TextTransition>
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="500px" m="-20px 0 0 0">
            <LineChart isDashboard={true} chartData={orderLineChartData} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;

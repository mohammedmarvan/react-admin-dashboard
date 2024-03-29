const { getDashboardData, getHourlyDataForChartForTheDay } = require('../../../db/orders');

export default async function handler (req, res) {

    try {
        const dbData = await getDashboardData();
        const chartData = await getHourlyDataForChartForTheDay();
        dbData.chartData = chartData;
    
        res.status(200).json({
            status: 'success', 
            data: dbData
        })
    }catch(e) {
        console.log("Error, ",e)
        res.status(500).end();
    }
}
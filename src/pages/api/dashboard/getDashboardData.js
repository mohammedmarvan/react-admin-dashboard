const { getDashboardData } = require('../../../db/orders');

export default async function handler (req, res) {

    const dbData = await getDashboardData();

    res.status(200).json({
        status: 'success', 
        data: dbData
    })
}
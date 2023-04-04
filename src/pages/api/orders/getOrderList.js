const { getOrderListForUI } = require('../../../db/orders');

export default async function handler (req, res) {

    try {

        const { sortModel, paginationModel } = req.body;

        const dbData = await getOrderListForUI( sortModel, paginationModel );
    
        res.status(200).json({
            status: 'success', 
            data: dbData
        })
    }catch(e) {
        console.log("Error, ",e)
        res.status(500).end();
    }
}
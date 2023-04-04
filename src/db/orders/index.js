const getKnex = require('../../lib/db-connection');
const TABLE = 'orders';
const moment = require('moment');
const { TABLE: CUSTOMER_TABLE } = require('../customers');

const Orders = () => getKnex(TABLE)

const getDashboardData = async() => {
    const today = moment().format('YYYY-MM-DD');
    let query = "count(*) totalOrders, \
                COALESCE(sum(case when status = 'shipped' then 1 else 0 end), 0) dispatchedOrders, \
                COALESCE(sum(case when status = 'pending' then 1 else 0 end), 0) pendingExpressOrders, \
                COALESCE(sum(case when status = 'scheduledPending' then 1 else 0 end), 0) pendingScheduledOrders";

    return await Orders().select(getKnex.raw(query)).where('createdAt', '>', today).then((data) => data.length ? data[0] : {});
}

const getHourlyDataForChartForTheDay = async() => {
    const today = moment().format('YYYY-MM-DD');
    const hourMap = [
        "12 AM",
        "01 AM",
        "02 AM",
        "03 AM",
        "04 AM",
        "05 AM",
        "06 AM",
        "07 AM",
        "08 AM",
        "09 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "01 PM",
        "02 PM",
        "03 PM",
        "04 PM",
        "05 PM",
        "06 PM",
        "07 PM",
        "08 PM",
        "09 PM",
        "10 PM",
        "11 PM",
    ]

    let query = `count(*) as orderCount, date_format(createdAt, '%h %p') as hour`;

    return await Orders().select(getKnex.raw(query)).where('createdAt', '>', today).groupBy('hour').orderBy('createdAt').then((data) => {
        let dataToProcess = data;

        let map = {};

        dataToProcess.forEach((item) => {
            map[item.hour] = item.orderCount;
        })

        return hourMap.map((key) => {
            if (map[key]) {
                return {
                    x: key,
                    y: map[key]
                }
            }
            return {
                x: key,
                y: 0
            }
        })
    });
}

const getOrderListForUI = (sort = [ { field: 'orderId', sort: 'desc' } ], page = { pageSize: 25, page: 0 }) => {
    const sortBy = sort[0];

    return Orders()
        .select('orderId', 'referId', 'status', 'grandTotal', getKnex.raw(`CONCAT(customers.firstName, ' ', customers.lastName) as customerName`), 'customers.phoneNumber')
        .join(CUSTOMER_TABLE, 'orders.customerId', '=', `${CUSTOMER_TABLE}.customerId`)
        .orderBy(sortBy.field, sortBy.sort)
        .paginate({ perPage: page.pageSize, currentPage: page.page + 1, isLengthAware: true })
        .then((data) => { return data })
}

module.exports  = { getDashboardData, getHourlyDataForChartForTheDay, getOrderListForUI }
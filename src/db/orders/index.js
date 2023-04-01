const getKnex = require('../../lib/db-connection');
const TABLE = 'orders';

const Orders = () => getKnex(TABLE)

const getDashboardData = async() => {
    let query = "count(*) totalOrders, \
                sum(case when status = 'shipped' then 1 else 0 end)  dispatchedOrders, \
                sum(case when status = 'pending' then 1 else 0 end) pendingExpressOrders, \
                sum(case when status = 'scheduledPending' then 1 else 0 end) pendingScheduledOrders";

    return await Orders().select(getKnex.raw(query)).then((data) => data.length ? data[0] : {});
}

module.exports  = { getDashboardData }
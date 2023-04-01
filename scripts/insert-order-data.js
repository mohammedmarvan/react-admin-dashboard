const getGrandTotal = () => {
    return Math.floor(Math.random() * 10000);
}

const getRandomCustomerId = () => {
    return Math.floor(Math.random() * 5000);
}

const getRefId = (length = 9) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    result = "STT" + result; 
    return result;
}

const getRandomStatus = () => {
    const statuses = ['pending', 'shipped', 'scheduledPending'];

    return statuses[Math.floor(Math.random() * statuses.length)];
}

const config = require('../knexfile');

const TABLE = 'orders';

const getKnex = require('knex')(config)(TABLE);

async function main() {
    try {

        setInterval(async() => {
            var grandTotal = getGrandTotal();
            var referId = getRefId();
            var customerId = getRandomCustomerId();
            var status = getRandomStatus();
            await getKnex.insert({ referId, customerId, status, grandTotal })
        },2000)

        // for(var i = 0; i < 1000; i++) {
        //     var grandTotal = getGrandTotal();
        //     var referId = getRefId();
        //     var customerId = getRandomCustomerId();
        //     var status = getRandomStatus();
        //     await getKnex.insert({ referId, customerId, status, grandTotal })
        // }
        // process.exit(0);
    }catch(e) {
        console.log(e);
    }
}

main();
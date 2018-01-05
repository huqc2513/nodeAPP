let redis = require('redis');

let config = {
    RDS_PORT:6379,
    RDS_HOST :'127.0.1.1',
    RDS_OPTS:{},
};
let client = redis.createClient(config.RDS_PORT,config.RDS_HOST,config.RDS_OPTS);
client.on('ready',function (err) {
        // console.log('ready');
});

var config = {
    name: 'API',
    server: {
        host: '172.31.7.75',
        //host: '0.0.0.0',        
        port: 443,
        labels: ['api'],
        routes: {
            cors: { credentials: `true` }
        }
    },
    database: {
        mongo: 
        {
            host: 'ds127988.mlab.com',
            username: 'junhee.ko',
            password: 'qq1212qq1212!',
            port: '27988',
            database: 'bbcc'
        }
    }
};

module.exports = config;


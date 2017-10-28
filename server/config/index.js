var config = {
    name: 'API',
    server: {
        host: '0.0.0.0',
        port: 8000,
        labels: ['api'],
        routes: {
            cors: { credentials: `true` }
        }
    },
    database: {
        mongo: 
        {
            host: 'host',
            username: 'username',
            password: 'password',
            port: 'port',
            database: 'database'
        }
    }
};

module.exports = config;


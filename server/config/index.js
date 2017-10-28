var config = {
    name: 'API',
    server: {
        // host: '172.31.7.75',
        host: '0.0.0.0',        
        port: 8000,
        labels: ['api'],
        routes: {
            cors: { credentials: `true` }
        }
    },
    openApi: {
        baseUrl: 'http://api.visitkorea.or.kr/openapi/service',
        myKey: 'Q227VR0L46ig9PXHPpQ4luY1jioIsfxFQobXshqMsW3wC2zZ4j5k18mBFLAoZkLSdjtRa49wW4z%2B1z9ZOfTMAA%3D%3D'
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
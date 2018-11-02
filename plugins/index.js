const dbOpts = {
    url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    settings: {
        poolSize: 10
    },
    decorate: true
};

const swaggerOptions = {
    info: {
        title: 'Legacy Lane API Documentation',
        version: '1'
    },
    grouping: 'tags',
    basePath: '/api/v1/'
};

module.exports = {
    manifest: {
        server: { port: process.env.PORT || 3000, routes: { cors: true } },
        register: {
            plugins: [
                { plugin: require('hapi-auth-basic') },
                'inert',
                'vision',
                { plugin: './example' },
                { plugin: require('hapi-swagger'), options: swaggerOptions },
                { plugin: require('hapi-mongodb'), options: dbOpts },
                { plugin: './../routes/brick', routes: { prefix: '/api' } },
                { plugin: require('hapi-api-version'), options: {
                    validVersions: [1],
                    defaultVersion: 1,
                    vendorName: 'Legacy Lane'
                } }
            ],
            options: {
                once: true
            }
        }
    },
    options: { relativeTo: __dirname }
};

const dbOpts = {
    url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    settings: {
        poolSize: 10
    },
    decorate: true
};

module.exports = {
    manifest: {
        server: { port: process.env.PORT || 3000 },
        register: {
            plugins: [
                'inert',
                { plugin: './example' },
                { plugin: require('hapi-mongodb'), options: dbOpts },
                { plugin: './../routes/brick' }
            ],
            options: {
                once: true
            }
        }
    },
    options: { relativeTo: __dirname }
};

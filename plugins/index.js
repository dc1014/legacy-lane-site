module.exports = {
    manifest: {
        server: { port: process.env.PORT || 3000 },
        register: {
            plugins: [
                'inert',
                { plugin: './example' }
            ],
            options: {
                once: true
            }
        }
    },
    options: { relativeTo: __dirname }
};

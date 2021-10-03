module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                "target": 'http://47.103.20.223:3000',
                "changeOrigin": true,
                "pathRewrite": {
                    '^/api': ''
                },
                // WebSocket:true,
                // secure:true
            }
        }
    },
}
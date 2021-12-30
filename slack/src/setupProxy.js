const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
    console.info(app)
    app.use(createProxyMiddleware('/rtm', {
        target: 'http://127.0.0.1:3002',/*这里写自己的代理地址*/
        changeOrigin: true,
        secure: false,
    }));
    app.use(createProxyMiddleware('/appenpraises', {
        target: 'http://127.0.0.1:3002',/*这里写自己的代理地址*/
        changeOrigin: true,
        secure: false,
    }));

    // app.use(createProxyMiddleware('/socket.io', {
    //     target: 'ws://127.0.0.1:3002',/*这里写自己的代理地址*/
    //     changeOrigin: true,
    //     secure: false,
    //     ws:true,
    // }));
}

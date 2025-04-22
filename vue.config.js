const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
    publicPath: "",
    configureWebpack: {
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
    transpileDependencies: true
})
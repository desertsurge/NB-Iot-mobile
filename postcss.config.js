module.exports = {
    plugins: {
        'postcss-px2rem-exclude': {
            remUnit: 17.5,
            exclude: /node_modules|vant/i
        }
    }
};
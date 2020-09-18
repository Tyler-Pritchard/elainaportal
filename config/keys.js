if (process.env.NODE_ENV === 'production') {
    require.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
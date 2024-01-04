module.exports = {
    HOST: process.env.HOST || '0.0.0.0',
    IS_INTERACTIVE: process.stdout.isTTY,
}
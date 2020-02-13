
module.exports={
    entry:{
        index:'./src/js/index.js',
        login:'./src/js/login.js',
        user_map: './src/js/user_map.js'

    },
    output:{
        path: __dirname + '/build',
        filename: '[name].bundle.js'
    },
}
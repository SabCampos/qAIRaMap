module.exports={
    entry:{
        index:'./src/index.js',
        service_worker:'./src/service_worker.js'

    },
    output:{
        path: __dirname + '/build',
        filename: '[name].bundle.js'
    },
    
    target: 'node', 
    devServer: {
          contentBase: '/home/sabrina/qaira/qAIRaMap/build',
         },

         
    //  plugins: [
    //         new HtmlWebpackPlugin({
    //             filename: 'index.html',
    //             template: 'src/index.html',
    //           }),
    //         ],

    
          
    // devServer: {
    //     contentBase: '/home/sabrina/qaira/qAIRaMap/src',
    //     compress: true,
    //     port: 8080
    //   }
}
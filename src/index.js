const program = require( 'commander' );

// 开始解析用户输入的命令
program.parse( process.argv );

// 根据不同的命令转到不同的命令处理文件
require( './commands/' + program.args + '.js' );

var snakeCounter, foodCounter, g; //游戏中的全局变量
alert( "红方玩家的方向控制键为:\nW(上)S(下)A(左)D(右)\n蓝方玩家的方向控制键为:\n↑(上)↓(下)←(左)→(右)\n开始后按任意方向键即可出发\n行走中按对应方向键进行转向\n行走中按住任意方向键可加速" ); //游戏介绍
start(); //开始游戏
function start() { //开始
    var i; //函数所需的临时变量
    //设置全局变量or重置全局变量
    snakeCounter = 0; //计数器
    foodCounter = 0; //计数器
    g = {}; //global
    g.s = []; //Snake
    g.f = []; //Food
    g.t = []; //定时器
    //创建实例对象
    g.m = new Map( "#333", 40, 20 );
    g.s[ 0 ] = new Snake( "#f00", "#900", 5, 1, 4, 99, 666, "right", 87, 83, 65, 68 );
    g.s[ 1 ] = new Snake( "#00f", "#009", 34, 18, 4, 99, 666, "left", 38, 40, 37, 39 );
    g.f[ 0 ] = new Food( "#ff0" );
    g.f[ 1 ] = new Food( "#f0f" );
    g.f[ 2 ] = new Food( "#0ff" );
    g.f[ 3 ] = new Food( "#0f0" );
    //初始化实例对象
    g.m.init();
    for ( i = 0; i < g.s.length; i++ ) {
        g.s[ i ].init();
    }
    for ( i = 0; i < g.f.length; i++ ) {
        g.f[ i ].init();
    }
}

function over( msg ) { //结束
    if ( msg === "#f00" ) {
        msg = "蓝方";
    }
    if ( msg === "#00f" ) {
        msg = "红方";
    }
    alert( "Game Over\n" + msg + "胜出" );
    //清理:定时器,监听,HTML文档
    for ( i in g.t ) {
        //如果换成下一行会多执行好多次
        //for ( i = 0; i < g.t.length; i++ ) {
        clearInterval( g.t[ i ] );
    }
    $( document ).off();
    $( ".map>div" ).text( "" );
    start(); //重置全局变量and开始下一局
}
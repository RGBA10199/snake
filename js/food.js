( function () { //作用域
    function Food( bgc ) { //构造函数
        this.cls = ++foodCounter;
        this.bgc = bgc;
        this.pst = {};
    }
    Food.prototype.init = function () { //初始化
        $( ".foodcase" ).append( "<div class=" + this.cls + "></div>" );
        $( ".foodcase>." + this.cls ).css( "background-color", this.bgc );
        this.refresh();
    }
    Food.prototype.refresh = function () { //刷新位置
        var i, j, flag, x, y; //函数所需的临时变量
        //生成随机坐标and判断坐标是否可用
        do {
            x = parseInt( Math.random() * g.m.size.x );
            y = parseInt( Math.random() * g.m.size.y );
            flag = 0;
            for ( i = 0; i < g.f.length; i++ ) {
                if ( x === g.f[ i ].pst.x && y === g.f[ i ].pst.y ) {
                    flag = 1;
                }
            }
            for ( i = 0; i < g.s.length; i++ ) {
                if ( x === g.s[ i ].head.pst.x && y === g.s[ i ].head.pst.y ) {
                    flag = 1;
                }
                for ( j = 0; j < g.s[ i ].body.pst.length; j++ ) {
                    if ( x === g.s[ i ].body.pst[ j ].x && y === g.s[ i ].body.pst[ j ].y ) {
                        flag = 1;
                    }
                }
            }
        } while ( flag );
        //坐标赋值给this.pst
        this.pst.x = x;
        this.pst.y = y;
        //坐标赋值给HTML文档
        $( ".foodcase>." + this.cls ).css( "left", x + "rem" ).css( "top", y + "rem" );
    }
    window.Food = Food; //暴露接口
} )()
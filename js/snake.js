( function () { //作用域
    function Snake( headbgc, bodybgc, pstx, psty, len, spdfast, spdslow, dir, turnUp, turnDown, turnLeft, turnRight ) { //构造函数
        this.cls = ++snakeCounter;
        this.head = {};
        this.body = {};
        this.spd = {}; //速度(定时器中的间隔时间)
        this.ctrler = {}; //键位
        this.len = len; //长度
        this.dir = dir; //方向(当前朝向)
        this.nxt = this.dir; //下一步的走向
        this.head.bgc = headbgc;
        this.head.pst = {};
        this.head.pst.x = pstx;
        this.head.pst.y = psty;
        this.body.bgc = bodybgc;
        this.body.pst = [];
        this.spd.fast = spdfast;
        this.spd.slow = spdslow;
        this.ctrler.turnUp = turnUp;
        this.ctrler.turnDown = turnDown;
        this.ctrler.turnLeft = turnLeft;
        this.ctrler.turnRight = turnRight;
        this.ctrler.up = false;
        this.ctrler.down = false;
        this.ctrler.left = false;
        this.ctrler.right = false;
        this.startMove = function ( e ) { //init中监听开始事件的callback
            var i;
            for ( i in this.ctrler ) {
                if ( e.keyCode === this.ctrler[ i ] ) {
                    $( document ).off( "keydown", this.startMove ); //很难成功
                    $( document ).on( "keydown", turn.bind( this ) );
                    $( document ).on( "keyup", rst.bind( this ) );
                    g.t[ this.cls + 100 ] = setInterval( fast.bind( this ), this.spd.fast );
                    g.t[ this.cls + 200 ] = setInterval( slow.bind( this ), this.spd.slow );
                }
            }
        }.bind( this )
    }
    Snake.prototype.init = function () { //初始化
        headInit.apply( this );
        bodyInit.apply( this );
        $( document ).on( "keydown", this.startMove );
    }
    var turn = function ( e ) { //startMove中监听转向和加速的callback
        switch ( e.keyCode ) {
            case this.ctrler.turnUp:
                this.ctrler.up = true;
                if ( this.dir === "left" || this.dir === "right" ) {
                    this.nxt = "up";
                }
                break;
            case this.ctrler.turnDown:
                this.ctrler.down = true;
                if ( this.dir === "left" || this.dir === "right" ) {
                    this.nxt = "down";
                }
                break;
            case this.ctrler.turnLeft:
                this.ctrler.left = true;
                if ( this.dir === "up" || this.dir === "down" ) {
                    this.nxt = "left";
                }
                break;
            case this.ctrler.turnRight:
                this.ctrler.right = true;
                if ( this.dir === "up" || this.dir === "down" ) {
                    this.nxt = "right";
                }
                break;
            default:
                break;
        }
    }
    var rst = function ( e ) { //startMove中监听减速的callback
        switch ( e.keyCode ) {
            case this.ctrler.turnUp:
                this.ctrler.up = false;
                break;
            case this.ctrler.turnDown:
                this.ctrler.down = false;
                break;
            case this.ctrler.turnLeft:
                this.ctrler.left = false;
                break;
            case this.ctrler.turnRight:
                this.ctrler.right = false;
                break;
            default:
                break;
        }
    }
    var slow = function () { //startMove中开启慢速行驶的定时器的callback
        if ( this.ctrler.up === false && this.ctrler.down === false && this.ctrler.left === false && this.ctrler.right === false ) {
            step.apply( this );
        }
    }
    var fast = function () { //startMove中开启快速行驶的定时器的callback
        if ( this.ctrler.up === true || this.ctrler.down === true || this.ctrler.left === true || this.ctrler.right === true ) {
            step.apply( this );
        }
    }
    var step = function () { //slow或fast中判定成功后进行的一次移动
        var msg, p = {};
        msg = createHeadTry.apply( this ); //用工厂模式创建一个试探实例
        //在body位置数组的队首加入一个新值
        p.x = this.head.pst.x;
        p.y = this.head.pst.y;
        this.body.pst.unshift( p );
        //刷新head位置的值
        this.head.pst.x = msg.p.x;
        this.head.pst.y = msg.p.y;
        //根据试探后得到的信息执行下一步动作
        if ( msg.e === "over" ) {
            over( msg.c );
        } else if ( msg.e === "eat" ) {
            bodyLengthen.apply( this );
            headMove.apply( this );
            msg.f.refresh();
        } else {
            bodyMove.apply( this );
            headMove.apply( this );
        }
    }
    var createHeadTry = function () { //工厂模式创建一个本Snake实例对象中的试探实例返回值为一个包含试探结果信息的对象
        var i, j, obj = {};
        obj.c = this.head.bgc;
        obj.p = {};
        obj.p.x = this.head.pst.x;
        obj.p.y = this.head.pst.y;
        this.dir = this.nxt;
        switch ( this.dir ) {
            case "left":
                obj.p.x--;
                break;
            case "right":
                obj.p.x++;
                break;
            case "up":
                obj.p.y--;
                break;
            case "down":
                obj.p.y++;
                break;
            default:
                break;
        }
        if ( obj.p.x < 0 || obj.p.y < 0 || obj.p.x > g.m.size.x - 1 || obj.p.y > g.m.size.y - 1 ) {
            obj.e = "over";
        }
        for ( i = 0; i < g.s.length; i++ ) {
            if ( i !== this.cls - 1 && obj.p.x === g.s[ i ].head.pst.x && obj.p.y === g.s[ i ].head.pst.y ) {
                obj.e = "over";
            }
            for ( j = 0; j < g.s[ i ].body.pst.length; j++ ) {
                if ( obj.p.x === g.s[ i ].body.pst[ j ].x && obj.p.y === g.s[ i ].body.pst[ j ].y ) {
                    obj.e = "over";
                }
            }
        }
        for ( i = 0; i < g.f.length; i++ ) {
            if ( obj.p.x === g.f[ i ].pst.x && obj.p.y === g.f[ i ].pst.y ) {
                obj.e = "eat";
                obj.f = g.f[ i ];
            }
        }
        return obj;
    }
    var headInit = function () {
        $( ".snakeheadcase" ).append( "<div class=" + this.cls + "></div>" );
        $( ".snakeheadcase>." + this.cls ).css( "left", this.head.pst.x + "rem" ).css( "top", this.head.pst.y + "rem" ).css( "background-color", this.head.bgc );
    }
    var headMove = function () {
        $( ".snakeheadcase>." + this.cls ).css( "left", this.head.pst.x + "rem" ).css( "top", this.head.pst.y + "rem" );
    }
    var bodyInit = function () {
        var x, y;
        x = this.head.pst.x;
        y = this.head.pst.y;
        $( ".snakebodycase" ).append( "<div class=" + this.cls + "></div>" );
        for ( i = 0; i < this.len - 1; i++ ) {
            $( ".snakebodycase>." + this.cls ).append( "<div></div>" );
            switch ( this.dir ) {
                case "up":
                    y--;
                    break;
                case "down":
                    y++;
                    break;
                case "left":
                    x++;
                    break;
                case "right":
                    x--;
                    break;
                default:
                    break;
            }
            //直接修改p.x会连带修改已经push进数组的所有元素
            //只能在每次push之前声明新的p覆盖老的p
            //因此需要在循环中声明p
            var p = {};
            p.x = x;
            p.y = y;
            this.body.pst.push( p );
            $( ".snakebodycase>." + this.cls + ">div:nth-child(" + ( i + 1 ) + ")" ).css( "left", p.x + "rem" ).css( "top", p.y + "rem" );
        }
        $( ".snakebodycase>." + this.cls + ">div" ).css( "background-color", this.body.bgc ); //不是赋在css中而是赋在html中因此要创建完元素后再赋值
    }
    var bodyMove = function () {
        this.body.pst.pop();
        for ( i = 0; i < this.body.pst.length; i++ ) {
            $( ".snakebodycase>." + this.cls + ">div:nth-child(" + ( i + 1 ) + ")" ).css( "left", this.body.pst[ i ].x + "rem" ).css( "top", this.body.pst[ i ].y + "rem" );
        }
    }
    var bodyLengthen = function () {
        this.len++;
        $( ".snakebodycase>." + this.cls ).prepend( "<div></div>" );
        $( ".snakebodycase>." + this.cls + ">div" ).css( "background-color", this.body.bgc );
        $( ".snakebodycase>." + this.cls + ">div:first-child" ).css( "left", this.body.pst[ 0 ].x + "rem" ).css( "top", this.body.pst[ 0 ].y + "rem" );
    }
    window.Snake = Snake; //暴露接口
} )()
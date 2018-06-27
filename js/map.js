( function () { //作用域
    function Map( bgc, sizex, sizey ) { //构造函数
        this.size = {};
        this.bgc = bgc;
        this.size.x = sizex;
        this.size.y = sizey;
    }
    Map.prototype.init = function () { //初始化
        $( ".map" ).css( "width", this.size.x + "rem" ).css( "height", this.size.y + "rem" ).css( "background-color", this.bgc );
    }
    window.Map = Map; //将本作用域的接口暴露给顶级作用域的window实例对象
} )()
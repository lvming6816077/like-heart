/**
 * LikeHeart
 * @version: 1.0.0
 * @author tennylv
 * @date 2018-05-24
 *
 */
'use strict';
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
        //CMD
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
        //AMD
    } else {
        //WINDOW
        root.LikeHeart = factory();
    }
})(this, function() {

    var LikeHeart = function(opt) {

        /**
         * 初始化心
         * 
         * @param {object} 
         * @object.x {number} 心起点位置x
         * @object.y {number} 心起点位置y
         * @object.endX {number} 心结束位置x
         * @object.endY {number} 心结束位置y
         * @object.height {number} 高
         * @object.width {number} 宽
         * @object.angelBegin {number} 左右摇摆起始角度(可为负值)
         * @object.angelEnd {number} 左右摇摆结束角度
         * @object.angleLeft {bool} 是否起始从坐往右摇摆
         * @object.noScale {bool} 是否使用缩放心动画
         * @object.scaleDis {number} 缩放心临界值(默认从起始位置到升高50)
         * @object.noFadeOut {bool} 是否使用fadeOut
         * @object.opacityDis {number} fadeout心临界值(默认距离结束位置40)
         * @object.speed {number} 上升速度 
         * @object.bezierPoint {obj} 贝塞尔曲线4个点的值参考https://aaaaaaaty.github.io/bezierMaker.js/playground/playground.html
         * @object.fadeOut {function}  每个心fadeOut之后回调
         * @object.image {obj} 图片对象
         */


          this.id = opt.id;
          this.x = opt.x;
          this.y =  opt.y;
          this.endX = opt.endX;
          this.endY =  opt.endY;
          this.orignY = opt.y;
          this.height = opt.height;
          this.width = opt.width;
          this.angle = 0;
          this.angleLeft = opt.angleLeft;
          this.angelBegin = opt.angelBegin || (-20 + rand(1,2));
          this.angelEnd = opt.angelEnd || (20 + rand(1,4));
          this.scale = 0;
          this.scaleDis = opt.scaleDis || 50;
          this.opacityDis = opt.opacityDis || 40;
          this.noScale = opt.noScale;
          this.noAngel = opt.noAngel;
          this.opacity = 1;
          this.speed = opt.speed || 0.0027;
          this.bezierPoint = opt.bezierPoint;
          this.bezierDis = 0;
          this.onFadeOut = opt.onFadeOut;
          this.IMG = opt.image;

          this.move = function (ctx) {

            if (this.opacity === 0) {

                this.onFadeOut && this.onFadeOut(this);
            }

            this.y = getBezierLine(this).yt;
            this.x = getBezierLine(this).xt;


            this.angle = rangeAngle(this);
            this.scale = getFScale(this);
            this.opacity = getFAlpha(this);


            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle*(Math.PI/180));
            ctx.scale(this.scale, this.scale);
            ctx.globalAlpha = this.opacity;

            ctx.drawImage(this.IMG, -(this.IMG.width/2), -(this.IMG.height/2), this.width, this.height);
            ctx.restore();
          };

    };


    /**
     * 计算心左右摇摆的方法
     */
    function rangeAngle(heart) {
        if (heart.noAngel) {
            return 0;
        }
        let _angle = heart.angle;

        // 心介于[start, end]之间不断变化角度
        if(_angle >= heart.angelEnd) {
            // 角度不断变小，向左摇摆
            heart.angleLeft = false;
        } else if (_angle <= heart.angelBegin){
            // 角度不断变大，向又摇摆
            heart.angleLeft = true;
        }

        // 动态改变角度
        if (heart.angleLeft) {
            _angle = _angle + 1;
        } else {
            _angle = _angle - 1;
        }

        return _angle;

    }


    /**
     * 计算缩放角度的方法
     */
    function getFScale(heart){
        if (heart.noScale) {
            return 1;
        }
        let _scale = heart.scale;


        // 随着距离起始点的距离增加，scale不断变大
        let dis = heart.orignY - heart.y;
        _scale = (dis / heart.scaleDis);

        // 当大于设置的阈值时变成1
        if (dis >= heart.scaleDis) {
            _scale = 1;
        }

        return _scale;
    }

    /**
     * 计算透明度的方法
     */
    function getFAlpha(heart) {

        let _opacity = heart.opacity;

        let dis = heart.y - heart.endY;

        if (dis <= heart.opacityDis) {

            _opacity = Math.max((dis / heart.opacityDis), 0);

        } else {
            _opacity = 1;
        }
        return _opacity;
    }

    /**
     * 获得min-max的随机整数
     */
    function rand (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 获得贝塞尔曲线路径
     * 一共4个点
     */
    function getBezierLine(heart){
        var obj = heart.bezierPoint;
        var p0 = obj.p0;
        var p1 = obj.p1;
        var p2 = obj.p2;
        var p3 = obj.p3;
        var t = heart.bezierDis;
        var cx = 3 * (p1.x - p0.x),
            bx = 3 * (p2.x - p1.x) - cx,
            ax = p3.x - p0.x - cx - bx,

            cy = 3 * (p1.y - p0.y),
            by = 3 * (p2.y - p1.y) - cy,
            ay = p3.y - p0.y - cy - by,

            xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x,
            yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

        heart.bezierDis += heart.speed;

        return {
            xt: xt,
            yt: yt
        }
    }

    return LikeHeart;

});

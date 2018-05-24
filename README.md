# like-heart

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

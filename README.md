

## Canvas点赞送心组件


## 特性

* 配置项多，定制化强
* 基于canvas效果，性能更强
* 使用简单方便



## 示例

<img src="https://qiniu.nihaoshijie.com.cn/image/heart.gif"/>

## 使用方法

```
    let img = new Image();
    img.src = './img/like0'+Math.ceil(Math.random()*3)+'.png';


    let p1 = {
        x: 100 + getRandomDis(),
        y: 300 + getRandomDis()
    };

    let p2 = {
        x: 100 + getRandomDis(),
        y: 200 + getRandomDis()
    };

    new LikeHeart({
        id: heartCount,
        x: 200,
        y: 200,
        endX: 200,
        endY: 200,
        onFadeOut: removeItem,

        width: 66,
        height: 66,
        image: img,
        bezierPoint: {
            p0: {
                x: 200,
                y: 200
            },

            p1: p1,
            p2: p2,
            p3: {
                x: 200,
                y: 200
            }
        }
    });
```

## 配置说明
| 参数     | 类型     | 描述 | 必需 | 默认值 |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| object.x         | number      | 心起点位置x | 是 |  |
| object.y         | number      | 心起点位置y | 是 |  |
| object.endX         | number      | 心结束位置x | 是 | |
| object.endY         | number      | 心结束位置x | 是 |  |
| object.height         | number      | 高 | 是 |  |
| object.width         | number      | 宽 | 是 |  |
| object.angelEnd         | number      | 左右摇摆起始角度 | 否 | -20 |
| object.angelBegin         | number      | 左右摇摆结束角度 | 否 | 20 |
| object.noScale         | bool   | 是否使用缩放心动画 | 否 |  |
| object.scaleDis         | number      | 缩放心临界值(默认从起始位置到升高50) | 否 | 50 |
| object.noFadeOut         | bool      | 是否使用fadeOut | 否 |  |
| object.opacityDis         | number      | 缩放心临界值(默认从起始位置到升高50) | 否 | 50 |
| object.speed         | number      | 上升速度 | 否 | 0.023 |
| object.bezierPoint         | number      | 贝塞尔曲线4个点的值 | 是 |  |
| object.onFadeOut         | function      | 每个心fadeOut之后回调 | 否 |  |
| object.image         | obj      | 图片对象 | 是 |  |


## License
Licensed under MIT license.

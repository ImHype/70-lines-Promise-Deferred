# promise_defered

> 核心要点就是一个事件三态之间的变化

-------------------------
## How Does It Run
* 每次创建promise对象时，内部有一个队列，用于存储相应的"onFulfilled"和"onRejected"方法
* promise 具有then方法，用于promise的链式结构
* deferred 具有"resolve"和"reject"两大方法，用于发布消息，对应接收方的"onFulfilled"和"onRejected"

## Note
* 每次新建deferred对象时，要把deferred.promise给return出来，才能保证可以继续链式惭怍

## License

© Junyu Xu

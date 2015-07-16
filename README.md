# 70行代码阐述 Promise-Deferred

* Promise-Deferred 核心要点就是一个事件三态之间的变化
* 我理解为是eventEmitter的高级封装 
* 对应 "Pending" 、"Fulfilled" 、"Rejected" 三态的切换
* 发布者 具有 "resolve"和"reject"两大消息通知方法，对应订阅者的 "onFulfilled"和"onRejected"

```js
Deferred.prototype.callback = function(){
	var that = this;
	return function(err,result){
		if(err){
			that.reject(err);
			return;
		}
		that.resolve(result);
	}
}
```
此处为我一个Node.js中callback的封装，函数内部需要定义何时执行reject和resolve

```js
var readFile = function(file){
	var deferred = new Deferred();
	fs.readFile(file,"utf-8",deferred.callback());
	return deferred.promise;
}
```
此处为 deferred实例的新建，每一个函数返回出 deferred.promise对象，才拥有继续then的权利

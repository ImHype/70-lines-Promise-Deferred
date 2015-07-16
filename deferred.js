/**
* 70行代码阐述 Promise/A
* Promise/A 核心要点就是一个事件三态之间的变化
* 我理解为是eventEmitter的高级封装 
* 对应 "Pending" 、"Fulfilled" 、"Rejected" 三态的切换
*
**/
(function(global,factory){
	var Deferred = factory();
	if(module && module.exports){
		module.exports = Deferred;
	}else {
		global.deferred = Deferred;
	}
}(this,function (){
	// Promise传递的模型
	var Promise = function(){
		this.list = [];
		this.isPromise = true;
	}
	// Then
	Promise.prototype.then=function(onFulfilled ,onRejected){
		var handler = {};
		var str;
		if((str=Object.prototype.toString.call(onFulfilled)).slice(8,str.length-1)=="Function"){
			handler.onFulfilled = onFulfilled;
		}
		if((str=Object.prototype.toString.call(onRejected)).slice(8,str.length-1)=="Function"){
			handler.onRejected = onRejected;
		}
		this.list.push(handler);
		return this;
	}
	// Deferred模型
	var Deferred = function(){
		this.promise = new Promise();
	}
	// Resolve Pending => Fulfilled
	Deferred.prototype.resolve = function(obj){
		var promise = this.promise;
		var handler;
		while((handler=promise.list.shift())){
			if(handler && handler.onFulfilled){
				var result = handler.onFulfilled(obj);
				if(result && result.isPromise){
					result.list = promise.list;
					this.promise = result;
					return;
				}
			}
		}
	}
	// Reject Pending => Rejected
	Deferred.prototype.reject = function(obj){
		var promise = this.promise;
		var handler;
		while((handler=promise.list.shift())){
			if(handler && handler.onRejected){
				var result = handler.onRejected(obj);
				if(result && result.isPromise){
					result.list = promise.list;
					this.promise = result;
					return;
				}
			}
		}
	}

	// Node.js中的统一接口
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
	return Deferred;
}));
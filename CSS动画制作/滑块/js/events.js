(function(window, undefined) { 
	/* 声明构造函数events */
	const events = function(selector, context) {
		/* 在构造函数内部实例化 */
		return new events.fn.init(selector, context);
	};
	/* 把events原型对象赋值给events.fn */
	events.fn = events.prototype = {
		constructor: events,
		/* 获取对象 */
		init: function(selector, context) {
			if(typeof selector === 'string') {
				let nodes = document.querySelectorAll(selector);
				this.length = nodes.length;
				for(let i = 0; i < this.length; i++) {
					this[i] = nodes[i];
				}
			} else {
				this[0] = selector;
				this.length = 1;
			}
			
			return this;
		},
		/* 添加自定义事件 */
		on: function(type, listener) {
			let self = this;
			for(let i = 0; i < this.length; i++) {
				if(this[i].events) {
					if(this[i].events[type]) {
						this[i].events[type].push(listener)
					} else {
						this[i].events[type] = [listener];
					}

				} else {
					this[i].events = {};
					this[i].events[type] = [listener];
				}
				if(this[i]['event' + type]) continue;
				this[i]['event' + type] = true;
				this[i].addEventListener(type, function(ev) {

					for(let i = 0; i < this.events[type].length; i++) {

						this.events[type][i].call(this, ev);
					}
				}, false);
			}
		},
		/* 自定义事件触发器 */
		trigger: function(type, data) {
			let len = this.length;
			for(let i = 0; i < len; i++) {
				if(!(this[i].events && this[i].events[type])) {
					continue;
				}
				for(let j = 0; j < this[i].events[type].length; j++) {

					this[i].events[type][j].apply(this[i], [{
						target: this[i],
						type: type
					}].concat(data));
				}
			}
		}
	};
	/* 将events身上所有的方法赋值给events.fn.init */
	events.fn.init.prototype = events.fn;
	/* 将events对象赋值给window身上的$属性，使方法能在外部调用 */
	window.$ = events;
})(window, undefined)
/* 定义undefined ↑ */
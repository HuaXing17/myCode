/* 
 * 持续修复中（等后续）
 * 		初始值设置为100会出现滑块超出导轨的问题
 */
function SlideBar(){
	this.settings = {
		id:'',
		nowValue:50		//这个代表滑块走的距离（百分比）是设置的默认值
	}
};
SlideBar.prototype = {
	constructor:SlideBar,
	//初始化
	init:function(opt){
		for(let attr in this.settings){
			if(this.settings.hasOwnProperty(attr)){
				this.settings[attr] = opt[attr];
			}
		}
		//创建dom
		this.createDom();
	},
	createDom:function(){
		this.wrap = document.getElementById(this.settings.id);
		this.bar = document.createElement("div");
		this.bar .className = 'bar';
		
		this.line = document.createElement("div");
		this.line.className = 'line';
		
		this.slide = document.createElement("div");
		this.slide.className = 'slide';
		this.slide.style.left = this.settings.nowValue + '%';
		this.bar.appendChild(this.line);
		this.bar.appendChild(this.slide);
		this.wrap.appendChild(this.bar);
		
		let This = this;
		//结构加载完成以后，可以拖拽
		this.drag();
		this.bar.onclick = function(ev){
			//结构加载完成以后，可以点击
			This.dragClick(ev);
		};
	},
	//拖拽
	drag:function(){
		let This = this;
		this.slide.onmousedown = function(ev){
			This.dragDown(ev);
			
			document.onmousemove = function(ev){
				This.dragMove(ev);
			}
			document.onmouseup = function(){
				This.dragUp();
			}
			
			ev.cancelBubblr = true;
			return false;
		};
	},
	//鼠标按下（拖拽）
	dragDown:function(ev){
		this.dis = ev.clientX - this.slide.offsetLeft;
	},
	//鼠标移动（拖拽）
	dragMove:function(ev){
		this.l = ev.clientX - this.dis;
		
		if(this.l < 0){
			this.l = 0;
		}else if(this.l > this.bar.offsetWidth - this.slide.offsetWidth){
			this.l = this.bar.offsetWidth - this.slide.offsetWidth;
		}
		
		//在这里修改nowValue的值
		this.nowValue = this.l/(this.bar.offsetWidth - this.slide.offsetWidth) * 100;
		
		this.slide.style.left = this.l + 'px';
	},
	//清除拖拽事件
	dragUp:function(){
		document.onmousemove = null;
		document.onmouseup = null;
	},
	//点击定位
	dragClick:function(ev){
		//这个值是鼠标点击的位置
		const clickPos = ev.clientX - this.bar.offsetLeft;
		//这个值是鼠标点击的位置占整个位置的百分比
		const pec = clickPos / this.bar.offsetWidth;
		
		this.setValue(pec * 100);
	},
	
	setValue:function(value){
		//这个方法是用来设置滑块的位置的，参数是百分比
		this.slide.style.left = value+'%';
		this.slide.style.left = this.slide.offsetLeft - this.slide.offsetWidth/2 + 'px';
		const l = this.slide.offsetLeft;
		if(l < 0){
			this.slide.style.left = 0;
		}else if(l > this.bar.offsetWidth - this.slide.offsetWidth){
			this.slide.style.left = this.bar.offsetWidth - this.slide.offsetWidth + 'px';
		}
	}
}
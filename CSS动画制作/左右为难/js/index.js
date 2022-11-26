const left = document.getElementById("left-box");
const handleMove = (e) => {
	left.style.width = `${(e.pageX / window.innerWidth) * 100}%`;
};
//分割线随鼠标的位置移动
document.onmousemove = (e) => {
	handleMove(e);
}
//移动端
document.ontouchmove = (e) => {
  handleMove(e.touches[0]);
};

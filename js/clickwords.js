// 国风汉字数组，你可自行增加
var words = ["风","雨","云","月","山","水","雪","花","意","梦","心","竹","墨","茶","琴","剑"];

document.addEventListener('click', function (event) {
    var word = words[Math.floor(Math.random() * words.length)];
    var span = document.createElement("span");
    span.innerText = word;

    // 样式设置
    span.style.position = "fixed";
    span.style.zIndex = 9999;
    span.style.left = event.clientX + "px";
    span.style.top = event.clientY + "px";
    span.style.fontWeight = "bold";
    span.style.fontSize = "24px";
    span.style.color = "rgba(0,0,0,0.85)";
    span.style.fontFamily = "'KaiTi','STKaiti','FangSong','SimSun','Noto Serif SC',serif'"; // 国风字体

    document.body.appendChild(span);

    // 动画
    let opacity = 1;
    let rise = 0;

    var timer = setInterval(function () {
        rise += 1;
        opacity -= 0.02;
        span.style.top = (event.clientY - rise) + "px";
        span.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(timer);
            document.body.removeChild(span);
        }
    }, 16);
});

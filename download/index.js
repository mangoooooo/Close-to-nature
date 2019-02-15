/**
 * 下载blob创建的json文件
 */
// 创建一个json类型的Blob对象，支持传入同类型数据的一个数组
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)], {type: 'application/json'});
var url = URL.createObjectURL(blob);
//  给a标签href赋值
document.getElementById('blob-download').setAttribute('href', url)


/**
 * 下载图片
 */
document.getElementById('img-download').addEventListener('click', function () {
    getImageBlob('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3742910000,2737153630&fm=27&gp=0.jpg', function (blob) {
        // 生成下载用的URL对象
        let url = URL.createObjectURL(blob);
        // 生成一个a标签，并模拟点击，即可下载，批量下载同理
        let aDom = document.createElement('a');
        aDom.href = url;
        aDom.download = 'download.png';
        aDom.text = '下载文件';
        document.getElementsByTagName('body')[0].appendChild(aDom);
        aDom.click();
    });
}, false)

function getImageBlob(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            cb(this.response);
        }
    };
    xhr.send();
}

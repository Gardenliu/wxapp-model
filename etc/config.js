/**
 * 小程序配置文件
 */
// 此处主机域名修改成腾讯云解决方案分配的域名
var host = "https://www.XXX.com";
var config = {
    service: {
        // 登录地址，用于建立会话
        loginUrl: `${host}/index.php?s=/Wxapp/user/login.html`,
        configUrl: `${host}/index.php?s=/Wxapp/index/index.html`,
        detailUrl:`${host}/index.php?s=/Wxapp/index/detail.html`,
        loanUrl:`${host}/index.php?s=/Wxapp/index/loan.html`,
        searchUrl:`${host}/index.php?s=/Wxapp/index/search.html`,
        gdKey:'64a78ecc4ce602ddd1495f61a9502855'
    }
};
module.exports = config;
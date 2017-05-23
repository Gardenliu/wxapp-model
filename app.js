var qcloud = require('./vendor/wxapp-client-sdk/index');
var config = require('./etc/config');
App({
  globalData: {
    bannerList: null,
    areaList:null,
    userInfo:null,
    linkList:null,
    indexArea:{hname:'',hprice:''},
  },
  onLaunch() {
    qcloud.setLoginUrl(config.service.loginUrl);
    this.getConfig();
  },
  getAppConfig: function(fn,bool) {
    var that = this;
    if(that.globalData.bannerList && that.globalData.linkList && !bool){
      typeof fn == "function" && fn(that.globalData)
    }else{
      that.getConfig(function(data){
        typeof fn == "function" && fn(data);
      });
    }
  },
  getConfig: function (fn) {
    var that = this;
    qcloud.request({
      url: config.service.configUrl,
      method: 'POST',
      login: true,
      success(res){
        console.log('程序配置项', res);
        let data=res.data.data;
        if (res.data.success) {
          that.globalData.bannerList=data.banner;
          that.globalData.areaList=data.areaList;
          that.globalData.userInfo=data.userInfo;
          that.globalData.linkList=data.linkList;
          typeof fn == "function" && fn(that.globalData);
        }
      }
    });
  },
});
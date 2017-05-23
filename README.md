## 小程序通用model

### 安装
- `npm install -g bower`
- `bower install wxapp-model --save`


### 项目目录结构
```        
├── vender                    插件目录
|   ├── wxapp-client-sdk         客户端sdk
|   └── assets          小程序公共素材包
├── pages               小程序界面
├── app.js             小程序入口文件(需要自行添加)
├── app.json           小程序全局配置(配置商城模块页面)
├── app.wxss           小程序全局样式
└── config.js          小程序项目配置文件(配置商城模块功能)
```
#### 配置app.json
> 将需要的页面配置到 `app.json` 文件中

```javascript
"pages":[
    "pages/index/index",
    "pages/index/search",
    "pages/index/forecast",
    "pages/counter/index",
    "pages/loan/index",
    "pages/detail/index",
    "vendor/assets/common/noAuth/notAuth",
    "pages/about/index",
    "pages/map/car"
  ],
```

#### app.js 与app.wxss
> app.js符合设计器中的规范,没有多余代码(功能代码移植到until文件中)

```javascript
var qcloud = require('./vendor/wxapp-client-sdk/index');
var config = require('./config');
App({
    onLaunch() {
        qcloud.setLoginUrl(config.service.apiHost+"/apis/"+config.version.appId+"/login/login");
        qcloud.setBusinessId(config.service.businessId);
    },    
});
```

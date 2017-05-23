//获取应用实例
//logs.js
import amapFile from "../../vendor/assets/plugins/amap-wx.js";
import config from "../../etc/config";
var app = getApp();
Page({
    data: {
        markers: [{
            iconPath: "../../vendor/assets/images/pos.png",
            id: 0,
            latitude: null,
            longitude: null,
            width: 23,
            height: 23
        },{
            iconPath: "../../vendor/assets/images/pos_m.png",
            id: 0,
            latitude: null,
            longitude: null,
            width: 24,
            height: 24
        }],
        distance: '',
        cost: '',
        polyline: []
    },
    onLoad: function(opt) {
        console.log("pos",opt.pos)
        var that = this;
        let pos=opt.pos.split(",");
        let latitude=pos[0],longitude=pos[1];
        let olatitude=opt.mylat,olongitude=opt.mylong;
        if(latitude && olatitude && longitude && olongitude){
            that.setData({
                "markers[0].latitude": Number(olatitude),
                "markers[0].longitude": Number(olongitude),
                "markers[1].latitude": Number(latitude),
                "markers[1].longitude": Number(longitude)
            });
        }
        var myAmapFun = new amapFile.AMapWX({key: config.service.gdKey});
        myAmapFun.getDrivingRoute({
            origin: olongitude+","+olatitude,
            destination: longitude+","+latitude,
            success: function(data){
                var points = [];
                if(data.paths && data.paths[0] && data.paths[0].steps){
                    var steps = data.paths[0].steps;
                    for(var i = 0; i < steps.length; i++){
                        var poLen = steps[i].polyline.split(';');
                        for(var j = 0;j < poLen.length; j++){
                            points.push({
                                longitude: parseFloat(poLen[j].split(',')[0]),
                                latitude: parseFloat(poLen[j].split(',')[1])
                            })
                        }
                    }
                }
                that.setData({
                    polyline: [{
                        points: points,
                        color: "#0091ff",
                        width: 6
                    }]
                });
                if(data.paths[0] && data.paths[0].distance){
                    that.setData({
                        distance: data.paths[0].distance + '米'
                    });
                }
                if(data.taxi_cost){
                    that.setData({
                        cost: '打车约' + parseInt(data.taxi_cost) + '元'
                    });
                }

            },
            fail: function(info){

            }
        })
    },

})

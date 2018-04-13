//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headList:[
       {id:"color_1",value:"颜色",no:0}
       ,{id:"color_2",value:"数量",no:1}
       ,{id:"color_3",value:"大小",no:2}
       ,{id:"color_4",value:"质量",no:3}
       ,{id:"color_5",value:"其他",no:4}],
    planeList:[
        {id:"green",value:"绿色",weight:1}
       ,{id:"red",value:"红色",weight:1}
       ,{id:"yellow",value:"黄色",weight:2}
       ,{id:"blue",value:"蓝色",weight:1}
       ,{id:"black",value:"黑色",weight:3}
       ,{id:"orange",value:"橙色",weight:1}]
  },
  //事件处理函数
 /* bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
   // debugger;
   /* console.log(this.route);
      console.log(getCurrentPages());
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  onReady:function(op){

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

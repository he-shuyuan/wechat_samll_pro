const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        ctx:null,
        colorList: ['黑色','红色','黄色','蓝色','绿色'],
        colorArray:['black','red','yellow','blue','green'],
        currentColorIndex:0
    },
    onLoad: function() {
        console.log(app.globalData.userInfo)
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
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
        }
    },
    onReady: function(op) { 
        this.setData({
                ctx: wx.createContext()
            })
        this.data.ctx.setLineWidth(1)
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    _start:function(e){
     
      this.data.ctx.beginPath()

      this.data.ctx.moveTo(e.touches[0].x,e.touches[0].y);
     
      //   console.log(e.touches[0].x);
    },
    _move:function(e){
      this.data.ctx.lineTo(e.touches[0].x,e.touches[0].y);
      this.data.ctx.stroke()
      wx.drawCanvas({
         canvasId: 'myCanvas',
         reserve: true,
         actions: this.data.ctx.getActions() // 获取绘图动作数组
      })
      this.data.ctx.moveTo(e.touches[0].x,e.touches[0].y);
    },
    _end:function(e){
      //this.data.ctx.save();
     console.log(this.data.ctx)
    },
    _backStep:function(e){
      this.data.ctx.restore();
    },
    _sliderChange:function(e){
      this.data.ctx.setLineWidth(e.detail.value);
    },
    _pickerChange:function(e){
      this.data.ctx.setStrokeStyle(this.data.colorArray[e.detail.value])
      this.setData({
        currentColorIndex:e.detail.value
      })
    }
})

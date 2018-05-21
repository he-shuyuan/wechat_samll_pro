const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        ctx: null,
        colorList: ['黑色', '红色', '黄色', '蓝色', '绿色'],
        colorArray: ['black', 'red', 'yellow', 'blue', 'green'],
        currentColorIndex: 0,
        allDrawWorksPath: []
    },
    onLoad: function() {
        console.log('e21', app.globalData.userInfo)
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
            ctx: wx.createCanvasContext('myCanvas')
        })
        this.data.ctx.setLineWidth(1)
    },
    getUserInfo: function(e) {
        console.log('e22', e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    _start: function(e) {
        console.log('ee')
        this.data.ctx.beginPath()

        this.data.ctx.moveTo(e.touches[0].x, e.touches[0].y);
        this.saveCurrentDrawWorks()
            //   console.log(e.touches[0].x);
    },
    _move: function(e) {
        this.data.ctx.lineTo(e.touches[0].x, e.touches[0].y);
        this.data.ctx.stroke()
        wx.drawCanvas({
            canvasId: 'myCanvas',
            reserve: true,
            actions: this.data.ctx.getActions() // 获取绘图动作数组
        })
        this.data.ctx.moveTo(e.touches[0].x, e.touches[0].y);
    },
    _end: function(e) {
        //this.data.ctx.save();
        console.log('e23', this.data.ctx)
    },
    _backStep: function(e) {
        this.data.ctx.restore();
    },
    _sliderChange: function(e) {
        this.lineWidth = e.detail.value
        this.data.ctx.setLineWidth(e.detail.value);
    },
    _pickerChange: function(e) {
        this.paintColor = e.detail.value
        this.data.ctx.setStrokeStyle(this.data.colorArray[e.detail.value])
        this.setData({
            currentColorIndex: e.detail.value
        })
    },
    saveCurrentDrawWorks: function() {
        console.log('232')
        let self = this
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            destWidth: 0,
            destHeight: 0,
            canvasId: 'myCanvas',
            success: function(res) {
                console.log('res1', res)
                var imgPath = res.tempFilePath;
                var allDrawWorksPath = self.data.allDrawWorksPath;
                allDrawWorksPath.push(imgPath);
                console.log('allDrawWorksPath', allDrawWorksPath)
                self.setData({
                        allDrawWorksPath: allDrawWorksPath,
                    })
                    // self.data.id++
                console.log('allDrawWorksPath2', self.data.allDrawWorksPath)
            },
            fail: res => {
                console.log('获取画布图片失败', res);

            }
        })
    },
    drawRevoke: function() {
        console.log(123);
        let self = this
            // self.data.id--;
        var allDrawWorksPath = self.data.allDrawWorksPath;
        if (allDrawWorksPath == null || allDrawWorksPath.length == 0 || allDrawWorksPath == undefined) {
            return;
        }

        var privWorksPath = allDrawWorksPath.pop();
        console.log('privWorksPath', privWorksPath)
        self.setData({
            allDrawWorksPath: allDrawWorksPath,
        })
        console.log('allDrawWorksPath3', allDrawWorksPath)
            // drawPath.pop();
        self.data.ctx.setLineWidth(self.lineWidth);
        // self.setPaintColor(self.data.StrokeStyle);
        this.data.ctx.setStrokeStyle(this.data.colorArray[self.paintColor])
        this.data.ctx.drawImage(privWorksPath, 0, 0, 300, 150);
        this.data.ctx.draw();

        if (allDrawWorksPath.length == 0) {

        }
    },
})
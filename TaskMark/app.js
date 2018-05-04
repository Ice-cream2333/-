//app.js
App({
  onLaunch: function () {
    // this.checklogin()
  },
  login: function () {
    //调用API从本地缓存中获取数据
    var that = this
    wx.login({
      success: function (res) {
        console.log(res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.ip + '/daxuejun/wx?code=' + res.code,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              console.log(1)              
              var token = res.data.result.id + '_' + res.data.result.token
              wx.setStorageSync('studentId', res.data.result.id)
              wx.setStorageSync('token', token)
              // wx.getUserInfo({
              //   success: function (res) {
              //     // console.log(res);
              //     // that.globalData.userInfo = res.userInfo
              //     // typeof cb == "function" && cb(that.globalData.userInfo)
              //   }
              // })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        // wx.getUserInfo({
        //   success: function (res) {
        //     console.log(res);
        //     that.globalData.userInfo = res.userInfo
        //     typeof cb == "function" && cb(that.globalData.userInfo)
        //   }
        // })
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function () {
            // that.getUserInfo(function (userInfo) {
            //   //更新数据
            //   that.setData({
            //     userInfo: userInfo
            //   })
            // })
            this.login()
          }//重新登录
        })
      }
    })
  },
  checklogin: function () {
    wx.checkSession({
      success: function (res) {
        wx.navigateTo({
          // url: '../courselist/courselist'
          url: '/pages/courselist/courselist'
        })
        console.log(wx.getStorageSync('token'));
      },
      fail: function (res) {
        // this.login()
        // wx.redirectTo({
        //   // url: '../courselist/courselist'
        //   url: '/pages/index/index'
        // })
      }
      // complete: function(res) {},
    })
  },
  globalData:{
    userInfo: null,
    ip: 'https://university.tachiba.cn'
    // ip: 'http://192.168.1.204:9090'
  }
})
// var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onReady: function() {
    // wx.request({
    //   url: 'https://edu.tachiba.cn/user/getUser',
    //   data: {
    //     accesstoken: 2,   
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
        
        // if(res.data.level == null){
        //   wx.redirectTo({
        //     url: '../home/home'  
        //   })
        // }else{
        //   wx.redirectTo({
        //     url: '../training/training'  
        //   })
        // }
    //   }
    // })
    setTimeout(function(){
      wx.redirectTo({
        url: '../home/home'  
      })
    },2000);
  }
})
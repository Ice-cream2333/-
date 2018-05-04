// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    curindex: 0,
    show: false,
    now: new Date().getDate(),
    dateList: [{
      className: 'date',
      week: '周一',
      date: '23'
    },{
      className: 'date',
      week: '周二',
      date: '24'
    },{
      className: 'date',
      week: '周三',
      date: '25'
    },{
      className: 'date',
      week: '周四',
      date: '26'
    },{
      className: 'date',
      week: '周五',
      date: '27'
    },{
      className: 'date',
      week: '周六',
      date: '28'
    },{
      className: 'date',
      week: '周日',
      date: '29'
    }]
  },
  select: function() {
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })

    if(this.data.show==false){
      this.animation = animation

      animation.right('40rpx').step()

      this.setData({
        animationData: animation.export()
      })

      setTimeout(function () {
        this.setData({
          show: true
        })
      }.bind(this), 500)
    }else {
      this.setData({
        show: false
      })

      this.animation = animation

      animation.right('-100rpx').step()

      this.setData({
        animationData: animation.export()
      })
    }
  },
  setcurindex: function (e) {
    var index = e.detail.current;
    for (var i = 0; i < this.data.dateList.length; i++) {
      if (i !== index)
        this.data.dateList[i].className = 'date';
      else
        this.data.dateList[index].className = 'date date-active';
    }
    this.setData({
      dateList: this.data.dateList,
      curindex: index
    })
  },
  setActive: function (e) {
    var index = e.currentTarget.dataset.id;
    // var el = document.getElementById(index);
    for (var i = 0; i < this.data.dateList.length; i++ ) {
      if(i !== index)
        this.data.dateList[i].className = 'date';
      else
        this.data.dateList[index].className = 'date date-active';
    }
    this.setData({
      dateList: this.data.dateList,
      curindex: index
    })
  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
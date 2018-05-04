// var app = getApp()
Page({
  data:{
    grades: [
      {name: '0', value: '1年级', checked: false, level: 1},
      {name: '1', value: '2年级', checked: false, level: 3},
      {name: '2', value: '3年级', checked: true, level: 5},
      {name: '3', value: '4年级', checked: false, level: 7},
      {name: '4', value: '5年级', checked: false, level: 9},
      {name: '5', value: '6年级', checked: false, level: 11},
    ],
    index: 5
  },
  check: function(event){
    var index = event.currentTarget.id;
    console.log(index);
    for (var i = 0 ; i < 6 ; i++){
      if(i == index){
        this.data.grades[index].checked = true;
        this.setData({
          index: this.data.grades[index].level,
          grades: this.data.grades
        })
      }else{
        this.data.grades[i].checked = false;        
        this.setData({
          grades: this.data.grades
        })
      }
    }    
  },
  enter: function(){
    wx.navigateTo({
      url: '../training/training'
    })
    var level = this.data.index;
    wx.request({
      url: 'https://edu.tachiba.cn/user/setUserLevel',
      data: {
        accesstoken: 2,
        level: level,        
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})
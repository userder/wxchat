// pages/bank/bank.js
var bankJson = {
  houseBank:'',
  carBank:'',
  card:''
},bankText = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH:0,scrollW:0,
    array: ['美国', '中国', '巴西', '日本'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    if (options.houseBank=='1'){
      bankJson.houseBank = bankText;
    }
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollH: res.windowHeight,
          scrollW: res.windowWidth
        })
      },
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bankSelect:function(e){
    var text = e.currentTarget.dataset.id;
    console.log(text);

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
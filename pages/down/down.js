Page({

  /**
   * 页面的初始数据
   */
  data: {
    downTxt: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model)
        var arr = res.model;
        var list = arr.substring(0,2);
        console.log(list)
        if(list=='iP'){
          that.setData({
            downTxt: 'https://itunes.apple.com/cn/app/%E8%BD%A6%E6%8A%A4%E5%AE%9D/id1286955476?mt=8'
          })
        }else{
          that.setData({
            downTxt: 'https://www.pgyer.com/nIOc'
          })
        }
      },
    })
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
    
  },
  copy:function(){
    var that = this;
    wx.setClipboardData({
      data: that.data.downTxt,
      success:function(res){
        wx.getClipboardData({
          success:function(res){
            console.log(res.data)
            wx.showModal({
              title: '成功复制链接',
              confirmText: '去下载',
              confirmColor: '#4182FF',
              cancelText: '稍后',
              content: '请到浏览器粘贴打开链接下载车护宝APP',
              success: function (res) {
                
                if (res.confirm) {
                  wx.navigateBack({})
                } else if (res.cancel) {
                  
                }
              }
            })
          }
        })
      }
    })
  }
})
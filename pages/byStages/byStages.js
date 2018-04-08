// pages/byStages/byStages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabChange: false,
    tabList: [], tabText:'首付一成',
    list:[],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var stages = JSON.parse(options.stages);
    var tablist = [];
    for(var i=0;i<stages.length;++i){
      tablist.push(stages[i].downPaymentName)
    }
    that.setData({
      tabList: tablist,
      list: stages
    })
  },
  tabChange:function(e){
    var that = this;
    that.setData({
      tabChange: false
    })
    setTimeout(function(){
      that.setData({
        tabText: e.currentTarget.dataset.id,
        tabChange: true,
        index: e.currentTarget.id,
      })
    },100)
  }
})
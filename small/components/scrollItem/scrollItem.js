Component({
  behaviors: [],
  properties: {
    itemList: { // 属性名
      type: Array, 
      value: [], //
      observer: function(newVal, oldVal){}
    },
    scrollY: {
      type:Boolean,
      value:false
    },
    defaultSelected:{
      type:Number,
      value:0,
    }
  },
  data: {
    currentSelectedNo:0,
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function(){},
  moved: function(){},
  detached: function(){},
  ready:function(){
     this.setData({
       currentSelectedNo:this.properties.defaultSelected
     });
  },
  methods: {
    _selectedThisItem:function(event){
      this.setData({
        currentSelectedNo:event.currentTarget.dataset.selectedNo
      });
    }
  }

})
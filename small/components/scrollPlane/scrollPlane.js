Component({
  behaviors: [],
  properties: {
     planeList: { // 属性名
      type: Array, 
      value: [], //
      observer: function(newVal, oldVal){}
    },
    defaultSelected:{
      type:Number,
      value:0,
    },
    showItem:{
      type:Boolean,
      value:true
    },
    containerStyle:{
      type:String,
      value:''
    },
  },
  data: {
    currentSelectedNo:0,
    scrollLeftInViewId:"green",
    scrollRightInViewId:"green",
    idList:[],
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function(){},
  moved: function(){},
  detached: function(){},
  ready:function(){
    let idList = [];
    this.properties.planeList.forEach(ob=>{
       for(var i = 0;i<ob.weight;i++){
         idList.push(ob.id);
       }
    });
    this.setData({
       idList:idList
    })
  },
  methods: {
    _selectedThisItem:function(event){
      this.setData({
        scrollRightInViewId:event.currentTarget.dataset.selectedId
       });
     },
    _changePlane:function(event){
       //console.log(this.data.idList)
       let currentHeight = event.detail.scrollTop;
       let currentIndex = parseInt((currentHeight+event.detail.scrollHeight/(this.data.idList.length*2))/event.detail.scrollHeight*this.data.idList.length);
       //console.log(currentIndex)
       this.setData({
           scrollLeftInViewId:this.data.idList[currentIndex]
        });
    }
  }


})
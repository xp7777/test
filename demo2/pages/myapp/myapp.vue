<template>
  <view>
    <view>
      <van-table :columns="columns" :data="tableData" 
        border
        :row-style="{background:'aquamarine'}"
        stripe
        class="elTable"
      >
        <van-table-column title="时间" align="center">
          <template v-slot="{ item }">{{ item.时间 }}</template>
        </van-table-column>
        <van-table-column title="药箱液位" align="center" >
          <template v-slot="{ item }">{{ item.药箱液位 }}</template>
        </van-table-column>
      </van-table>
      <van-button type="primary" plain @click="click" style="background-color:black;">实时曲线</van-button>
    </view>
  </view>
</template>


<script>
//import { dataList as getYeWeiList } from "../api/baseApi.js";
// import * as echarts from "echarts";
import { VanTable, VanTableColumn, VanButton } from 'vant';

export default {
	 components: {
	    VanTable,
	    VanTableColumn,
	    VanButton
	  },
  name: 'HelloWorld',
  data () {
    return {
		columns: [
		        { title: '时间', key: '时间' },
		        { title: '药箱液位', key: '药箱液位' }
		      ],
      //imgSrc:require('../image/test2.jpg'),
      tableData: [],
      myChart: {},
      xData: [], //横坐标数据
      yData: [], //纵坐标数据，与横坐标对应
      myChartStyle: { float: "left", width: "100%", height: "400px",background:"burlywood" }, //图表样式
    }
  },
  mounted(){
   
    
  
  },
  methods:{
    async init() {
      //获取液位列表
	await uni.request({
	  	url:'http://192.168.1.29:9082/sql/get',
		method:"GET",
		success:res =>{
			this.tableData= res.data.data;
			this.test01();
			//this.initEcharts();
		}
	  })
      //  await getYeWeiList().then( res =>{
      //    this.tableData= res.data.data;
      // })
    },
    test01(){
      for (let i = 0; i < this.tableData.length; i++) {
        this.xData[i] = this.tableData[i].时间;
        this.yData[i] = this.tableData[i].药箱液位;
      }

    },
  //   initEcharts() {
  //     const option = {
  //       xAxis: {
  //         boundaryGap: false,// 刻度离纵轴有无间隙，默认true有间距
  //         type: 'category', //'value' 数值轴，适用于连续数据。 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。 'log' 对数轴。适用于对数数据。
  //         name: '(时间)',// 横轴名称

  //         data: this.xData,
  //         splitLine: {show: false},// 显示隐藏刻度线
  //         axisLabel : {//坐标轴刻度标签的相关设置。
  //         // clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
  //         interval: 0,
  //         rotate: 20,// 文字倾斜度
  //   },
  //       },
  //       yAxis: {
  //         axisLine: {show:true},
  //         axisTick: {show:true},
  //         boundaryGap: false,// 刻度离纵轴有无间隙，默认true有间距
  //         name: '(药箱液位/m)',// 纵轴名称
  //         type: 'value',
         
  //         splitLine: {show: false},// 显示隐藏刻度线
  //         axisLabel : {//坐标轴刻度标签的相关设置。
  //         // clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
  //         interval: 0,
          
  //   },
  
  //       },
  //       series: [
  //           {
  //               data: this.yData,
  //               type: "line",
  //               //坐标显示数值
  //               label : {show: true}
  //           },
            
  //       ]
  //   };
  //     this.myChart = echarts.init(document.getElementById("mychart"));
  //     this.myChart.setOption(option);
  //     //随着屏幕大小调节图表
  //     window.addEventListener("resize", () => {
  //       this.myChart.resize();
  //     });
  //   },
    click(){
      //this.$router.push('/ssqx')
        
        window.open('#/pages/myapp/Ssqx')
		// 跳转到pages/myapp/Ssqx页面
		// uni.navigateTo({
		// url: 'pages/myapp/Ssqx'
  //   });
    }
  },
   created: async function(){
    await this.init();
    //this.initEcharts();
    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
/* @import "../../node_modules/vant-weapp/dist/common/index.wxss"; //引入vant的样式文件
 */

.elTable{
  //border: 1px solid black;
   margin-top: 10px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-button { 
	display: flex; align-items: center; 
} 
</style>

<template>
  <div class="px-2" id="components-grid-demo-playground">
    
    <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top"> Horizontal </a-radio-button>
      <a-radio-button value="left"> Vertical </a-radio-button>
    </a-radio-group>
    <a-tabs
      default-active-key="0"
      :tab-position="mode"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="(v,k) in product" :key="k" :tab="v.productType">
        <div class="sc-y sc-x-h">
          <a-row :gutter="[gutters[gutterKey], vgutters[vgutterKey]]">
            <a-col
              v-for="(item,index) in v.product"
              :key="index"
              :span="24 / colCounts[colCountKey]"
            >
              <a-card
                @click="addOrder(index)"
                class="m-md-2 pointer"
                size="small"
                :key="index"
                :title="item.title"
              >
              {{ item.price[0].price}}
              </a-card>
            </a-col>
          </a-row>          
        </div>
      </a-tab-pane>
    </a-tabs>
    <div style="margin-bottom: 16px">
      <span style="margin-right: 6px">Horizontal Gutter (px): </span>
      <div style="width: 50%">
        <a-slider
          v-model="gutterKey"
          :min="0"
          :max="Object.keys(gutters).length - 1"
          :marks="gutters"
          :step="null"
        />
      </div>
      <span style="margin-right: 6px">Vertical Gutter (px): </span>
      <div style="width: 50%">
        <a-slider
          v-model="vgutterKey"
          :min="0"
          :max="Object.keys(vgutters).length - 1"
          :marks="vgutters"
          :step="null"
        />
      </div>
      <span style="margin-right: 6px">Column Count:</span>
      <div style="width: 50%">
        <a-slider
          v-model="colCountKey"
          :min="0"
          :max="Object.keys(colCounts).length - 1"
          :marks="colCounts"
          :step="null"
        />
      </div>
    </div>
    <pre v-text="rowColHtml" />
  </div>
</template>
<script>
export default {
  name: 'OrderAdd',
  async beforeCreate() {
    const response = await this.$store.dispatch('chachang/fetchProduct')
    if (response) {
      this.product = this.$store.getters['chachang/getProductListToOrder']
    }
  },
  data() {
    const gutters = {}
    const colCounts = {}
    const vgutters = {}
    ;[8, 16, 24, 32, 40, 48].forEach((value, i) => {
      gutters[i] = value
    })
    ;[8, 16, 24, 32, 40, 48].forEach((value, i) => {
      vgutters[i] = value
    })
    ;[2, 3, 4, 6, 8, 12].forEach((value, i) => {
      colCounts[i] = value
    })
    return {
      mode: 'top',
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
      colCounts,
      gutters,
      vgutters,
      fakeData:20,
      product:[],
    }
  },
  methods: {
    callback(val) {
      console.log(val)
    },
    addOrder(id, index) {
      console.log(id)
    },
  },
  computed: {
    rowColHtml() {
      const colCount = this.colCounts[this.colCountKey]
      const getter = [
        this.gutters[this.gutterKey],
        this.vgutters[this.vgutterKey],
      ]
      let colCode = '<a-row :gutter="[' + getter + ']">\n'  
      for (let i = 0; i < colCount; i++) {
        const spanNum = 24 / colCount
        colCode += '  <a-col :span="' + spanNum + '"/>\n'
      }
      colCode += '</a-row>'
      
      console.log(colCount)
      console.log(getter)
      console.log(colCode)
      return colCode
    },
  },
}
</script>

<style scoped>
#components-grid-demo-playground [class~='ant-col'] {
  background: transparent;
  border: 0;
}
/* #components-grid-demo-playground [class~='ant-col'] > div {
  background: #00a0e9;
  height: 120px;
  line-height: 120px;
  font-size: 13px;
}
#components-grid-demo-playground pre {
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 16px;
} */
/* overflow-y: scroll; */
.sc-y {
  overflow: auto;
  height: 300px;
}
.sc-x-h {
  overflow-x: hidden;
}
</style>

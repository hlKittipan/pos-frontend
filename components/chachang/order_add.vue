<template>
  <div style="width: 500px">
    <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">
        Horizontal
      </a-radio-button>
      <a-radio-button value="left">
        Vertical
      </a-radio-button>
    </a-radio-group>
    <a-tabs
      default-active-key="1"
      :tab-position="mode"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">
        <a-card @click="addOrder(a)" class="m-md-2 pointer" size="small" v-for="a in i" :key="a" :title="`Small size card ${a}`" style="width: 300px">
          <a slot="extra" href="#">more</a>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  name: 'OrderAdd',
  data() {
    return {
      mode: 'top',
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    },
    addOrder(id){
      console.log(id)
    },
  },
};
</script>

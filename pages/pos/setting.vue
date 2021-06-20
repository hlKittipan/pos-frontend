<template>
  <div>
    <a-row type="flex" justify="center">      
      <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
        <EndPointSetting />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import EndPointSetting from '@/components/endpoint/setting'

export default {
  layout: 'pos',
  name: 'Setting',
  components: {
    EndPointSetting,
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
}
</script>

<style scoped>
</style>

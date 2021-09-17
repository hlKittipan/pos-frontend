<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <PosAddOnList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <PosAddAddOn />
    </a-col>
  </a-row>
</template>

<script>
import PosAddOnList from '@/components/pos/products/add_on_list'
import PosAddAddOn from '@/components/pos/products/add_on_add'

export default {
  layout: 'pos',
  name: 'AddOn',
  components: {
    PosAddOnList,
    PosAddAddOn,
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
    };
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    await store.dispatch('pos/fetchLanguage')
    await store.dispatch('pos/fetchAddOnType')
    await store.dispatch('pos/fetchAddOn')
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

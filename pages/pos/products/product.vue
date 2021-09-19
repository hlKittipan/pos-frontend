<template>
  <div>
    <a-row type="flex" justify="center" class="py-2">
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <a-button type="primary" @click="showModal">
          Add menu
        </a-button>
        <a-modal
          :visible="visible"
          :dialog-style="{ top: '5%' }"
          :confirm-loading="confirmLoading"
          @cancel="handleCancel"
        >
          <template slot="footer">
            <a-button key="close" @click="handleCancel">
              Close
            </a-button>
          </template>
          <PosAddProduct />
        </a-modal>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <PosProductList />
      </a-col>
      <!-- <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
        <PosAddProduct />
      </a-col> -->
    </a-row>
  </div>
</template>

<script>
import PosProductList from '@/components/pos/products/product_list'
import PosAddProduct from '@/components/pos/products/product_add'

export default {
  layout: 'pos',
  name: 'Product',
  components: {
    PosProductList,
    PosAddProduct,
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
    };
  },  
  async asyncData(context) {
    const { app } = context
    await app.store.dispatch('pos/fetchProductType')
    await app.store.dispatch('pos/fetchProduct')
    await app.store.dispatch('pos/fetchPriceType')
    await app.store.dispatch('pos/fetchPriceTemplate')
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

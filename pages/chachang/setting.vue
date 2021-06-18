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
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <ChachangAddProduct />
        </a-modal>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :xs="{ span: 24 }" :lg="{ span: 16 }">
        <ChachangProductList />
      </a-col>
      <a-col :xs="{ span: 24 }" :lg="{ span: 8 }">
        <ChachangAddProduct />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChachangProductList from '@/components/chachang/product_list'
import ChachangAddProduct from '@/components/chachang/product_add'

export default {
  layout: 'chachang',
  name: 'Product',
  components: {
    ChachangProductList,
    ChachangAddProduct,
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

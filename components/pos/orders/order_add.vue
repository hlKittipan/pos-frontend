<template>
  <div>
    <template v-if="groupProduct">
      <div class="p-2 text-right">
        List
        <a-switch
          v-decorator="['switch', { valuePropName: 'checked' }]"
          @change="handleTableChange"
        />
        Group
      </div>
      <a-row>
        <a-col :span="24">
          <div class="table-responsive">
            <table class="table table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th class="p-2">Product</th>
                  <th class="p-2">Price type</th>
                  <th class="p-2">Price</th>
                  <th class="p-2">Qty</th>
                  <th class="p-2">Discount</th>
                  <th class="p-2">Total</th>
                </tr>
              </thead>
              <template v-if="isGroupProduct">
                <tbody>
                  <template v-for="item in groupProduct">
                    <tr v-for="(v, k) in item.prices" :key="k">
                      <td class="p-2" v-if="k == 0" :rowspan="item.rowspan">
                        {{ item.product_name }}
                      </td>
                      <td class="p-2">{{ v.price_name }}</td>
                      <td class="p-2">{{ v.price }}</td>
                      <td class="p-2">{{ v.qty }}</td>
                      <td class="p-2">{{ v.discount }}</td>
                      <td class="p-2">{{ v.total }}</td>
                    </tr>
                  </template>
                </tbody>
              </template>
              <template v-else>
                <tbody>
                  <tr v-for="(v, k) in orderList" :key="k">
                    <td class="p-2">
                      {{ v.product_name }}
                    </td>
                    <td class="p-2">{{ v.price_name }}</td>
                    <td class="p-2">{{ v.price }}</td>
                    <td class="p-2">{{ v.qty }}</td>
                    <td class="p-2">{{ v.discount }}</td>
                    <td class="p-2">{{ v.total }}</td>
                  </tr>
                </tbody>
              </template>
            </table>
          </div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="end">
        <a-col :span="4"> Total </a-col>
        <a-col :span="4"> {{ summaryOrderList }} </a-col>
      </a-row>
      <div>
        <a-button type="primary" @click="execute()"> Payment </a-button>
      </div>
    </template>
    <a-modal
      :visible="visible"
      :dialog-style="{ top: '5%' }"
      :confirm-loading="confirmLoading"
      width="300px"
      okText="Payment"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <PosFormOrderPayment
        :summaryOrderList="summaryOrderList"
        :cash="cash"
        @newCash="setCash($event)"
        :discount="discount"
        @newDiscount="setDiscount($event)"
      />
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Price type',
    dataIndex: 'price_name',
    key: 'price_name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Discount',
    key: 'discount',
    dataIndex: 'discount',
  },
  {
    title: 'Total',
    key: 'total',
    dataIndex: 'total',
  },
]
import PosFormOrderPayment from '@/components/pos/orders/order_payment'

export default {
  name: 'OrderAdd',
  components: { PosFormOrderPayment },
  data() {
    return {
      columns,
      isGroupProduct: false,
      visible: false,
      confirmLoading: false,
      cash: 0,
      discount: 0,
    }
  },
  props: ['orderList', 'parentMethod', 'groupProduct'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  created() {
    this.$on('cash', this.cash)
    this.$on('discount', this.discount)
  },
  methods: {
    execute() {
      this.parentMethod()
      this.visible = true
    },
    handleTableChange(currency) {
      this.isGroupProduct = !this.isGroupProduct
    },
    handleOk(e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      this.visible = false
    },
    setCash(value) {
      this.cash = value
    },
    setDiscount(value) {
      this.discount = value
    },
  },
  computed: {
    summaryOrderList() {
      let total = 0
      for (let i in this.orderList) {
        total += parseFloat(this.orderList[i].total)
      }
      return total
    },
  },
}
</script>

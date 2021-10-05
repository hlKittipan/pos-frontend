<template>
  <div>
    <div class="p-2 text-right">
      List
      <a-switch
        v-decorator="['switch', { valuePropName: 'checked' }]"
        @change="handleTableChange"
      />
      Group
    </div>
    <a-row v-if="isGroupProduct">
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
          </table>
        </div>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="orderList"
      size="small"
      :pagination="pagination"
      bordered
      v-else
    >
      <template slot="footer">
        <span></span>
      </template>
    </a-table>

    <div>
      <a-button type="primary" @click="execute()"> Primary </a-button>
    </div>
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

export default {
  name: 'OrderAdd',
  data() {
    return {
      columns,
      pagination: {
        pageSize: 15,
        showSizeChange: 'onShowSizeChange',
        size: 'small',
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
        showSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        showQuickJumper: true,
      },
      isGroupProduct: false,
    }
  },
  props: ['orderList', 'parentMethod', 'groupProduct'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  methods: {
    execute() {
      this.parentMethod()
    },
    handleTableChange(currency) {
      this.isGroupProduct = !this.isGroupProduct
    },
  },
}
</script>

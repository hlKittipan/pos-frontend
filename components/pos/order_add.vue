<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-table :columns="columns" :data-source="data" size="small">
      <template slot="qty" slot-scope="text, record, index">
        <a-input
          v-decorator="[`qty[${index}]`]"
          type="number"
          size="small"
          :min="1"
          style="margin: -5px 0"
          :value="text"
        />
      </template>
      <template slot="footer">
        <span></span>
      </template>
    </a-table>
  </a-form>
</template>
<script>
const columns = [
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    className: 'text-right',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    key: 'qty',
    className: 'text-center',
    scopedSlots: { customRender: 'qty' },
  },
  {
    title: 'Tax',
    dataIndex: 'tax',
    key: 'tax',
    className: 'text-right',
  },
  {
    title: 'Discount',
    key: 'discount',
    dataIndex: 'discount',
    className: 'text-right',
  },
  {
    title: 'Total',
    key: 'total',
    dataIndex: 'total',
    className: 'text-right',
  },
]

const data = [
  {
    key: '1',
    item: 'John Brown',
    price: 20,
    qty: 1,
    tax: 0,
    discount: 0,
    total: 20,
  },
  {
    key: '2',
    item: 'Jim Green',
    price: 20,
    qty: 3,
    tax: 10,
    discount: 0,
    total: 70,
  },
  {
    key: '3',
    item: 'Joe Black',
    price: 20,
    qty: 1,
    tax: 0,
    discount: 5,
    total: 15,
  },
]

export default {
  name: 'OrderList',
  data() {
    return {
      data,
      columns,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
      })
    },
  },
}
</script>

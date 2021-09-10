<template>
  <div>
    <a-table :columns="columns" :data-source="orderList" size="small">
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


export default {
  name: 'OrderAdd',
  data() {
    return {
      columns,
    }
  },
  props: ['orderList','parentMethod'],
  methods: {
    execute() {
        this.parentMethod()
    },
  },
}
</script>

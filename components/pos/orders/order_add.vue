<template>
  <div>
    <a-table :columns="columns" :data-source="orderList" size="small" :pagination="pagination" bordered>
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
    // customRender: (value, row, index) => {
    //   console.log('value :' + value)
    //   console.log(row)
    //   console.log('index :' + index)
    //   const obj = {
    //     children: value,
    //     attrs: {},
    //   };
    //   if (index > 0) {
    //     obj.attrs.rowSpan = index+1;
    //   }
        
    //   return obj;
    // },
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

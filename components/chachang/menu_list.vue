<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in ['name', 'name_th', 'price']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col, index)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key, index)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key, index)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Name TH',
    dataIndex: 'name_th',
    width: '25%',
    scopedSlots: { customRender: 'name_th' },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: '15%',
    scopedSlots: { customRender: 'price' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  name: 'MenuList',
  computed: {
    menuList() {
      // eslint-disable-next-line no-console
      return this.$store.getters['chachang/getMenuList']
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.dispatch('chachang/fetchMenu')    
  },
  watch: {
    menuList: function() {
      this.data = this.$store.getters['chachang/getMenuList'];
      this.cacheData = this.data
    }
  },
  data() {
    return {
      data : [],
      columns,
      cacheData: [],
      editingKey: '',
    };
  },
  methods: {
    // async fetchData () {
    //   this.data = await this.$store.dispatch('chachang/fetchMenu')    
    // },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

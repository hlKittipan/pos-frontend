<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      size="small"
      :scroll="{ x: 'calc(700px + 50%)', y: '600px' }"
      :loading="loadings"
      :pagination="pagination"
    >
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="name" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <a-input
            v-else-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="
              (e) => handleChange(e.target.value, record.key, 'name', index)
            "
          />
        <template v-else>
          {{ text }}
        </template>
      </template>     
      <template slot="type_name" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
         <a-select
            v-if="record.editable"
            style="margin: -5px 0;width: 100%"
            :default-value="record.type_name"
            @change="(e) => handleChange(e, record.key, 'type', index)"
            v-decorator="[`type_name`]"
          >
            <a-select-option
              v-for="(value, productIndex) in productType"
              :key="productIndex"
              :value="value.id"
              >{{ value.name }}</a-select-option
            >
          </a-select>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template
        v-for="col in priceType"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="
              (e) => handleChange(e.target.value, record.key, col, index)
            "
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <div class="editable-row-action">
          <span>
            <a
              @click="() => view(record.key, index)"
              ><a-icon type="eye" /></a
            >
          </span>
          <a-divider type="vertical" />
          <span v-if="record.editable">
            <a @click="() => save(record.id)"><a-icon type="save" /></a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key, index)"
            >
              <a-divider type="vertical" />
              <a><a-icon type="eye-invisible" /></a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a
              :disabled="editingKey !== ''"
              @click="() => edit(record.key, index)"
              ><a-icon type="edit" /></a
            >
          </span>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:;"><a-icon type="delete" /></a>
          </a-popconfirm>
          
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'ProductList',
  computed: {
    productList() {
      // eslint-disable-next-line no-console
      return this.$store.getters['chachang/getProductList']
    },
  },
  async beforeCreate() {
    const response = await this.$store.dispatch('chachang/fetchProduct')
    if (response) {
      this.data = this.$store.getters['chachang/getProductList']
      this.cacheData = this.data
      this.loadings = false
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: 'Name',
          width: 120,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'name',
          },
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend', 'ascend'],
          onFilter: (value, record) =>
            record.name.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
        },
                {
          title: 'Type',
          width: 100,
          dataIndex: 'type_name',
          key: 'type_name',
          fixed: 'left',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'type_name',
          },
          sorter: (a, b) => a.type_name.length - b.type_name.length,
          sortDirections: ['descend', 'ascend'],
          onFilter: (value, record) =>
            record.type_name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
        },
        {
          title: 'Price',
          children: [],
        },
        {
          title: 'Action',
          width: 100,
          dataIndex: 'action',
          key: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      cacheData: [],
      editingKey: '',
      loadings: true,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      pagination: {
        pageSize: 15,
        showSizeChange: 'onShowSizeChange',
        size: 'small',
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
        showSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        showQuickJumper: true,
      },
      priceType: [],
      productType: [],
    }
  },
  watch:{
    getPriceTypeList: function (value) {
      const tmp = value.map(b => {
        return {
          title: this._.upperFirst(b.name),
          dataIndex: b.name,
          key: b.name,
          sorter: (a, b) => a[b.name] - b[b.name],
          scopedSlots: { customRender: b.name },
        }
      })
      this._.findIndex(this.columns,(o) => {
        if(o.title === 'Price'){
          o.children = tmp
        }
      })
      const cachePriceType = []
      for (const key in value){
        cachePriceType.push(value[key].name)
      }
      this.priceType = cachePriceType
    },
    getProductList: function (value) {
      this.data = value
      this.cacheData = value
    },
    getProductTypeList: function (value) {
      this.productType = value
    },
  },
  computed: {
    getPriceTypeList(){
      return this.$store.getters['chachang/getPriceTypeList']
    },
    getProductList(){
      return this.$store.getters['chachang/getProductList']
    },
    getProductTypeList(){
      return this.$store.getters['chachang/getProductTypeList']
    }
  },
  methods: {
    handleChange(value, key, column, index) {
      console.log(value);
      console.log(key);
      console.log(this.productType);
      console.log(column);
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        if (column === 'type'){
          target['type_name'] = this.productType[index].name
        }
        this.data = newData
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    view(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      console.log(target)
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    async save(id) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => id === item.id)[0]
      const targetCache = newCacheData.filter((item) => id === item.id)[0]
      console.log(target)
      const price = []
      this._.forIn(target,(value, key)=>{
        const index = key.indexOf('_id');
        if(index>-1){
          price.push({_id:value,price:target[key.replace('_id','')]})
        }
      })
      target.price = price
      target.type_name = this.productType[this._.findIndex(this.productType, { 'id': target.type })].name;
      const response = await this.$store.dispatch('chachang/updateProduct',target)
      if (response) {
        this.$notification.open({
          message: 'Updated '+response.statusText,
          description: response.statusText,
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
        if (target && targetCache) {
          delete target.editable
          this.data = newData
          Object.assign(targetCache, target)
          this.cacheData = newCacheData
        }
      }
      this.editingKey = ''
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        )
        delete target.editable
        this.data = newData
      }
    },
    async onDelete(id) {
      const newData = [...this.data]
      const response = await this.$store.dispatch('chachang/deleteProduct',id)
      if (response) {
        this.$notification.open({
          message: 'Deleted '+response.statusText,
          description: response.statusText,
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
        this.data = newData.filter((item) => item._id !== id)
      }
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    }
  },
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>

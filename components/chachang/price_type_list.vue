<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      size="small"
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
      <template slot="id" slot-scope="text">
        {{ text }}
      </template>
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
      <template slot="action" slot-scope="text, record, index">
        <div class="editable-row-action">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key, index)"
            >
              <a-divider type="vertical" />
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a
              :disabled="editingKey !== ''"
              @click="() => edit(record.key, index)"
              >Edit</a
            >
          </span>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'PriceTypeList',
  async beforeCreate() {
    await this.$store.dispatch('chachang/fetchPriceType')
    this.data = this.$store.getters['chachang/getPriceTypeList']
    this.cacheData = this.data
    this.loadings = false
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: 'ID',
          width: 120,
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          width: 120,
          dataIndex: 'name',
          key: 'name',
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
          title: 'Action',
          width: 150,
          dataIndex: 'action',
          key: 'action',
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
    }
  },
  watch:{
    getPriceTypeList: function (value) {
      this.data = value
    },
  },
  computed: {
    getPriceTypeList(){
      return this.$store.getters['chachang/getPriceTypeList']
    }
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
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
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.key)[0]
      const targetCache = newCacheData.filter((item) => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
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
      const response = await this.$store.dispatch('chachang/deletePriceType',id)
      if (response) {
        this.$notification.open({
          message: 'Deleted '+response.statusText,
          description: response.statusText,
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
        this.data = newData.filter((item) => item.id !== id)
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

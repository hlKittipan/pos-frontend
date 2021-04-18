<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    size="small"
    :scroll="{ x: 'calc(700px + 50%)', y: 'calc(600px + 50%)' }"
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
        @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
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
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template slot="name_th" slot-scope="text, record, index, column">
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
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template
      v-for="col in ['iced', 'hot','grab','lineman','foodpanda','weserve']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col, index)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
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
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </div>
    </template>
  </a-table>
</template>
<script>
export default {
  name: 'MenuList',
  computed: {
    menuList() {
      // eslint-disable-next-line no-console
      return this.$store.getters['chachang/getMenuList']
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('chachang/fetchMenu')
    this.data = this.$store.getters['chachang/getMenuList']
    this.cacheData = this.data
    this.loadings = false
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
          title: 'Name TH',
          width: 120,
          dataIndex: 'name_th',
          key: 'name_th',
          fixed: 'left',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'name_th',
          },
          sorter: (a, b) => a.name_th.length - b.name_th.length,
          sortDirections: ['descend', 'ascend'],
          onFilter: (value, record) =>
            record.name_th
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
          children: [
            {
              title: 'Iced',
              dataIndex: 'iced',
              key: 'iced',
              sorter: (a, b) => a.iced - b.iced,
              scopedSlots: { customRender: 'iced' },
            },
            {
              title: 'Hot',
              dataIndex: 'hot',
              key: 'hot',
              sorter: (a, b) => a.hot - b.hot,
              scopedSlots: { customRender: 'hot' },
            },
            {
              title: 'Grab',
              dataIndex: 'grab',
              key: 'grab',
              sorter: (a, b) => a.grab - b.grab,
              scopedSlots: { customRender: 'grab' },
            },
            {
              title: 'Lineman',
              dataIndex: 'lineman',
              key: 'lineman',
              sorter: (a, b) => a.lineman - b.lineman,
              scopedSlots: { customRender: 'lineman' },
            },
            {
              title: 'Foodpanda',
              dataIndex: 'foodpanda',
              key: 'foodpanda',
              sorter: (a, b) => a.foodpanda - b.foodpanda,
              scopedSlots: { customRender: 'foodpanda' },
            },
            {
              title: 'Weserve',
              dataIndex: 'weserve',
              key: 'weserve',
              sorter: (a, b) => a.weserve - b.weserve,
              scopedSlots: { customRender: 'weserve' },
            },
          ],
        },
        {
          title: 'Action',
          width: 150,
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
        showSizeChange:"onShowSizeChange",
        size:"small",
        showSizeChanger: true,
        showTotal: total => `Total ${total} items`,
        showSizeChange: (current, pageSize) => this.pageSize = pageSize,
        showQuickJumper: true,
      }
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
    onDelete(key) {
      const newData = [...this.data]
      this.target = newData.filter((item) => item.key !== key)
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
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

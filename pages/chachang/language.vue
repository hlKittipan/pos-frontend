<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :lg="{ span: 14}">
      <LanguageList />
    </a-col>
    <a-col :xs="{ span: 24 }" :lg="{ span: 10}">
      <LanguageAdd />
    </a-col>
  </a-row>
</template>

<script>
import LanguageList from '@/components/chachang/language_list'
import LanguageAdd from '@/components/chachang/language_add'

export default {
  layout: 'chachang',
  name: 'Language',
  components: {
    LanguageList,
    LanguageAdd,
  },
}
</script>

<style scoped>

</style>

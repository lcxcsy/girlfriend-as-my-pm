import { UnCertainType, PaginationType } from '@/types'
import { reactive, ref } from 'vue-demi'

export const useTable = () => {
  const tableData = ref([] as UnCertainType[])
  const pagination: PaginationType = reactive({
    pageNo: 1,
    pageSize: 100,
    total: 0
  })

  const getTableData = async () => {
    try {
      // const params = getQueryParams()
      // const { data } = await api[funcName](params)
      tableData.value = Array(100).fill({
        name: '陈毛妮',
        date: '2016-05-03',
        address: 'No. 189, Grove St, Los Angeles'
      })
      pagination.pageNo = 1
      pagination.pageSize = 100
      pagination.total = 100
    } catch (e) {
      console.log('getTableData', e)
    }
  }

  const handleSizeChange = (val: number): void => {
    pagination.pageSize = val
    getTableData()
  }

  const handleCurrentChange = (val: number): void => {
    pagination.pageSize = val
    getTableData()
  }

  // TODO 添加表格搜索的相关逻辑

  return {
    tableData,
    pagination,
    getTableData,
    handleSizeChange,
    handleCurrentChange
  }
}

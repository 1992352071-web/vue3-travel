<template>
  <van-cell-group :border="false" class="budget-group">
    <van-cell
      v-for="item in data"
      :key="item.item"
      :title="item.item"
      :value="formatAmount(item.amount)"
    />
    <!-- 总计行：右边金额红色加粗 -->
    <van-cell
      :title="total?.item || '总计'"
      :value="formatAmount(total?.amount)"
      value-class="total-value"
    />
  </van-cell-group>
</template>

<script setup>
//  props 约定：
//  data   -> [{ item: '住宿', amount: 1500 }, ...]  各分类明细
//  total  -> { item: '总计', amount: 5000 }          总计项
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Object,
    default: () => ({ item: '总计', amount: 0 }),
  },
})

// 统一金额格式化：¥ + 千分位
function formatAmount(amount) {
  if (amount === undefined || amount === null) return '¥0'
  return '¥' + Number(amount).toLocaleString()
}
</script>

<style scoped>
.budget-group {
  border-radius: 8px;
  overflow: hidden;
}

/* 总计行（最后一个 van-cell）：顶部分隔线 + 浅灰背景 */
:deep(.van-cell:last-child) {
  border-top: 1px solid #ebedf0;
  background-color: #f7f8fa;
}

/* 总计行左侧文字加粗 */
:deep(.van-cell:last-child .van-cell__title) {
  font-weight: 700;
  color: #323233;
}

/* 总计行右侧金额：红色加粗 */
:deep(.total-value) {
  color: #ee0a24;
  font-weight: 700;
  font-size: 15px;
}

/* 明细行左侧 */
:deep(.van-cell:not(:last-child) .van-cell__title) {
  color: #323233;
  font-size: 14px;
}

/* 明细行右侧 */
:deep(.van-cell:not(:last-child) .van-cell__value) {
  color: #323233;
  font-size: 14px;
}
</style>

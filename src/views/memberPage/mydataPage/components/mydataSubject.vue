<template>
     <div class="content">
            <el-descriptions
    class="margin-top"
    title="个人信息"
    :column = 1
    :border="true"
  >
    <template #extra>
      <el-button type="primary">编辑</el-button>
    </template>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><user /></el-icon>用户名
            </div>
        </template>
        小米露
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><iphone /></el-icon>手机号码
            </div>
        </template>
        18100000000
    </el-descriptions-item>
    <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon><location /></el-icon>位置
            </div>
        </template>
        Suzhou
    </el-descriptions-item>
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon>
                <office-building />
            </el-icon>
            Address
            </div>
        </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
    </el-descriptions>
    </div>
</template>
<template>
  <el-config-provider>
    <div class="app-header"></div>
    <div class="app-content">
      <h2 class="app-content-title"> AI Provider </h2>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="ChatGPT Webapp" :name="ProviderType.ChatGPT">
          <div>The API that powers ChatGPT webapp, free, but sometimes unstable</div>
        </el-tab-pane>
        <el-tab-pane label="OpenAI API" :name="ProviderType.GPT3">
          <div class="margin-t-10"> OpenAI官方API，更稳定，按使用量收费 </div>
          <div class="margin-t-10 flex-bet">
            <el-select v-model="gptConfig.model" placeholder="Select" style="width: 400px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="gptConfig.apiKey" placeholder="API KEY" class="margin-l-20">
              <template #prepend>API KEY</template>
            </el-input>
          </div>
          <div class="margin-t-10">
            您可以找到或创建您的 API 密钥
            <el-link
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
              rel="noreferrer"
            >
              这里
            </el-link>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="margin-t-10">
        <el-button type="primary" plain @click="save">保存</el-button>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  import { ProviderType, GPT3ProviderConfig } from '../../types/config';
  import { saveProviderConfigs } from '../../utils/config';
  type OptionsType = {
    label: string;
    value: string;
  };
  const activeName = ref<ProviderType>(ProviderType.GPT3);
  const gptConfig = reactive<GPT3ProviderConfig>({
    model: 'text-davinci-003',
    apiKey: '',
  });
  const options = ref<OptionsType[]>([
    {
      value: 'text-davinci-003',
      label: 'text-davinci-003',
    },
  ]);
  const handleClick = (e) => {
    console.log(e);
  };
  const save = async () => {
    await saveProviderConfigs(activeName.value, {
      [ProviderType.GPT3]: {
        model: gptConfig.model,
        apiKey: gptConfig.apiKey,
      },
    });
    ElNotification({
      title: '成功',
      message: '修改保存',
      type: 'success',
    });
  };
</script>

<style scoped lang="scss">
  .app-header {
    width: 100vw;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ececf1;
    display: flex;
    height: 60px;
    justify-content: space-between;
  }
  .app-content {
    margin: 0 auto;
    width: 500px;
    &-title {
      font-size: 32px;
      color: #202123;
      font-weight: 700;
    }
    &-select {
      margin-top: 10px;
    }
  }
</style>

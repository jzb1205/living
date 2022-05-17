
<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" size="small" @click="visible = true">新增大类</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered size="small">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a @click="getDetail(record.id)" style="margin-right:5px">编辑</a>
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
        <a @click="toSmallType(record.id)" style="margin-left:5px">查看明细</a>
      </template>
    </template>
  </a-table>
  <div v-if="visible">
    <a-modal v-model:visible="visible" :title="optionType === 'add' ? '新增大类' : optionType === 'edit' ? '编辑大类' : '查看大类'"
      @ok="handleOk">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" @validate="handleValidate" @finish="edit">
        <a-form-item has-feedback label="大类名称" name="bigTypeName">
          <a-input v-model:value="formState.bigTypeName" autocomplete="off" />
        </a-form-item>
        <a-form-item label="描述" name="detail">
          <a-input v-model:value="formState.detail" autocomplete="off" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">{{ optionType === 'add' ? '新增' : '修改' }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, unref, onMounted, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { FormInstance, message } from 'ant-design-vue';
import axios from "../axios/index"
import { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const formRef = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
  bigTypeName: [{ required: true, message: "请输入大类名称", trigger: 'change' }],
};
interface FormState {
  id: string | number,
  bigTypeName: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  creator: string;
}
let formState = ref<FormState>({
  bigTypeName: '',
  id: '',
  detail: '',
  createdAt: '',
  updatedAt: '',
  creator: '',
});

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '大类',
    dataIndex: 'bigTypeName',
  },
  {
    title: '描述',
    dataIndex: 'detail',
  },
  // {
  //   title: 'creator',
  //   dataIndex: 'creator',
  //   width: '40%',
  // },
  {
    title: '操作',
    dataIndex: 'operation',
  }
];
interface DataItem {
  id: number;
  bigTypeName: string;
  detail: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}
const dataSource = ref<DataItem[]>([]);

const visible = ref(false)

watch(() => visible.value, (newVal) => {
  if (!newVal) {
    optionType.value = 'add'
    formState.value.id = ''
    formState.value.creator = ''
    formState.value.createdAt = ''
    formState.value.updatedAt = ''
    formRef.value.resetFields();
  }
})

const handleOk = () => {

}
const optionType = ref('add')

const handleValidate = (...args) => {
  if (!args[1]) {
    message.warning({
      content: '请完善表单信息'
    })
  }
};

const getList = () => {
  axios(
    {
      url: "/api/getBigTypeList",
      method: "post",
      data: {
        bigTypeName: formState.value.bigTypeName
      }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      dataSource.value = res.data.data
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const getDetail = (id: string) => {
  optionType.value = 'edit'
  visible.value = true
  axios(
    {
      url: "/api/getBigTypeDetailById",
      method: "post",
      data: { id }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      formState.value = res.data.data
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const edit = () => {
  let url = optionType.value === 'add' ? "/api/addBigType" : "/api/updateBigTypeById"
  axios(
    {
      url,
      method: "post",
      data: unref(formState.value)
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      message.success({
        content: `${optionType.value === 'add' ? '新增' : '修改'}成功`
      })
      getList()
      visible.value = false
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const onDelete = (id: string) => {
  axios(
    {
      url: "/api/deleteBigTypeById",
      method: "post",
      data: { id }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      message.success({
        content: res.data.msg
      })
      getList()
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
};

//bigType -> smallType
const toSmallType = (id: string) => {
  router.push({
    path: '/smallType', query: {
      bigTypeId: id
    }
  })
}

onMounted(() => {
  getList()
})
</script>


<style scoped lang="less">
</style>

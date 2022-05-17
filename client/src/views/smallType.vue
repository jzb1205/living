
<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" size="small" @click="visible = true">新增小类</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered size="small">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a @click="getDetail(record.id)" style="margin-right:5px">编辑</a>
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <div v-if="visible">
    <a-modal v-model:visible="visible" :title="optionType === 'add' ? '新增小类' : optionType === 'edit' ? '编辑小类' : '查看小类'"
      @ok="handleOk">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" @validate="handleValidate" @finish="edit">
        <a-form-item has-feedback label="小类名称" name="smallTypeName">
          <a-input v-model:value="formState.smallTypeName" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="所属大类" name="belongBigType">
          <a-select ref="select" v-model:value="formState.belongBigType">
            <a-select-option v-for="it in BigTypeList" :value="it.id">{{ it.bigTypeName }}</a-select-option>
          </a-select>
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
import { ref, reactive, unref, onMounted, watch, computed } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { FormInstance, message } from 'ant-design-vue';
import axios from "../axios/index"
import { AxiosResponse } from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()
const formRef = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
  smallTypeName: [{ required: true, message: "请输入小类名称", trigger: 'change' }],
};
interface FormState {
  id: string | number,
  smallTypeName: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  belongBigType: string | number;
  creator: string;
}
let formState = ref<FormState>({
  smallTypeName: '',
  id: '',
  detail: '',
  createdAt: '',
  updatedAt: '',
  belongBigType: '',
  creator: '123',
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
    title: '小类',
    dataIndex: 'smallTypeName',
  },
  {
    title: '归属',
    dataIndex: 'belongBigTypeName',
  },
  {
    title: '描述',
    dataIndex: 'detail',
  },
  // {
  //   title: '创建日期',
  //   dataIndex: 'createdAt',
  // },
  // {
  //   title: 'creator',
  //   dataIndex: 'creator',
  // },
  {
    title: '操作',
    dataIndex: 'operation',
  }
];
interface DataItem {
  id: number;
  smallTypeName: string;
  detail: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  belongBigType: string | number;
  belongBigTypeName: string
}
const dataSource = ref<DataItem[]>([])

const visible = ref(false)

watch(() => visible.value, (newVal) => {
  if (!newVal) {
    optionType.value = 'add'
    formState.value.id = ''
    formState.value.creator = ''
    formState.value.createdAt = ''
    formState.value.updatedAt = ''
    formState.belongBigType = ''
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

const BigTypeList = ref([])
const getBigTypeList = async () => {
  await axios(
    {
      url: "/api/getBigTypeList",
      method: "post",
      data: {}
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      BigTypeList.value = res.data.data
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const getList = () => {
  axios(
    {
      url: "/api/getSmallTypeList",
      method: "post",
      data: {
        smallTypeName: formState.value.smallTypeName
      }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      dataSource.value = matchBigType(res.data.data)
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const getSmallTypeByBigTypeId = () => {
  axios(
    {
      url: "/api/getSmallTypeByBigTypeId",
      method: "post",
      data: { bigTypeId: route.query.bigTypeId }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      dataSource.value = matchBigType(res.data.data)
    }
  })
}

const matchBigType = (list) => {
  const BigTypeMap = {}
  BigTypeList.value.forEach(it => {
    BigTypeMap[it.id] = it.bigTypeName
  });
  return list.map(it => {
    it.belongBigTypeName = BigTypeMap[it.belongBigType]
    return it
  })
}

const getDetail = (id: string) => {
  optionType.value = 'edit'
  visible.value = true
  axios(
    {
      url: "/api/getSmallTypeDetailById",
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
  let url = optionType.value === 'add' ? "/api/addSmallType" : "/api/updateSmallTypeById"
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
      url: "/api/deleteSmallTypeById",
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



onMounted(async () => {
  await getBigTypeList()
  if (route.query.bigTypeId) {
    getSmallTypeByBigTypeId()
  } else {
    getList()
  }
})
</script>


<style scoped lang="less">
</style>

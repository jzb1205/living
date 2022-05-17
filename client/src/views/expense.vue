<template>
  <a-form ref="expenseForm" :model="queryParams">
    <a-row :gutter="[10, 10]">
      <a-col :span="4">
        <a-form-item label="消费者" name="creator">
          <a-select ref="select" v-model:value="queryParams.creator" allow-clear>
            <a-select-option value="金志兵">金志兵</a-select-option>
            <a-select-option value="陈美艳">陈美艳</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="3">
        <a-form-item label="大类" name="bigTypeId">
          <a-select ref="select" v-model:value="queryParams.bigTypeId" allow-clear @change="getSmallTypeByBigTypeId">
            <a-select-option v-for="it in bigTypeList" :value="it.id">{{ it.bigTypeName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="3">
        <a-form-item label="小类" name="smallTypeId">
          <a-select ref="select" v-model:value="queryParams.smallTypeId" allow-clear>
            <a-select-option v-for="it in smallTypeList" :value="it.id">{{ it.smallTypeName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item label="时间" name="date">
          <a-date-picker v-model:value="queryParams.date[0]" format="YYYY-MM-DD" placeholder="开始时间" />
          至
          <a-date-picker v-model:value="queryParams.date[1]" format="YYYY-MM-DD" placeholder="结束时间" />
        </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item>
          <a-button type="primary" @click="getList">查询</a-button>
          <a-button style="margin-left:8px;" type="danger" @click="reset">重置</a-button>
          <a-button style="margin-left:8px;" @click="visible = true">新增</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <p>共消费：{{ allMoney }}元</p>
  <a-table :columns="columns" :data-source="dataSource" bordered size="small">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'money'">
        <span style="color:red;">{{ record.money }}</span>
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <a @click="getDetail(record.id)" style="margin-right:5px">编辑</a>
      </template>
    </template>
  </a-table>
  <div v-if="visible">
    <a-modal v-model:visible="visible" :maskClosable="false"
      :title="optionType === 'add' ? '新增消费' : optionType === 'edit' ? '编辑消费' : '查看消费'">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" @validate="handleValidate" @finish="edit">
        <a-form-item has-feedback label="支出项目" name="expenseItem">
          <a-input v-model:value="formState.expenseItem" autocomplete="off" allow-clear />
        </a-form-item>
        <a-form-item has-feedback label="消费金额" name="money">
          <a-input v-model:value="formState.money" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="大类" name="bigTypeId">
          <a-select ref="select" v-model:value="formState.bigTypeId" allow-clear @change="typeChange('bigTypeId')">
            <a-select-option v-for="it in bigTypeList" :value="it.id">{{ it.bigTypeName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item has-feedback label="小类" name="smallTypeId">
          <a-select ref="select" v-model:value="formState.smallTypeId" allow-clear @change="typeChange('smallTypeId')">
            <a-select-option v-for="it in smallTypeList" :value="it.id">{{ it.smallTypeName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item has-feedback label="消费者" name="creator">
          <a-select ref="select" v-model:value="formState.creator" :disabled="optionType === 'edit'">
            <a-select-option value="金志兵">金志兵</a-select-option>
            <a-select-option value="陈美艳">陈美艳</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item has-feedback label="消费日期" name="date">
          <a-date-picker v-model:value="formState.date" :disabled="optionType === 'edit'" />
        </a-form-item>
        <a-form-item label=" 描述" name="detail">
          <a-input v-model:value="formState.detail" autocomplete="off" allow-clear />
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
import _ from 'lodash'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const formRef = ref<FormInstance>();
let validateMoney = async (_rule: Rule, value: string) => {
  if (isNaN(+value)) {
    return Promise.reject('请输入数字类型');
  }
  if (+value <= 0) {
    return Promise.reject('消费金额不能小于等于0');
  } else {
    return Promise.resolve();
  }
};
const rules: Record<string, Rule[]> = {
  expenseItem: [{ required: true, message: "请输入支出项目", trigger: 'blur' }],
  money: [
    { required: true, message: "请输入消费金额", trigger: 'blur' },
    { validator: validateMoney, trigger: 'blur' }
  ],
  bigTypeId: [{ required: true, message: "请选择大类", trigger: 'change' }],
  smallTypeId: [{ required: true, message: "请选择小类", trigger: 'change' }],
  creator: [{ required: true, message: "请选择消费者", trigger: 'change' }],
  date: [{ required: true, message: "请选择消费日期", trigger: 'change' }]
};
interface QueryParams {
  money: string | number
  bigTypeId: string | number
  smallTypeId: string | number
  creator: string
  date: any
}
interface FormState {
  id: string | number;
  expenseItem: string;
  bigTypeName: string;
  smallTypeName: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
}
const queryParams = reactive<QueryParams>({
  money: '',
  bigTypeId: '',
  smallTypeId: '',
  creator: '',
  date: []
})

const expenseForm = ref(null)
const reset = () => {
  expenseForm.value.resetFields()
  getList()
}

let formState = ref<FormState & QueryParams>({
  id: '',
  expenseItem: '',
  money: '',
  bigTypeId: '',
  bigTypeName: '',
  smallTypeId: '',
  smallTypeName: '',
  detail: '',
  createdAt: '',
  updatedAt: '',
  creator: '',
  date: ''
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
    title: '支出项目',
    dataIndex: 'expenseItem',
  },
  {
    title: '消费金额',
    dataIndex: 'money',
  },
  {
    title: '大类',
    dataIndex: 'bigTypeName',
  },
  {
    title: '小类',
    dataIndex: 'smallTypeName',
  },
  // {
  //   title: '描述',
  //   dataIndex: 'detail',
  //   maxWidth: 300
  // },
  {
    title: '消费日期',
    dataIndex: 'date',
  },
  {
    title: '消费者',
    dataIndex: 'creator',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  }
];

const dataSource = ref<FormState[]>([]);

const visible = ref(false)

watch(() => visible.value, (newVal) => {
  if (!newVal) {
    optionType.value = 'add'
    formState.value.id = ''
    formState.value.creator = ''
    formState.value.createdAt = ''
    formState.value.updatedAt = ''
    formState.value.date = ''
    formRef.value.resetFields();
  }
})

const bigTypeList = ref([])
const bigTypeMap = ref({})
const getBigTypeList = async () => {
  await axios(
    {
      url: "/api/getBigTypeList",
      method: "post",
      data: {}
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      bigTypeList.value = res.data.data.map(it => {
        it.id += ''
        bigTypeMap.value[it.id] = it.bigTypeName
        return it
      })
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const smallTypeList = ref([])
const smallTypeMap = ref({})
const getSmallTypeByBigTypeId = (bigTypeId) => {
  smallTypeList.value = []
  smallTypeMap.value = {}
  queryParams.smallTypeId = ''
  axios(
    {
      url: "/api/getSmallTypeByBigTypeId",
      method: "post",
      data: { bigTypeId: queryParams.bigTypeId }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      smallTypeList.value = res.data.data.map(it => {
        it.id += ''
        smallTypeMap.value[it.id] = it.smallTypeName
        return it
      })
    }
  })
}

const typeChange = (type) => {
  if (type === 'bigTypeId') {
    formState.value.bigTypeName = bigTypeMap[formState.value[type]]
  } else {
    formState.value.smallTypeName = smallTypeMap[formState.value[type]]
  }
}
const optionType = ref('add')

const handleValidate = (...args) => {
  if (!args[1]) {
    message.warning({
      content: '请完善表单信息'
    })
  }
};

const allMoney = ref(0)
const getList = () => {
  const params = _.cloneDeep(queryParams)
  axios(
    {
      url: "/api/getExpenseList",
      method: "post",
      data: params
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      // dataSource.value = res.data.data
      dataSource.value = res.data.data.list.map(it => {
        it.date = dayjs(it.date).format("YYYY-MM-DD")
        return it
      })
      allMoney.value = res.data.data.allMoney
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
      url: "/api/getExpenseDetailById",
      method: "post",
      data: { id }
    }
  ).then((res: AxiosResponse<any, any>): void => {
    if (res.data.code === 200) {
      formState.value = res.data.data
      formState.value.date = dayjs(formState.value.date)
    } else {
      message.warning({
        content: res.data.msg
      })
    }
  })
}

const edit = () => {
  let url = optionType.value === 'add' ? "/api/addExpense" : "/api/updateExpenseById"
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
      url: "/api/deleteExpenseById",
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
  getList()
})
</script>


<style scoped lang="less">
</style>

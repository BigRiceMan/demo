<template>
  <div>
    <el-form ref="forms" :model="forms" :rules="formsRules" label-width="100px" label-position="left">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="forms.mobile" placeholder="请输入手机号" class="inputclass" :maxlength="11"
          show-word-limit clearable prefix-icon='el-icon-user-solid'> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="field101">
        <el-input v-model="forms.field101" placeholder="请输入密码" class="inputclass" clearable
          prefix-icon='el-icon-lock' suffix-icon='el-icon-view' show-password> </el-input>
      </el-form-item>
      <el-form-item label="地名" prop="placeName">
        <el-cascader v-model="forms.placeName" :options="placeNameOptions" :props="placeNameProps"
          placeholder="请选择地名" class="inputclass" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="喜欢的水果" prop="favoriteFruit">
        <el-select v-model="forms.favoriteFruit" placeholder="择选请喜欢的水果" class="inputclass" clearable>
          <el-option v-for="(item, index) in favoriteFruitOptions" :key="index" :label="item.label"
            :value="item.value" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传" prop="field105" required>
        <el-upload ref="field105" :file-list="field105fileList" multiple :before-upload="field105BeforeUpload"
          accept=".doc,.docx" :disabled='true'>
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传Word</el-button>
          <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的.doc,.docx文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="颜色选择" prop="field106" required>
        <el-color-picker v-model="forms.field106" size="medium" show-alpha color-format="rgba">
        </el-color-picker>
      </el-form-item>
      <el-form-item label="是男是女" prop="field107">
        <el-radio-group v-model="forms.field107" size="medium">
          <el-radio v-for="(item, index) in field107Options" :key="index" :label="item.value"
            :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多选题" prop="field108">
        <el-checkbox-group v-model="forms.field108" :min="1" :max="4" size="medium">
          <el-checkbox v-for="(item, index) in field108Options" :key="index" :label="item.value"
            :disabled="item.disabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="评分" prop="field110">
        <el-rate v-model="forms.field110" allow-half show-text></el-rate>
      </el-form-item>
      <el-form-item label="时间选择" prop="field111">
        <el-time-picker v-model="forms.field111" format="HH:mm:ss" value-format="HH:mm:ss"
          :picker-options='{"selectableRange":"00:00:00-23:59:59"}' placeholder="请选择时间选择" class="inputclass"
          clearable></el-time-picker>
      </el-form-item>
      <el-form-item label="日期选择" prop="field112">
        <el-date-picker v-model="forms.field112" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          placeholder="请选择日期选择" class="inputclass" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="日期范围" prop="field113">
        <el-date-picker type="daterange" v-model="forms.field113" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" class="inputclass" start-placeholder="开始日期" end-placeholder="结束日期"
          range-separator="至" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="滑块" prop="field115" required>
        <el-slider :max='100' :step='1' v-model="forms.field115" range :style="{width: '100px'}"></el-slider>
      </el-form-item>
      <el-form-item label="计数器" prop="field114">
        <el-input-number v-model="forms.field114" placeholder="计数器" class="inputclass" step-strictly
          :precision='2'></el-input-number>
      </el-form-item>
      <el-form-item label="开关" prop="field116" required>
        <el-switch v-model="forms.field116" active-text="是否开关" inactive-text="是否关闭" active-color="#952C2C"
          inactive-color="#E61EB4"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      forms: {
        mobile: '',
        field101: '',
        placeName: [],
        favoriteFruit: 1,
        field105: null,
        field106: '255,255,255,.5',
        field107: 'man',
        field108: ["A"],
        field110: 3.5,
        field111: null,
        field112: null,
        field113: null,
        field115: [0, 100],
        field114: 2,
        field116: true,
      },
      formsRules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field101: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        placeName: [{
          required: true,
          type: 'array',
          message: '请至少选择一个placeName',
          trigger: 'change'
        }],
        favoriteFruit: [{
          required: true,
          message: '择选请喜欢的水果',
          trigger: 'change'
        }],
        field107: [{
          required: true,
          message: '是男是女不能为空',
          trigger: 'change'
        }],
        field108: [{
          required: true,
          type: 'array',
          message: '请至少选择一个field108',
          trigger: 'change'
        }],
        field110: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        field111: [{
          required: true,
          message: '请选择时间选择',
          trigger: 'change'
        }],
        field112: [{
          required: true,
          message: '请选择日期选择',
          trigger: 'change'
        }],
        field113: [{
          required: true,
          message: '日期范围不能为空',
          trigger: 'change'
        }],
        field114: [{
          required: true,
          message: '计数器',
          trigger: 'blur'
        }],
      },
      placeNameOptions: [{
        "label": "location",
        "value": "全部",
        "id": 100,
        "children": []
      }, {
        "label": "shanghai",
        "value": "上海",
        "id": 101
      }, {
        "label": "China",
        "value": "中国",
        "id": 102,
        "children": [{
          "label": "beijing",
          "value": "北京",
          "id": 103
        }, {
          "label": "tianjin",
          "value": "天津",
          "id": 104
        }]
      }],
      favoriteFruitOptions: [{
        "label": "全部",
        "value": 1
      }, {
        "label": "桃子",
        "value": 2
      }, {
        "label": "苹果",
        "value": 3
      }, {
        "label": "梨子",
        "value": 4
      }, {
        "label": "铁子",
        "value": 5
      }],
      field107Options: [{
        "label": "男",
        "value": "man"
      }, {
        "label": "女",
        "value": "female"
      }],
      field108Options: [{
        "label": "选项一",
        "value": "A"
      }, {
        "label": "选项二",
        "value": "B"
      }, {
        "label": "选项三",
        "value": "C"
      }, {
        "label": "选项四",
        "value": "D"
      }],
      placeNameProps: {
        "multiple": false
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['forms'].validate(valid => {
        if (!valid) return
        // 提交表单
      })
    },
    resetForm() {
      this.$refs['forms'].resetFields()
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

</style>

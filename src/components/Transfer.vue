<template>
  <div class="transfer">
    <div class="left box">
      <div class="title">店铺</div>
      <div class="content">
        <div class="search-input">
          <i class="el-icon-search"></i>
          <input
            placeholder="请输入名称/ID"
            v-model="searchValue"
            @input="inputChange"
          />
        </div>
        <el-checkbox
          @change="
            (val) => {
              checkChange(item, val);
            }
          "
          v-model="item[options.isChecked]"
          v-for="item in list"
          :key="item[options.id]"
        >
          <div class="store-item">
            <div class="store-name">
              {{ item[options.name] }}
            </div>
            <div class="store-id">ID：{{ item[options.id] }}</div>
          </div>
        </el-checkbox>
      </div>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :pager-count="5"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
    <div class="right box">
      <div class="title">
        <span>已选</span>
        <span class="remove-all" @click="removeAll">清空</span>
      </div>
      <div class="content">
        <div
          class="selected-item"
          v-for="item in selectedList"
          :key="item[options.id]"
        >
          <div class="store-name">{{ item[options.name] }}</div>
          <div class="store-id">ID：{{ item[options.id] }}</div>
          <i
            @click="remove(item[options.id])"
            class="remove-icon el-icon-close"
          ></i>
        </div>
        <el-empty description="请选择" v-if="!selectedList.length"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import getListMockApi from "@/mock";

export default {
  name: "Transfer",
  props: {
    options: {
      type: Object,
      default() {
        return {
          name: "name",
          id: "id",
          isChecked: "isCheck",
        };
      },
    },
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectedList: [],
      searchValue: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    checkChange(item, val) {
      if (val) {
        if (
          !this.selectedList.find((i) => {
            return i[this.options.id] === item[this.options.id];
          })
        ) {
          this.selectedList.push(item);
        }
      } else {
        let index = this.selectedList.findIndex((i) => {
          return i[this.options.id] === item[this.options.id];
        });
        this.selectedList.splice(index, 1);
      }
    },
    getList() {
      getListMockApi(this.currentPage, this.pageSize, this.searchValue).then(
        (res) => {
          this.list = res.list || [];
          this.total = res.total || 0;
          this.list.forEach((item) => {
            if (
              this.selectedList.find(
                (i) => item[this.options.id] === i[this.options.id]
              )
            ) {
              item[this.options.isChecked] = true;
            }
          });
        }
      );
    },
    pageChange(page) {
      this.currentPage = page;
      this.getList();
    },
    remove(id) {
      this.selectedList.splice(
        this.selectedList.findIndex((item) => item[this.options.id] === id),
        1
      );
      let index = this.list.findIndex((item) => item[this.options.id] === id);
      if (index !== -1) {
        this.list[index][this.options.isChecked] = false;
      }
    },
    removeAll() {
      this.selectedList = [];
      this.list.forEach((item) => (item[this.options.isChecked] = false));
    },
    inputChange(val) {
      this.currentPage = 1;
      this.getList();
    },
  },
};
</script>

<style lang="less" scope>
.transfer {
  display: flex;
  .box {
    border: 1px solid #ddd;
    border-radius: 5px;
    .content {
      display: flex;
      flex-direction: column;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .left {
    margin-right: 10px;
    width: 400px;
    .search-input {
      width: 100%;
      height: 40px;
      background: #eee;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
      border-radius: 5px;
      input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .store-item {
      margin-bottom: 10px;
      .store-name {
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
        font-size: 16px;
      }
      .store-id {
        color: #999;
      }
    }
    .pagination {
      text-align: right;
      margin-bottom: 10px;
    }
  }
  .right {
    width: 300px;
    .title {
      display: flex;
      justify-content: space-between;
      .remove-all {
        color: #409EFF;
        cursor: pointer;
      }
    }
    .content {
      max-height: 400px;
      overflow-y: auto;
    }
    .selected-item {
      background: #eee;
      padding: 10px;
      margin-bottom: 10px;
      position: relative;
      .store-name {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .store-id {
        color: #999;
      }
      .remove-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    background: #eee;
    font-weight: bold;
  }
}
</style>
<style lang="less">
.transfer .el-checkbox {
  display: flex;
  align-items: center;
  .el-checkbox__input {
    transform: scale(1.2);
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background: rgb(30, 79, 134);
    border-color: rgb(30, 79, 134);
  }
}
</style>

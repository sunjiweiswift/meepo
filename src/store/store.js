'use strict'
import axios from 'axios'
import _ from 'lodash'
import {ACTION_FETCH_USER_INFO, ACTION_FETCH_TEMPLATE_INFO, ACTION_CHANGE_MENU_STATUS, ACTION_ADD_TEMPLATE_INFO, ACTION_DELETE_TEMPLATE_INFO, ACTION_RENDER_MENU_ID, MUTATION_RENDER_USER_INFO, MUTATION_RENDER_TEMPLATE_INFO, MUTATION_CHANGE_MENU_STATUS, MUTATION_ADD_TEMPLATE_INFO, MUTATION_DELETE_TEMPLATE_INFO, MUTATION_RENDER_MENU_ID} from '@/mod/action'
import {FETCH_TAMPLATE_INFO_URL} from '@/mod/constants'
let mutations = {
  [MUTATION_RENDER_USER_INFO] (state, payload) {
    state.userInfo = Object.assign({}, state.userInfo, payload.userInfo)
  },
  [MUTATION_RENDER_TEMPLATE_INFO] (state, payload) {
    state.templateInfo = payload.templateInfo
  },
  [MUTATION_CHANGE_MENU_STATUS] (state, payload) {
    state.menuDisabled = payload.menuDisabled
  },
  [MUTATION_ADD_TEMPLATE_INFO] (state, payload) {
    switch (payload.type) {
      case 'port':
        for (let i = 0; i < payload.templateNumber; i++) {
          const templateItem = _.cloneDeep(state.templateInfo[payload.templateIndex])
          state.templateInfo.push(templateItem)
        }
        break
      case 'flow':
        state.templateInfo[payload.templateIndex].wrapList.forEach(item => {
          if (item.key === payload.key) {
            for (let i = 0; i < payload.templateNumber; i++) {
              const newItem = _.cloneDeep(item.value[payload.index])
              item.value.push(newItem)
            }
          }
        })
        break
    }
  },
  [MUTATION_DELETE_TEMPLATE_INFO] (state, payload) {
    switch (payload.type) {
      case 'port':
        state.templateInfo.splice(payload.templateIndex, 1)
        break
      case 'flow':
        const wrapList = state.templateInfo[payload.templateIndex].wrapList.slice(0)
        wrapList.forEach(item => {
          if (item.key === payload.key) {
            item.value.splice(payload.index, 1)
          }
        })
        state.templateInfo[payload.templateIndex].wrapList = wrapList
        break
    }
  },
  [MUTATION_RENDER_MENU_ID] (state, payload) {
    state.templateId = payload.templateId
  }
}

let actions = {
  [ACTION_FETCH_USER_INFO] (context, payload) {
    context.commit(MUTATION_RENDER_USER_INFO, {
      userInfo: payload.userInfo
    })
  },
  [ACTION_FETCH_TEMPLATE_INFO] (context, payload) {
    fetchTemplateInfo(context, payload)
  },
  [ACTION_CHANGE_MENU_STATUS] (context, payload) {
    context.commit(MUTATION_CHANGE_MENU_STATUS, {
      menuDisabled: payload.menuDisabled
    })
  },
  [ACTION_ADD_TEMPLATE_INFO] (context, payload) {
    context.commit(MUTATION_ADD_TEMPLATE_INFO, payload)
  },
  [ACTION_DELETE_TEMPLATE_INFO] (context, payload) {
    context.commit(MUTATION_DELETE_TEMPLATE_INFO, payload)
  },
  [ACTION_RENDER_MENU_ID] (context, payload) {
    context.commit(MUTATION_RENDER_MENU_ID, payload)
  }
}

function fetchTemplateInfo ({commit}, {userInfo, templateId}) {
  commit(MUTATION_RENDER_TEMPLATE_INFO, {
    /* templateInfo: [
      {
        port: 1,
        portNum: 33,
        status: true,
        'formList': [
          {
            'title': 'chip_id',
            'type': 'input',
            value: '0',
            listValue: []
          }, {
            'title': '线速率',
            type: 'select',
            'value': '24G',
            listValue: [
              {
                key: '1G',
                value: '1G'
              }, {
                key: '2G',
                value: '2G'
              }, {
                key: '3G',
                value: '3G'
              }, {
                key: '4G',
                value: '4G'
              }, {
                key: '6G',
                value: '6G'
              }, {
                key: '10G',
                value: '10G'
              }, {
                key: '12G',
                value: '12G'
              }, {
                key: '24G',
                value: '24G'
              }]
          }, {
            title: 'fec_en',
            type: 'select',
            value: 'OFF',
            listValue: [
              {
                key: 'ON',
                value: 'ON'
              }, {
                key: 'OFF',
                value: 'OFF'
              }
            ]
          }, {
            title: 'cpri_version',
            type: 'select',
            value: 'version1',
            listValue: [
              {
                key: 'version1',
                value: 'version1'
              }, {
                key: 'version2',
                value: 'version2'
              }
            ]
          }, {
            title: 'cpri_mod',
            type: 'select',
            value: 'cpri',
            listValue: [
              {
                key: 'cpri',
                value: 'cpri'
              }, {
                key: 'scpri',
                value: 'scpri'
              }
            ]
          }, {
            title: 'cpri_ms_mod',
            type: 'select',
            value: 'master',
            listValue: [
              {
                key: 'master',
                value: 'master'
              }, {
                key: 'slave',
                value: 'slave'
              }
            ]
          }, {
            title: 'scramble_en',
            type: 'select',
            value: 'ON',
            listValue: [
              {
                key: 'ON',
                value: 'ON'
              }, {
                key: 'OFF',
                value: 'OFF'
              }
            ]
          }, {
            title: 'HDLC速率',
            type: 'select',
            value: '3M84',
            listValue: [
              {
                key: '240K',
                value: '240K'
              }, {
                key: '480K',
                value: '480K'
              }, {
                key: '960K',
                value: '960K'
              }, {
                key: '1M92',
                value: '1M92'
              }, {
                key: '3M84',
                value: '3M84'
              }, {
                key: '4M8',
                value: '4M8'
              }, {
                key: '7M2',
                value: '7M2'
              }
            ]
          }, {
            title: 'P值max',
            type: 'input',
            value: '53',
            listValue: []
          }, {
            title: 'P值min',
            type: 'input',
            value: '53',
            listValue: []
          }, {
            title: 'stim_en',
            type: 'select',
            value: 'ON',
            listValue: [
              {
                key: 'ON',
                value: 'ON'
              }, {
                key: 'OFF',
                value: 'OFF'
              }
            ]
          }, {
            title: 'chip_cnt',
            type: 'input',
            value: '4000',
            listValue: []
          }, {
            title: 'chip_start_pos',
            type: 'input',
            value: '0',
            listValue: []
          }, {
            title: 'cpri数据填充格式',
            type: 'select',
            value: '全0',
            listValue: [
              {
                key: '全0',
                value: '全0'
              }, {
                key: '全1',
                value: '全1'
              }, {
                key: '随机',
                value: '随机'
              }
            ]
          }, {
            title: 'AXC数据填充格式',
            type: 'select',
            value: '全0',
            listValue: [
              {
                key: '全0',
                value: '全0'
              }, {
                key: '全1',
                value: '全1'
              }, {
                key: '随机',
                value: '随机'
              }
            ]
          }, {
            title: '发送chip数',
            type: 'input',
            value: '4000',
            listValue: []
          }, {
            title: '接收chip数',
            type: 'input',
            value: '4000',
            listValue: []
          }, {
            title: 'cpri_replace',
            type: 'input',
            value: '0x3fe',
            listValue: []
          }, {
            title: '是否测试端口T14',
            type: 'select',
            value: 'ON',
            listValue: [
              {
                key: 'ON',
                value: 'ON'
              }, {
                key: 'OFF',
                value: 'OFF'
              }
            ]
          }, {
            title: 'cpri环回模式',
            type: 'select',
            value: '不环回',
            listValue: [
              {
                key: '不环回',
                value: '不环回'
              }, {
                key: '辅助FPGA环回',
                value: '辅助FPGA环回'
              }, {
                key: 'ASIC环回',
                value: 'ASIC环回'
              }
            ]
          }
        ]
      }
    ] */

    templateInfo: [{
      port: 1,
      portNum: 33,
      status: '0',
      models: ['1', '2'],
      modelList: [{
        key: '1',
        value: 'A'
      }, {
        key: '2',
        value: 'B'
      }, {
        key: '3',
        value: 'C'
      }],
      formList: [{
        title: '线速率',
        type: 'select',
        value: [''],
        listValue: [{
          key: '1G',
          value: '1G'
        }, {
          key: '2G',
          value: '2G'
        }, {
          key: '3G',
          value: '3G'
        }]
      }, {
        title: '输入框',
        type: 'input',
        value: 'sunjiwei',
        listValue: []
      }, {
        title: '数字',
        type: 'number',
        value: '5',
        listValue: []
      }, {
        title: '线速率',
        type: 'select',
        value: ['123', '1234'],
        listValue: [{
          key: '123',
          value: '测试'
        }, {
          key: '1234',
          value: '测试2'
        }]
      }],
      wrapList: [{
        key: '1',
        title: 'A',
        formList: [{
          title: '线速率',
          type: 'select',
          value: [''],
          listValue: [{
            key: '1G',
            value: '1G'
          }, {
            key: '2G',
            value: '2G'
          }, {
            key: '3G',
            value: '3G'
          }]
        }, {
          title: '输入框',
          type: 'input',
          value: 'sunjiwei',
          listValue: []
        }, {
          title: '数字',
          type: 'number',
          value: '5',
          listValue: []
        }, {
          title: '线速率',
          type: 'select',
          value: ['123', '1234'],
          listValue: [{
            key: '123',
            value: '测试'
          }, {
            key: '1234',
            value: '测试2'
          }]
        }],
        value: [[{
          title: '线速率',
          type: 'select',
          value: [''],
          listValue: [{
            key: '1G',
            value: '1G'
          }, {
            key: '2G',
            value: '2G'
          }, {
            key: '3G',
            value: '3G'
          }]
        }, {
          title: '输入框',
          type: 'input',
          value: 'sunjiwei',
          listValue: []
        }, {
          title: '数字',
          type: 'number',
          value: '5',
          listValue: []
        }, {
          title: '线速率',
          type: 'select',
          value: ['123', '1234'],
          listValue: [{
            key: '123',
            value: '测试'
          }, {
            key: '1234',
            value: '测试2'
          }]
        }]]
      }]
    }]
  })
  return axios.get(FETCH_TAMPLATE_INFO_URL, {
    params: {
      userInfo,
      templateId
    }
  }).then(json => {
    if (!(json && json.code === 200)) {
      throw new Error(json.msg || '服务器开小差了~')
    }
    commit(MUTATION_RENDER_TEMPLATE_INFO, {
      templateInfo: json.data.templateInfo
    })
  }).catch(e => {
    throw new Error(e)
  })
}

export default function generateStore (baseargs) {
  return {
    state: {
      ...baseargs
    },
    mutations,
    actions
  }
}

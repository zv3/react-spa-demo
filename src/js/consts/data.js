import { PROCESS_STATE_PENDING, PROCESS_STATE_FAILED, PROCESS_STATE_COMPLETED, PROCESS_STATE_RUNNING } from 'js/consts/processStates';
import { METRIC_STATE_MAINTAINED, METRIC_STATE_IMPROVED, METRIC_STATE_DETERIORATED } from 'js/consts/metricStates';
import { ITEM_TYPE_BUILD, ITEM_TYPE_FIREWALL } from 'js/consts/itemTypes';

const data = [
  {
    id          : 'Tenrox-R1_1235',
    type        : ITEM_TYPE_BUILD,
    owner       : null,
    startTimeTs : null,
    metrics     : {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      startTimeTs     : 1397731380
    },
    unitTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  },
  {
    id          : '432462',
    type        : ITEM_TYPE_FIREWALL,
    owner       : 'jtuck',
    startTimeTs : 1397823120,
    metrics     : {
      progressPercent : 30,
      state           : PROCESS_STATE_RUNNING,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      startTimeTs     : null
    },
    unitTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  },
  {
    id          : '432461',
    type        : ITEM_TYPE_FIREWALL,
    owner       : 'samy',
    startTimeTs : 1397818380,
    metrics     : {
      progressPercent : 100,
      state           : PROCESS_STATE_FAILED,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      startTimeTs     : 1397731380
    },
    unitTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  },
  {
    id          : 'Tenrox-R1_1234',
    type        : ITEM_TYPE_BUILD,
    owner       : null,
    startTimeTs : 1397823120,
    metrics     : {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      startTimeTs     : 1397731380
    },
    unitTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  },
  {
    id          : '432460',
    'type'      : ITEM_TYPE_FIREWALL,
    owner       : 'samy',
    startTimeTs : 1397721060,
    metrics     : {
      progressPercent : 100,
      state           : PROCESS_STATE_FAILED,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      startTimeTs     : 1397731380
    },
    unitTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 0,
      state           : PROCESS_STATE_PENDING,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  },
  {
    id          : '432459',
    'type'      : ITEM_TYPE_FIREWALL,
    owner       : 'samy',
    startTimeTs : 1397630580,
    metrics     : {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      percent         : 60,
      test            : {
        score : 64,
        state : METRIC_STATE_IMPROVED
      },
      maintainability: {
        score : 53,
        state : METRIC_STATE_DETERIORATED
      },
      security: {
        score : 64,
        state : METRIC_STATE_MAINTAINED
      },
      workmanship: {
        score : 72,
        state : METRIC_STATE_MAINTAINED
      }
    },
    build: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      startTimeTs     : 1397731380
    },
    unitTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 142,
      failed          : 10,
      coveragePercent : 76
    },
    functionalTest: {
      progressPercent : 100,
      state           : PROCESS_STATE_COMPLETED,
      passed          : 4321,
      failed          : 2145,
      coveragePercent : 23
    }
  }
];

export default data;

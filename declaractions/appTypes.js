/*eslint-disable */

declare type AppItem = {
  id : string,
    type : string,
    owner : ?string,
    startTimeTs : ?number,
    metrics: {
    progressPercent : number,
      state : string,
      test : {
      score : number,
        state : string
    },
    maintainability : {
      score : number,
        state : string
    },
    security : {
      score : number,
        state : string
    },
    workmanship : {
      score : number,
        state : string
    }
  },
  build: {
    progressPercent : number,
      state : string,
      startTimeTs : ?number
  },
  unitTest: {
    progressPercent : number,
      state : string,
      passed : number,
      failed : number,
      coveragePercent : number
  },
  functionalTest: {
    progressPercent : number,
      state : string,
      passed : number,
      failed : number,
      coveragePercent : number
  },
  state: ?string
};

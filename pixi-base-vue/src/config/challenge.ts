export interface ChallengeDeep {
  // 对象中key位置最终会解析为 字面量类型(只能接受指定的子串,如{name:string},只能接受name为key,值为string) ,
  // 因此如果需要给定key为指定类型则必须写为[props:string]
  [props: string]: {
    speed: number
  }
}
export interface Challenge {
  speed: number
}
export const CHALLENGE: ChallengeDeep = {
  1: {
    speed: 1
  },
  2: {
    speed: 1.3
  },
  3: {
    speed: 1.6
  },
  4: {
    speed: 2
  },
  5: {
    speed: 3
  }
}

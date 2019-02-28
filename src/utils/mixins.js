import axios from 'axios'
import {timestampToDay} from '@/utils/utils'
export const blocks = {
  methods: {
    blockDayHandle (start, end) {
      try {
        const address = this.$store.state.user.accountInfo.address
        let beginTime = timestampToDay(Date.now() + start * 24 * 1000 * 60 * 60)
        let endTime = timestampToDay(Date.now() + end * 24 * 1000 * 60 * 60)
        const params = {'miner': address, 'beginTime': beginTime, 'endTime': endTime}
        return axios.post('/api/block/count/day', params)
      } catch (error) {
        console.log(error)
      }
    },
    votesDayHandle (start, end) {
      try {
        const address = this.$store.state.user.accountInfo.address
        let beginTime = timestampToDay(Date.now() + start * 24 * 1000 * 60 * 60)
        let endTime = timestampToDay(Date.now() + end * 24 * 1000 * 60 * 60)
        const params = {'address': address, 'beginTime': beginTime, 'endTime': endTime}
        return axios.post('/api/votes/count/day', params)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

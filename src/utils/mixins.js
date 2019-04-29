import {blockDay, incomeSum, incomeDay} from '@/api/extend'
import {timestampToDay} from '@/utils/utils'
import { getDelegate } from '@/api/block'
import { numVoteAll } from '@/api/account'

export const blocks = {
  computed: {
    publicKey () {
      const data = JSON.parse(sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    }
  },
  methods: {
    blockDayHandle (address, start, end) {
      try {
        let beginTime = timestampToDay(Date.now() + start * 24 * 1000 * 60 * 60)
        let endTime = timestampToDay(Date.now() + end * 24 * 1000 * 60 * 60)
        const params = {'miner': address, 'beginTime': beginTime, 'endTime': endTime}
        return blockDay(params)
      } catch (error) {
        console.log(error)
      }
    },
    votesDayHandle (address, start, end) {
      try {
        let beginTime = timestampToDay(Date.now() + start * 24 * 1000 * 60 * 60)
        let endTime = timestampToDay(Date.now() + end * 24 * 1000 * 60 * 60)
        const params = {'address': address, 'beginTime': beginTime, 'endTime': endTime}
        return incomeDay(params)
      } catch (error) {
        console.log(error)
      }
    },
    async blockDay (address) {
      try {
        const result = await this.blockDayHandle(address, -1, 0)
        if (result && result.data.code === '200' && result.data.data.length > 0) {
          this.block.total = result.data.data[0].total
        }
      } catch (error) {
        console.log(error)
      }
    },
    async userVoteDay (address) {
      try {
        const result = await this.votesDayHandle(address, 0, 1)
        if (result && result.data.code === '200' && result.data.data.length > 0) {
          this.block.voteNum = result.data.data[0].votes
        }
      } catch (error) {
        console.log(error)
      }
    },
    async myRank (params = {publicKey: this.publicKey}) {
      try {
        const result = await getDelegate(params)
        if (result && result.data.success) {
          this.block.myRank = result.data.delegate.rate
          this.block.rewards = result.data.delegate.rewards
          const num = await numVoteAll()
          if (num && num.data.success) {
            this.block.allDelegates = 100
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    incomeDayHandle (start, end) {
      try {
        let beginTime = timestampToDay(Date.now() + start * 24 * 1000 * 60 * 60)
        let endTime = timestampToDay(Date.now() + end * 24 * 1000 * 60 * 60)
        const params = {'address': this.address, 'beginTime': beginTime, 'endTime': endTime}
        return incomeSum(params)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

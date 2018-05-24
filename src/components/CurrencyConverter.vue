<template>
  <div class="text-xs-center">
    <span v-if="conversionResponse === null" class="display-1 secondary--text">Enter the amount <v-icon medium color="secondary">sentiment_satisfied_alt</v-icon></span>
    <div v-else>
      <div v-if="conversionResponse.text">
        <div v-if="conversionResponse.timestamp !== null" class="text-xs-center body-1 transparentColorDefault"><v-icon small>timer</v-icon> {{dateFormat(conversionResponse.timestamp)}}<br/></div>
        <span class="display-1 secondary--text">{{conversionResponseObject.amount}} {{conversionResponseObject.currencyFrom}} = </span>
        <span class="display-2 primary--text">{{conversionResponse.value}}</span>
        <span class="display-1 secondary--text">{{conversionResponseObject.currencyTo}}</span>
        <br/>
        <span class="title secondary--text">{{conversionResponseObject.currencyFrom}} <v-btn :loading="loadingSwap" flat icon @click="swapCurrencies" class="primary--text"><v-icon>swap_horiz</v-icon></v-btn> {{conversionResponseObject.currencyTo}}</span>
      </div>
      <div v-if="conversionResponse.message">
        <span class="display-1 secondary--text">Error <v-icon medium color="secondary">sentiment_very_dissatisfied</v-icon></span>
        <br/>
        <span class="body-1 red--text">{{conversionResponseObject}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['amount', 'conversionResponse', 'swapCurrencies', 'loadingSwap'],
    computed: {
      conversionResponseObject () {
        if (this.conversionResponse !== null) {
          if (this.conversionResponse.text) {
            let cResponseArray = this.conversionResponse.text.split(' ')
            let cResponseObject = {
              amount: cResponseArray[0],
              currencyFrom: cResponseArray[1],
              currencyTo: cResponseArray[5]
            }
            return cResponseObject
          } else if (this.conversionResponse.message) {
            let cResponseError = this.conversionResponse.message
            return cResponseError
          }
        }
      }
    },
    methods: {
      dateFormat (timestamp) {
        var time = moment.unix(timestamp).format('HH:mm:ss')
        return time
      }
    },
    data () {
      return {
      }
    }
  }
</script>

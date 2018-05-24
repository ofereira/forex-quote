<template>
  <div>
    <div v-if="currencyPairsQuotes.length > 0" class="text-xs-center body-1 transparentColorDefault"><v-icon small>timer</v-icon> {{dateFormat(currencyPairsQuotes[0].timestamp)}}</div>
    <v-data-table :headers="headers" :items="currencyPairsQuotes" :loading="loadingQuotes" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.symbol }}</td>
        <td class="text-xs-left">{{ props.item.bid }}</td>
        <td class="text-xs-left">{{ props.item.ask }}</td>
        <td class="text-xs-left">{{ spreadPercent(props.item.bid, props.item.ask) }} %</td>
        <!-- <td class="text-xs-left">{{ dateFormat(props.item.timestamp) }}</td> -->
      </template>
      <template slot="no-data">
        <div class="text-xs-center">
          <span class="body-1 transparentColorDefault">Select at least 1 currency pair <v-icon small>sentiment_very_satisfied</v-icon></span>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['currencyPairsQuotes', 'loadingQuotes'],
    methods: {
      dateFormat (timestamp) {
        var time = moment.unix(timestamp).format('HH:mm:ss')
        return time
      },
      spreadPercent (bid, ask) {
        var spread = ((ask - bid) / ask) * 100
        return spread.toFixed(3)
      }
    },
    data () {
      return {
        headers: [{
          text: 'Currency Pair',
          align: 'left',
          sortable: false,
          value: 'pair'
        },
        {
          text: 'Bid',
          sortable: false,
          value: 'bid'
        },
        {
          text: 'Ask',
          sortable: false,
          value: 'ask'
        },
        {
          text: 'Spread %',
          sortable: false,
          value: 'spread'
        }
        ]
      }
    }
  }
</script>

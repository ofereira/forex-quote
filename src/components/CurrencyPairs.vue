<template>
      <v-data-table :headers="headers" :items="currencyPairsQuotes" :loading="loadingQuotes" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.symbol }}</td>
          <td class="text-xs-left">{{ props.item.bid }}</td>
          <td class="text-xs-left">{{ props.item.ask }}</td>
          <td class="text-xs-left">{{ spreadPercent(props.item.bid, props.item.ask) }} %</td>
          <td class="text-xs-left">{{ dateFormat(props.item.timestamp) }}</td>
        </template>
      </v-data-table>
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
          value: 'bid'
        },
        {
          text: 'Ask',
          value: 'ask'
        },
        {
          text: 'Spread %',
          value: 'spread',
          sortable: false
        },
        {
          text: 'Time',
          value: 'time',
          sortable: false
        }
        ]
      }
    }
  }
</script>

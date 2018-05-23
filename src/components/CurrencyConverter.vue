<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-select
        v-model="select"
        :items="items"
        label="Select pairs to show"
        autocomplete
        chips
        tags
      >
        <template slot="selection" slot-scope="data">
          <v-chip
            :selected="data.selected"
            :disabled="data.disabled"
            :key="JSON.stringify(data.item)"
            close color="primary" text-color="white"
            @input="data.parent.selectItem(data.item)"
          >
            {{ data.item }}
          </v-chip>
        </template>
      </v-select>
    </v-flex>
    <v-flex class="text-xs-center" xs12>
      <v-btn class="primary">UPDATE</v-btn>
    </v-flex>
    <v-flex>
      <v-data-table :headers="headers" :items="desserts" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.symbol }}</td>
          <td class="text-xs-left">{{ props.item.bid }}</td>
          <td class="text-xs-left">{{ props.item.ask }}</td>
          <td class="text-xs-left">{{ spreadPercent(props.item.bid, props.item.ask) }} %</td>
          <td class="text-xs-left">{{ dateFormat(props.item.timestamp) }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment'

  export default {
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
        select: ['AUDUSD', 'EURUSD', 'GBPJPY'],
        items: [
          'AUDJPY',
          'AUDUSD',
          'CHFJPY',
          'EURAUD',
          'EURCAD',
          'EURCHF',
          'EURGBP',
          'EURJPY',
          'EURUSD',
          'GBPAUD',
          'GBPCAD',
          'GBPCHF',
          'GBPJPY',
          'NZDJPY',
          'NZDUSD',
          'USDCAD',
          'USDCHF',
          'USDJPY',
          'AUDCAD',
          'AUDCHF'
        ],
        headers: [{
          text: 'Pair',
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
          value: 'spread'
        },
        {
          text: 'Time',
          value: 'time'
        }
        ],
        desserts: [{
          symbol: 'AUDUSD',
          price: 0.792495,
          bid: 0.79248,
          ask: 0.79251,
          timestamp: 1502160793
        },
        {
          symbol: 'EURUSD',
          price: 1.181,
          bid: 1.18099,
          ask: 1.18101,
          timestamp: 1502160794
        },
        {
          symbol: 'GBPJPY',
          price: 144.3715,
          bid: 144.368,
          ask: 144.375,
          timestamp: 1502160794
        }
        ]
      }
    }
  }
</script>

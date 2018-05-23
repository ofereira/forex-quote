<template>
  <v-layout>
    <v-flex xs12 offset-lg2 lg8>
      <v-tabs icons-and-text centered grow dark color="white">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab class="secondary--text" href="#tab-1">
          Currency Pair Quotes
          <v-icon class="secondary--text">insert_chart</v-icon>
        </v-tab>
        <v-tab class="secondary--text" href="#tab-2">
          Currency Converter
          <v-icon class="secondary--text">monetization_on</v-icon>
        </v-tab>
        <v-tab-item key="1" id="tab-1">
          <v-card flat>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    v-model="pairsSelected"
                    :items="currencyPairsSymbolList"
                    label="Select currency pair(s) to show"
                    item-text="symbol"
                    item-value="symbol"
                    multiple
                    autocomplete
                    chips
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
                    <template slot="item" slot-scope="data">
                      {{ data.item }}
                    </template>
                  </v-select>
                </v-flex>
                <v-flex class="text-xs-center" xs12>
                  <v-btn @click="getCurrencyPairsQuotes" class="primary">UPDATE QUOTES</v-btn>
                </v-flex>
                <v-flex mt-3 xs12>
                  <currency-pairs :currencyPairsQuotes="currencyPairsQuotes" :loadingQuotes="loadingQuotes"></currency-pairs>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="2" id="tab-2">
          <v-card flat>
            <v-card-text>
              <!-- <currency-converter></currency-converter> -->
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
  import CurrencyPairs from './CurrencyPairs'
  import CurrencyConverter from './CurrencyConverter'
  import {HTTP} from '../axios'

  export default {
    components: {
      'currency-pairs': CurrencyPairs,
      'currency-converter': CurrencyConverter
    },
    methods: {
      getCurrencyPairsSymbolList () {
        HTTP.get('symbols')
        .then(response => {
          this.currencyPairsSymbolList = response.data
        })
        .catch(e => {
          console.log(e)
        })
      },
      getCurrencyPairsQuotes () {
        let pairs = this.pairsSelected
        let url = '/quotes?pairs=' + pairs
        this.loadingQuotes = true
        HTTP.get(url)
        .then(response => {
          this.currencyPairsQuotes = response.data
          this.loadingQuotes = false
        })
        .catch(e => {
          console.log(e)
          this.loadingQuotes = false
        })
      }
    },
    mounted () {
      this.getCurrencyPairsSymbolList()
      this.getCurrencyPairsQuotes()
    },
    data () {
      return {
        currencyPairsQuotes: [],
        pairsSelected: ['USDEUR'],
        currencyPairsSymbolList: [],
        loadingQuotes: false
      }
    }
  }
</script>

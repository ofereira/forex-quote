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
            <!-- Card Currency Pairs Start -->
            <v-card-text v-if>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 offset-sm2 sm8>
                    <v-select
                      v-model="pairsSelected"
                      :items="currencyPairsSymbolList"
                      label="Select currency pair(s) to show"
                      item-text="symbol"
                      item-value="symbol"
                      append-icon="keyboard_arrow_down"
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
                  <v-flex mt-3 xs12 offset-sm1 sm10>
                    <currency-pairs :currencyPairsQuotes="currencyPairsQuotes" :loadingQuotes="loadingQuotes"></currency-pairs>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <!-- Card Currency Pairs End -->
          </v-card>
        </v-tab-item>
        <v-tab-item key="2" id="tab-2">
          <v-card flat>
            <!-- Card Currency Converter Start -->
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex my-3 xs12>
                    <currency-converter :swapCurrencies="swapCurrencies()" :amount="amount" :currencyFrom="currencyFrom" :currencyTo="currencyTo" :conversionResponse="conversionResponse"></currency-converter>
                  </v-flex>
                  <v-flex xs2 offset-sm2 sm2>
                    <v-text-field
                    label="Amount"
                    v-model="amount"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs5 sm3>
                    <v-select
                    label="From"
                    :items="currencySymbolList"
                    v-model="currencyFrom"
                    append-icon="keyboard_arrow_down"
                    autocomplete
                    >
                      <template slot="item" slot-scope="data">
                        {{data.item}}
                      </template>
                    </v-select>
                  </v-flex>
                  <v-flex xs5 sm3>
                    <v-select
                    label="To"
                    :items="currencySymbolList"
                    v-model="currencyTo"
                    append-icon="keyboard_arrow_down"
                    autocomplete
                    >
                    </v-select>
                  </v-flex>
                  <v-flex text-xs-center xs12>
                    <v-btn :loading="loadingConversion" @click="convertAmount" class="primary">Convert</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <!-- Card Currency Converter End -->
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
  import queryString from 'query-string'

  export default {
    components: {
      'currency-pairs': CurrencyPairs,
      'currency-converter': CurrencyConverter
    },
    watch: {
      currencyPairsSymbolList () {
        this.currencyFromList = this.currencySymbolList
        this.currencyToList = this.currencySymbolList
      }
    },
    computed: {
      currencySymbolList () {
        let cSymbolList = []
        let cSymbolRepeated = ''
        this.currencyPairsSymbolList.forEach(cPairSymbol => {
          let cSymbol
          cSymbol = cPairSymbol.slice(0, 3)
          if (cSymbol !== cSymbolRepeated) {
            cSymbolList.push(cSymbol)
          }
          cSymbolRepeated = cSymbol
        })
        return cSymbolList
      }
    },
    methods: {
      isNumeric (n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
      },
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
      },
      swapCurrencies () {
        let temp = this.currencyFrom
        this.currencyFrom = this.currencyTo
        this.currencyTo = temp
        this.convertAmount()
      },
      convertAmount () {
        if (!this.isNumeric(this.amount)) {
          this.conversionResponse = {}
          this.conversionResponse.message = 'Please enter a valid amount'
        } else if (this.currencyFrom === null || this.currencyTo === null) {
          this.conversionResponse = {}
          this.conversionResponse.message = 'Please select currencies to convert'
        } else {
          this.loadingConversion = true
          let params = queryString.stringify({
            from: this.currencyFrom,
            to: this.currencyTo,
            quantity: this.amount
          }, {
            sort: false
          })
          let url = 'convert?' + params
          HTTP.get(url)
          .then(response => {
            this.conversionResponse = response.data
            this.loadingConversion = false
          })
          .catch(e => {
            console.log(e)
            this.loadingConversion = false
          })
        }
      }
    },
    mounted () {
      this.getCurrencyPairsSymbolList()
      this.getCurrencyPairsQuotes()
    },
    data () {
      return {
        amount: null,
        conversionResponse: null,
        currencyPairsQuotes: [],
        pairsSelected: ['USDEUR'],
        currencyPairsSymbolList: [],
        currencyFrom: null,
        currencyTo: null,
        loadingQuotes: false,
        loadingConversion: false
      }
    }
  }
</script>

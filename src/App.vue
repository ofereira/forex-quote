<template>
  <v-app class="white">
    <v-toolbar class="secondary elevation-0">
      <v-toolbar-title class="white--text">Forex Quote</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="body-2 white--text">Market Status
        <v-chip :color="marketStatusColor" text-color="white">
          {{ marketStatus }}
          <v-progress-circular v-if="this.marketStatus.length <= 0" :size="15" :width="2" indeterminate color="white"></v-progress-circular>
        </v-chip>
      </div>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import {HTTP} from './axios'

  export default {
    methods: {
      getMarketStatus () {
        HTTP.get('market_status')
        .then(response => {
          this.marketStatus = response.data.market_is_open ? 'OPEN' : 'CLOSED'
          this.marketStatusColor = response.data.market_is_open ? 'green' : 'red'
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    mounted () {
      this.getMarketStatus()
    },
    data () {
      return {
        marketStatus: '',
        marketStatusColor: 'grey'
      }
    }
  }
</script>

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
      <router-view v-if="marketStatus === 'OPEN'"></router-view>
      <v-card v-if="marketStatus === 'CLOSED'" flat>
        <v-card-text class="flex"
          style="
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 80vh;
            ">
          <span class="headline secondary--text">Market is CLOSED</span>
          <br/>
          <span class="display-2 secondary--text">The service is not available, come back later</span>
        </v-card-text>
      </v-card>
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

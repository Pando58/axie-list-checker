<template>
  <div class="container max-w-3xl p-4 mx-auto">

    <h1 class="font-bold text-xl text-center mb-4 opacity-0">-</h1>

    <!-- Toggle switch -->
    <div class="flex items-center mb-4">
      <label for="toggle" class="flex items-center cursor-pointer">
        <div class="relative">
          <input id="toggle" type="checkbox" class="sr-only" v-model="toggle"/>
          <div class="line w-14 h-8 bg-gray-300 rounded-full shadow-inner transition duration-300"></div>
          <div class="dot absolute w-6 h-6 bg-white rounded-full shadow left-1 top-1 transition duration-300"></div>
        </div>
        <div class="ml-2 text-sm font-medium text-gray-500 min-w-3ch"> {{ toggle ? 'ON' : 'OFF' }} </div>
      </label>
    </div>

    <!-- Timer -->
    <div class="mb-4">
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="timer-select">
        Refresh rate
      </label>
      <div class="relative w-20">
        <select v-model="timerSelect" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="timer-select">
          <option value="1000">1s</option>
          <option value="2000">2s</option>
          <option value="3000">3s</option>
          <option value="4000">4s</option>
          <option value="5000">5s</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    <!-- Sort -->
    <div class="mb-4">
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="sort-select">
        Sort by
      </label>
      <div class="relative w-28">
        <select v-model="sort" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sort-select">
          <option value="newest">Newest</option>
          <option value="lowPrice">Low price</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    <!-- Table -->
    <ul class="mt-12 rounded-lg shadow overflow-hidden border-b border-gray-200 divide-y divide-gray-200">
      <li class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 uppercase flex">
        <div class="flex-none w-1/12">-</div>
        <div class="flex-1">ID</div>
        <div class="flex-none w-2/12">ETH</div>
        <div class="flex-none w-2/12">USD</div>
      </li>
      <li class="px-4 py-3 text-sm font-medium text-gray-500 flex" v-for="(axie, index) in axies" v-bind:key="axie.id">
        <div class="flex-none w-1/12">{{ index + 1 }}</div>
        <div class="flex-1">#{{ axie.id }}</div>
        <div class="flex-none w-2/12">{{ getETH(axie.auction.currentPrice) }}</div>
        <div class="flex-none w-2/12">${{ axie.auction.currentPriceUSD }}</div>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { getData } from '@/scripts/apiCheck.js'

export default {
  setup() {
    const toggle = ref(false);
    const timerSelect = ref('2000');
    const sort = ref('newest');

    const timer = computed(() => parseInt(timerSelect.value));
    
    const axies = ref(null);

    const getETH = (eth) => {
      return (eth / Math.pow(10, 18)).toFixed(3);
    }

    onMounted(() => {
      getData((data) => {
        axies.value = data;
      });
    });

    return { toggle, timerSelect, sort, timer, axies, getETH };
  },
}
</script>

<style scoped>

#toggle:checked ~ .dot {
  @apply transform translate-x-full;
}

#toggle:checked ~ .line {
  @apply bg-green-400;
}

</style>
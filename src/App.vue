<template>
  <div class="container max-w-3xl p-4 mx-auto">

    <h1 class="font-bold text-xl text-center mb-4 opacity-0">-</h1>

    <!-- Toggle switch -->
    <Switch :value="toggle" @onChange="changeToggle"></Switch>

    <!-- Timer -->
    <Select 
      label="Refresh rate"
      :options="[
        { value: 1000, name: '1s' },
        { value: 2000, name: '2s' },
        { value: 3000, name: '3s' },
        { value: 4000, name: '4s' },
        { value: 5000, name: '5s' },
      ]"
      :selected="timer"
      @onChange="changeRefreshRate"
    ></Select>

    <!-- Sort -->
    <Select 
      label="Sort by"
      :options="[
        { value: 'newest', name: 'Newest' },
        { value: 'lowPrice', name: 'Low price' }
      ]"
      :selected="sort"
      @onChange="changeSort"
    ></Select>

    <!-- Table -->
    <ul class="mt-12 rounded-lg shadow overflow-hidden border-b border-gray-200 divide-y divide-gray-200">
      <li class="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 uppercase flex">
        <div class="flex-none w-1/12">-</div>
        <div class="flex-1">ID</div>
        <div class="flex-none w-2/12">ETH</div>
        <div class="flex-none w-2/12">USD</div>
      </li>
      <li
        class="px-4 py-3 text-sm font-medium text-gray-500 flex"
        v-for="(axie, index) in axies"
        v-bind:key="axie.id"
      >
        <div class="flex-none w-1/12">{{ index + 1 }}</div>
        <div class="flex-1">
          <a
            class="hover:text-green-500 transition"
            :href="`https://marketplace.axieinfinity.com/axie/${ axie.id }`"
            target="_blank"
          >
            #{{ axie.id }}
          </a>
        </div>
        <div class="flex-none w-2/12">{{ getETH(axie.auction.currentPrice) }}</div>
        <div class="flex-none w-2/12">${{ axie.auction.currentPriceUSD }}</div>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getData } from '@/scripts/apiCheck.js'
import Switch from '@/components/Switch.vue'
import Select from '@/components/Select.vue'

export default {
  components: {
    Switch,
    Select
  },
  setup() {
    const toggle = ref(false);
    const timer = ref(2000);
    const sort = ref('newest');
    const interval = ref(null);
    const axies = ref(null);

    const startTimer = () => {
      interval.value = setInterval(updateList, timer.value);
    }

    const stopTimer = () => {
      if (interval.value !== null) {
        clearInterval(interval.value);
      }
    }

    const toggleTimer = () => {
      if (toggle.value) {
        startTimer();
      } else {
        stopTimer();
      }
    }

    const resetTimer = () => {
      if (!toggle.value) return;

      stopTimer();
      startTimer();
    }

    const getETH = (eth) => {
      return (eth / Math.pow(10, 18)).toFixed(3);
    }

    const updateList = () => {
      getData((data) => {
        axies.value = data;
      });
    }

    const changeToggle = (e, val) => {
      toggle.value = val;
      toggleTimer();
    }

    const changeRefreshRate = (e, val) => {
      timer.value = val;
      resetTimer();
    }

    const changeSort = (e, val) => {
      sort.value = val;
      resetTimer();
    }

    onMounted(() => {
      updateList();
    });

    return {
      toggle,
      timer,
      sort,
      interval,
      axies,
      startTimer,
      stopTimer,
      toggleTimer,
      resetTimer,
      getETH,
      updateList,
      changeToggle,
      changeRefreshRate,
      changeSort
    };
  },
}
</script>
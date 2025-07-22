<template>
  <q-page>
    <div class="home-page-header bg-img-main">
      <div class="container">
        <h1 class="lg:text-3xl text-2xl font-bold text-white uppercase font-mono">One Form</h1>
        <h1 class="lg:text-5xl text-3xl font-bold text-white uppercase mt-3">Social Cap</h1>
        <p class="text-white mt-5 lg:w-[65%] text-lg leading-loose">
          Click the button below to create a proposal. Once it is approved, we will customize a DC allocation plan for
          you, which will be automatically executed at the scheduled time!
        </p>
        <div class="mt-10">
          <q-btn size="lg" icon-right="arrow_forward" push rounded color="primary" label="Create proposal"
            :to="{ name: 'CreateProposalPage' }"></q-btn>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="relative py-5">
        <div separator class="proposal-list">
          <template v-for="proposal in proposals" :key="proposal.p_id">
            <ProposalItem :proposal="proposal" @click="setSelectedProposal(proposal)" />
          </template>
        </div>
        <q-inner-loading color="primary" :showing="loading">
          <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
        </q-inner-loading>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { proposalApi } from 'src/dist/api';
import { dateFromNow } from 'src/dist/tools';
import ProposalItem from 'src/components/ProposalItem.vue';
import { useQuasar } from 'quasar';

const bgColors = [
  'bg-warning',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-lime-500',
  'bg-sky-500',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-purple-600',
  'bg-pink-600'
]


const getRandomBgColor = () => {
  const randomIndex = Math.floor(Math.random() * bgColors.length)
  return bgColors[randomIndex]
}

export default defineComponent({
  name: 'HomePage',
  components: {
    ProposalItem
  },
  setup: function () {
    const $q = useQuasar();
    return {
      $q: ref($q)
    }
  },
  data: function () {
    return {
      proposals: [],
      loading: false,
      getRandomBgColor,
    }
  },
  created: function () {
    this.getProposals();
  },
  methods: {
    dateFromNow,
    getProposals: async function () {
      try {
        this.loading = true;
        const res = await proposalApi.proposals();
        const list = res.data.data;
        this.proposals = list.map(item => ({
          ...item,
          bg_color: getRandomBgColor()
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    setSelectedProposal: function (proposal) {
      if (this.$q.screen.gt.md) {
        this.selectedProposal = proposal;
        return;
      }
      this.$router.push({ name: 'ProposalDetailPage', params: { pid: proposal.p_id } });
    }
  }
});
</script>

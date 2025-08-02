<template>
  <proposal-content :proposal-content="proposalContent" />
</template>
<script>
import { defineComponent } from 'vue';
import { proposalApi } from 'src/dist/api';
import { constProposalForm } from 'src/dist/proposal-form';
import { constStatusConfig } from 'src/dist/const-data';
import ProposalContent from 'src/components/ProposalContent.vue';
export default defineComponent({
  name: 'UserProposal',
  components: {
    ProposalContent
  },
  setup: function () {

    return {

    }
  },
  props: {
    setLoading: {
      type: Function,
      required: true,
    },
    setUserProposal: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
      constStatusConfig,
      constProposalForm,
      userProposal: {
        status: '',
        wallet: {
          wallet: '',
        }
      },
      proposalContent: {}
    }
  },
  created: function () {
    this.getProposal();
  },
  methods: {
    getProposal: async function () {
      try {
        this.setLoading(true);
        const res = await proposalApi.myProposals();
        this.userProposal = res.data;
        const proposalContent = JSON.parse(res.data.p_content);
        proposalContent.forEach(item => {
          this.proposalContent[item.key] = item.value;
        });
        this.setUserProposal(res.data);
      } catch (error) {
        if (error.code == 65) {
          this.setUserProposal({
            status: 'no_data',
          });
        }
      } finally {
        this.setLoading(false);
      }
    },
    openStakingDialog() {
      this.$refs.stakingCard.openStakingDialog();
    }
  }
});
</script>

<template>
  <template v-for="(item, index) in constProposalForm" :key="index">
    <q-list separator class="proposal-form-list">
      <q-item-label header class="text-xl font-bold">
        <div class="flex items-center space-x-2">
          <span class="h-10 w-10 bg-primary rounded-full text-white flex items-center justify-center">
            <q-icon :name="`fa-solid fa-${index + 1}`" size="1em" />
          </span>
          <span class="text-primary">{{ item.group }}</span>
        </div>
      </q-item-label>
      <template v-for="field in item.fields" :key="field.key">
        <q-item :class="`item-${field.type}`">
          <q-item-section side>
            <q-item-label>{{ field.label }}:</q-item-label>
          </q-item-section>
          <q-item-section class="content">
            <template v-if="proposalContent[field.key] !== undefined">
              <template v-if="field.type === 'files'">
                <file-fields :files="proposalContent[field.key]" />
              </template>
              <template v-else>
                <q-item-label>{{ proposalContent[field.key] }}</q-item-label>
              </template>
            </template>
            <template v-else>
              <q-item-label>--</q-item-label>
            </template>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </template>
</template>
<script>
import { defineComponent } from 'vue'
import { constProposalForm } from 'src/dist/proposal-form'
import FileFields from 'src/components/FileFields.vue';
export default defineComponent({
  name: 'ProposalContent',
  components: {
    FileFields
  },
  props: {
    proposalContent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      constProposalForm,

    }
  }
})
</script>

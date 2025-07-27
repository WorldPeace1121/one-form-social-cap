<template>
  <q-list dense v-if="!$q.screen.lt.sm" class="main-menu">
    <q-item clickable :to="{ name: 'HomePage' }">
      <q-item-section>
        <q-item-label>Home</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable :to="{ name: 'MyProposal' }">
      <q-item-section>
        <q-item-label>My Proposal</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainMenu',
})
</script>

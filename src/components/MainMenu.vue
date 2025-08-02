<template>
  <q-list :dense="!qTool.screen.lt.sm" class="main-menu">
    <q-item clickable :to="{ name: 'HomePage' }">
      <q-item-section side>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Home</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable :to="{ name: 'MyProposal' }">
      <q-item-section side>
        <q-icon name="list" />
      </q-item-section>
      <q-item-section>
        <q-item-label>My Proposal</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainMenu',
  setup() {
    const qTool = useQuasar()
    return {
      qTool: ref(qTool)
    }
  }
})
</script>

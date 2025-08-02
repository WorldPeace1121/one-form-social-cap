<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="item in items" :key="item" class="rounded-lg overflow-hidden">
      <a :href="item" target="_blank">
        <q-img fit="cover" height="100px" v-if="mediaIsImage(item)" :src="item" />
      </a>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { emptyString, mediaIsImage } from 'src/dist/tools'
export default defineComponent({
  name: 'FileFields',
  props: {
    files: {
      type: String,
      required: true
    }
  },
  watch: {
    files: {
      handler(newVal) {
        if (emptyString(newVal)) return;
        this.items = newVal.split(',')
      },
      immediate: true
    }
  },
  data() {
    return {
      items: [],
      mediaIsImage
    }
  }
})
</script>

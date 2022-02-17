<template>
  <div>
    <div @click.stop="show=!show">
      button
    </div>
    <transition
      name="fadey"
    >
      <div v-if="show">
        <div v-show="show">
          123
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      show: false
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.fadey-enter,
.fadey-leave-to {
  opacity: 0;
}

.fadey-enter-active,
.fadey-leave-active {
  transition: opacity .5s;
}
</style>
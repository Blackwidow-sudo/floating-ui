<script lang="ts">
  let hover = false

  function enter() {
    hover = true
  }

  function leave() {
    hover = false
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="contents"
  on:mouseenter={enter}
  on:mouseleave={leave}>
  <slot {hover} />
</div>

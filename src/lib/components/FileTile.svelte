<script lang="ts">
  import FUIElement from '../tooltip'
  import { createEventDispatcher, onMount } from 'svelte'
  import Hover from './Hover.svelte'

  const dispatch = createEventDispatcher()

  export let user: Record<string, any>

  let hovering = false
  let entered = false

  $: img = user.picture.large

  function onMouseEnter({ clientX, clientY }: MouseEvent) {
    // console.log('onMouseEnter', clientX, clientY)
    // dispatch('hover:start', { clientX, clientY, img })
    entered = true
  }

  function onMousePosition({ clientX, clientY }: MouseEvent) {
    if (entered) {
      dispatch('hover:position', { clientX, clientY, img })
    }
  }

  function onMouseLeave() {
    dispatch('hover:end')
    entered = false
  }

  function onHover() {
    hovering = !hovering
  }
</script>

<div
  class="relative grid grid-cols-1 grid-rows-3 gap-2 p-2 shadow-md bg-slate-200"
  role="menubar"
  tabindex="0">
  <Hover let:hover>
    <img
      class="w-full row-span-2 rounded"
      src={user.picture.medium}
      alt=""
      on:mouseenter={onMouseEnter}
      on:mousemove={onMousePosition}
      on:mouseleave={onMouseLeave}
      on:focus />
  </Hover>
  <div class="text-sm">
    <p>{user.name.first}</p>
    <p>{user.name.last}</p>
  </div>
  <!-- {#if hover}
      <div class="absolute top-0 right-0 flex flex-col-reverse gap-1">
        <button class="w-8 h-8 rounded-md bg-slate-300 hover:bg-slate-400"
          >👍</button>
        <button class="w-8 h-8 rounded-md bg-slate-300 hover:bg-slate-400"
          >👎</button>
        <button class="w-8 h-8 rounded-md bg-slate-300 hover:bg-slate-400"
          >🗑</button>
      </div>
    {/if} -->
</div>

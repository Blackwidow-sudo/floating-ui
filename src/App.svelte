<script lang="ts">
  import images from './lib/images'
  import FileTile from './lib/components/FileTile.svelte'
  import userStore from './lib/userStore'
  import {
    autoUpdate,
    autoPlacement,
    computePosition,
    flip,
    offset,
    shift,
  } from '@floating-ui/dom'
  import { onMount, tick } from 'svelte'

  let tooltip: HTMLElement
  let tooltipSrc: string | null
  let timeout: number

  function onHoverStart({ detail }) {
    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      tooltipSrc = detail.img
      tick().then(() => onHoverPosition({ detail }))
    }, 1000)
  }

  async function onHoverPosition({ detail: { clientX, clientY, img } }) {
    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      tooltipSrc = img
    }, 1000)

    const virtualEl = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          right: clientX,
          bottom: clientY,
        }
      },
    }

    const { x, y } = await computePosition(virtualEl, tooltip, {
      placement: 'bottom-start',
      middleware: [shift(), flip(), offset(30)],
    })

    tooltip.style.transform = `translate(${x}px, ${y}px)`
  }

  function onHoverEnd() {
    clearTimeout(timeout)
    tooltipSrc = null
  }

  onMount(() => {
    userStore.index()
  })
</script>

<main>
  <div class="grid grid-cols-8 gap-2 p-4">
    {#each $userStore as user}
      <FileTile
        {user}
        on:hover:start={onHoverStart}
        on:hover:position={onHoverPosition}
        on:hover:end={onHoverEnd} />
    {/each}
  </div>
  <div
    bind:this={tooltip}
    class:hidden={!tooltipSrc}
    class="absolute top-0 left-0 p-1 font-semibold text-white rounded shadow-md bg-slate-500 w-max">
    <img
      role="tooltip"
      src={tooltipSrc}
      alt="" />
  </div>
</main>

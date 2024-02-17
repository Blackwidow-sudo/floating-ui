import { writable } from 'svelte/store'

const { subscribe, set, update } = writable([])

async function index() {
  const res = await fetch('https://randomuser.me/api?results=50')
  const data = await res.json()

  set(data.results)
}

export default {
  subscribe,
  index,
}

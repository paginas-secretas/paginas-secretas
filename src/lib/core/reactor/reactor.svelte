<script generics="E,S" lang="ts">
	/* eslint-disable no-undef  */

	import type { Reactor } from './reactor';
	import { onMount } from 'svelte';

	/**
	 * The reactor whose state is being subscribed.
	 */
	export let reactor: Reactor<E, S>;

	/**
	 * A callback for subscribing to new state changes.
	 */
	export let listener: ((state: S) => void) | undefined = undefined;

	// Subscrible only once after element is inserted in the DOM
	if (listener !== undefined) {
		const callback = listener;

		onMount(() => reactor.subscribe(callback));
	}
</script>

<slot />

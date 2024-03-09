<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import DecryptContactsPage from './[ref]/[hash]/+page.svelte';
	import NotFoundPage from './[ref]/+page.svelte';
</script>

{#if !browser}
	<slot />
{:else}
	{@const searchParams = $page.url.searchParams}
	{@const ref = searchParams.get('ref')}
	{@const hash = searchParams.get('hash')}

	{#if !ref && !hash}
		<slot />
	{:else if ref && hash}
		<div class="hidden">
			{($page.params.ref = ref) && ($page.params.hash = hash)}
		</div>
		<DecryptContactsPage />
	{:else}
		<NotFoundPage />
	{/if}
{/if}

<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsListStore } from '@stores';
	import { onMount } from 'svelte';

	const { ref, hash } = $page.params;
	const contactsListStore = ContactsListStore;

	onMount(() => contactsListStore.triggerFetchContactsList(ref, hash));
</script>

Olá!!!

{ref}
{hash}

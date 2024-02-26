<script lang="ts">
	import { ContactsViewer } from '@components';
	import { ContactsListStore } from '@stores';
	import { onMount } from 'svelte';

	const contactsListStore = ContactsListStore;
	onMount(() => contactsListStore.triggerCreateList());
</script>

{#if $contactsListStore.success}
	<ContactsViewer />
{/if}

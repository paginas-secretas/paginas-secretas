<script lang="ts">
	import { ContactsViewer } from '@components';
	import { ContactsListStore } from '@stores';
	import { onMount } from 'svelte';

	const contactsListStore = ContactsListStore;

	$: contactsList = $contactsListStore.value;

	onMount(() => contactsListStore.triggerCreateList());
</script>

{#if $contactsListStore.success}
	<ContactsViewer contactsList={contactsList.value} />
{/if}

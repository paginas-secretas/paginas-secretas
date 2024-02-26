<script lang="ts">
	import { ContactsViewer } from '@components';
	import { ContactsListStore } from '@stores';
	import { onMount } from 'svelte';

	const contactsListStore = ContactsListStore;

	const triggerCreateContactsList = function () {
		contactsListStore.triggerCreateList();
	};

	const triggerStoreContactsList = function () {
		contactsListStore.triggerStoreContactsList();
	};

	$: contactsList = $contactsListStore.value;

	onMount(triggerCreateContactsList);
</script>

{#if $contactsListStore.success}
	<ContactsViewer
		contactsList={contactsList.value}
		onSaveContactsClick={triggerStoreContactsList}
	/>
{/if}

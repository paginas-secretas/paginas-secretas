<script lang="ts">
	import { ContactsListStore, createNewContactStore } from '@stores';
	import { LL } from '@i18n';
	import { onMount } from 'svelte';

	const contactsListStore = ContactsListStore;
	const newContactStore = createNewContactStore($LL);

	const triggerCreateContactsList = function () {
		contactsListStore.triggerCreateList();
	};

	const triggerStoreContactsList = function () {
		contactsListStore.triggerStoreContactsList();
	};

	$: showNewContactModalForm = false;
	$: contactsList = $contactsListStore.value;

	onMount(triggerCreateContactsList);
</script>

404

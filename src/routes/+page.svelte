<script lang="ts">
	import { ModalForm, ContactsViewer, onNextTick } from '@components';
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

{#if $contactsListStore.success}
	<ContactsViewer
		contactsList={contactsList.value}
		onNewContactClick={() => {
			showNewContactModalForm = !showNewContactModalForm;

			if (!showNewContactModalForm) {
				onNextTick(() => (showNewContactModalForm = true));
			}
		}}
		onSaveContactsClick={triggerStoreContactsList}
	/>

	{#if showNewContactModalForm}
		<ModalForm
			form={$newContactStore.value}
			onSubmit={(result) => {
				showNewContactModalForm = false;
				contactsListStore.triggerAddContact(result);
			}}
		/>
	{/if}
{/if}

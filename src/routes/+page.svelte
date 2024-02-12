<script lang="ts">
	import {
		ContactsListViewer,
		CreateContactsListButton,
		NewContactButton,
		ModalForm
	} from '@components';
	import { ContactsListStore, createNewContactStore } from '@stores';
	import LL from '../i18n/i18n-svelte';
	const contactsListStore = ContactsListStore;
	const newContactStore = createNewContactStore($LL);

	const triggerCreateContactsList = function () {
		console.log('Button clicked');
		contactsListStore.triggerCreateList();
	};

	$: showNewContactModalForm = false;
	$: contactsList = $contactsListStore.value;
</script>

<div class="flex flex-col items-center">
	{#if $contactsListStore.success}
		<div class="flex flex-col items-center">
			<ContactsListViewer contactsList={contactsList.value} />
			<NewContactButton
				onClick={() => {
					showNewContactModalForm = true;
				}}
			/>
		</div>
		{#if showNewContactModalForm}
			<ModalForm
				form={$newContactStore.value}
				onSubmit={(result) => {
					showNewContactModalForm = false;
					contactsListStore.triggerStoreList(result);
				}}
			/>
		{/if}
	{:else}
		<CreateContactsListButton onClick={triggerCreateContactsList} />
	{/if}
</div>

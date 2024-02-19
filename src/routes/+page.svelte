<script lang="ts">
	import {
		CreateContactsListButton,
		NewContactButton,
		ModalForm,
		onNextTick,
		ContactsViewer
	} from '@components';
	import { ContactsListStore, createNewContactStore } from '@stores';
	import LL from '../i18n/i18n-svelte';
	import SaveContactsListButton from '$lib/components/button/save-contacts-list-button.svelte';
	const contactsListStore = ContactsListStore;
	const newContactStore = createNewContactStore($LL);

	const triggerCreateContactsList = function () {
		console.log('Button clicked');
		contactsListStore.triggerCreateList();
	};

	const triggerStoreContactsList = function () {
		console.log('Store Contacts List  Button clicked');
		contactsListStore.triggerStoreContactsList();
	};

	$: showNewContactModalForm = false;
	$: contactsList = $contactsListStore.value;
</script>

{#if $contactsListStore.success}
	<div class="bg-blue-400">
		<ContactsViewer contactsList={contactsList.value} />
		<!-- <NewContactButton
			onClick={() => {
				showNewContactModalForm = !showNewContactModalForm;

				if (!showNewContactModalForm) {
					onNextTick(() => (showNewContactModalForm = true));
				}
			}}
		/>
		<SaveContactsListButton onClick={triggerStoreContactsList} /> -->
	</div>
	{#if showNewContactModalForm}
		<ModalForm
			form={$newContactStore.value}
			onSubmit={(result) => {
				showNewContactModalForm = false;
				contactsListStore.triggerAddContact(result);
			}}
		/>
	{/if}
{:else}
	<CreateContactsListButton onClick={triggerCreateContactsList} />
{/if}

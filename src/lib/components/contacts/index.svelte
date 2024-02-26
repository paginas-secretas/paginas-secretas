<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';
	import { ModalForm, SimpleAlert, onNextTick } from '@components';
	import { LL } from '@i18n';
	import {
		ContactsListStore,
		createGenerateKeyPairStore,
		createNewContactStore,
		createShareContactsStore
	} from '@stores';

	const shareContactsStore = createShareContactsStore($LL);
	const newContactStore = createNewContactStore($LL);
	const generateKeyPairStore = createGenerateKeyPairStore();
	const contactsListStore = ContactsListStore;
	const generateKeyPairTranslations = $LL.alert.generatePublicKey;
	const sharedContactsListTranslations = $LL.alert.sharedContactsList;

	$: contactSelected = contactsList.at(-1);
	$: unsavedChanges = true;
	$: showShareModalForm = false;
	$: showNewContactModalForm = false;
	$: showSharedContactsListAlert = $shareContactsStore.success;
	$: showGenerateKeyPairAlert = $generateKeyPairStore.success;
	$: contactsList = $contactsListStore.value.value;
</script>

<div class="flex flex-row h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer
			{contactsList}
			onContactSelected={(contact) => (contactSelected = contact)}
			onShareSelected={() => {
				showShareModalForm = !showShareModalForm;

				if (!showShareModalForm) {
					onNextTick(() => (showShareModalForm = true));
				}
			}}
			onGenerateKeyPairSelected={() => {
				if (showGenerateKeyPairAlert) {
					showGenerateKeyPairAlert = false;
				}

				onNextTick(() => generateKeyPairStore.generate());
			}}
		/>
	</div>

	{#if contactSelected}
		<ContactInformation contact={contactSelected} />
	{:else}
		<NoContactRecords />
	{/if}

	{#if showShareModalForm}
		<ModalForm
			form={$shareContactsStore.value.form}
			onSubmit={(result) => {
				showShareModalForm = false;
				shareContactsStore.submit(result, contactsList);
			}}
		/>
	{/if}

	{#if showGenerateKeyPairAlert}
		<SimpleAlert
			value={{
				title: generateKeyPairTranslations.title(),
				subtitle: generateKeyPairTranslations.subtitle(),
				message: $generateKeyPairStore.value.public.toString(),
				action: [
					generateKeyPairTranslations.action(),
					() => {
						showGenerateKeyPairAlert = false;
					}
				]
			}}
		/>
	{/if}

	{#if showSharedContactsListAlert && $shareContactsStore.value.url}
		<SimpleAlert
			value={{
				title: sharedContactsListTranslations.title(),
				subtitle: sharedContactsListTranslations.subtitle(),
				message: $shareContactsStore.value.url.toString(),
				action: [
					sharedContactsListTranslations.action(),
					() => {
						showSharedContactsListAlert = false;
					}
				]
			}}
		/>
	{/if}

	{#if showNewContactModalForm}
		<ModalForm
			form={$newContactStore.value}
			onSubmit={(result) => {
				showNewContactModalForm = false;
				contactsListStore.triggerAddContact(result);
			}}
		/>
	{/if}

	<div class="flex flex-col fixed bottom-10 right-8 gap-3">
		<NewContactButton
			onClick={() => {
				showNewContactModalForm = !showNewContactModalForm;

				if (!showNewContactModalForm) {
					onNextTick(() => (showNewContactModalForm = true));
				}
			}}
		/>
		{#if unsavedChanges}
			<SaveContactsListButton onClick={() => contactsListStore.triggerStoreContactsList()} />
		{/if}
	</div>
</div>

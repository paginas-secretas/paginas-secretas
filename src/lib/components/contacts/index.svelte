<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';
	import { ModalForm, SimpleAlert, onNextTick } from '@components';
	import { LL } from '@i18n';
	import { createGenerateKeyPairStore, createShareContactsStore } from '@stores';

	export let contactsList: ContactsList;
	export let onNewContactClick: () => void;
	export let onSaveContactsClick: () => void;

	const shareContactsStore = createShareContactsStore($LL);
	const generateKeyPairStore = createGenerateKeyPairStore();
	const generateKeyPairTranslations = $LL.alert.generatePublicKey;

	$: unsavedChanges = true;
	$: contactSelected = contactsList.at(-1);
	$: showShareModalForm = false;
	$: showGenerateKeyPairAlert = $generateKeyPairStore.success;
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
			form={$shareContactsStore.value}
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

	<div class="flex flex-col fixed bottom-10 right-8 gap-3">
		<NewContactButton onClick={onNewContactClick} />
		{#if unsavedChanges}
			<SaveContactsListButton onClick={onSaveContactsClick} />
		{/if}
	</div>
</div>

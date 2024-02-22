<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';
	import { ModalForm, onNextTick } from '@components';
	import { LL } from '@i18n';
	import { createShareContactsStore } from '@stores';

	export let contactsList: ContactsList;
	export let onNewContactClick: () => void;
	export let onSaveContactsClick: () => void;

	const shareContactsStore = createShareContactsStore($LL);

	$: unsavedChanges = true;
	$: contactSelected = contactsList.at(-1);
	$: showShareModalForm = false;
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
			onGenerateKeyPairSelected={console.log}
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
				shareContactsStore.submit(result);
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

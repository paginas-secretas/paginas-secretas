<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';

	export let contactsList: ContactsList;
	export let onNewContactClick: () => void;
	export let onSaveContactsClick: () => void;

	$: unsavedChanges = true;
	$: contactSelected = contactsList.at(-1);
</script>

<div class="flex flex-row h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer
			{contactsList}
			onContactSelected={(contact) => (contactSelected = contact)}
			onShareSelected={console.log}
			onGenerateKeyPairSelected={console.log}
		/>
	</div>

	{#if contactSelected}
		<ContactInformation contact={contactSelected} />
	{:else}
		<NoContactRecords />
	{/if}

	<div class="flex flex-col fixed bottom-10 right-8 gap-3">
		<NewContactButton onClick={onNewContactClick} />
		{#if unsavedChanges}
			<SaveContactsListButton onClick={onSaveContactsClick} />
		{/if}
	</div>
</div>

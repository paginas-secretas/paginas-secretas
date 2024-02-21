<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton } from '../button';
	import { NoContactRecords } from '../illustrations';

	export let contactsList: ContactsList;
	export let onNewContactClick: () => void;

	$: contactSelected = contactsList.at(-1);
</script>

<div class="flex flex-row h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer {contactsList} onContactSelected={(contact) => (contactSelected = contact)} />
	</div>

	{#if contactSelected}
		<ContactInformation contact={contactSelected} />
	{:else}
		<NoContactRecords />
	{/if}

	<NewContactButton onClick={onNewContactClick} />
</div>

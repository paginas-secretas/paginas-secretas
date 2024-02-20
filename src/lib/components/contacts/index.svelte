<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton } from '../button';

	export let contactsList: ContactsList;

	$: contactSelected = contactsList[0];
</script>

{#if contactsList.length > 0}
	<div class="flex flex-row max-h-screen">
		<div class="flex w-1/4">
			<ContactsExplorer
				{contactsList}
				onContactSelected={(contact) => (contactSelected = contact)}
			/>
		</div>

		<div class="grow"><ContactInformation contact={contactSelected} /></div>

		<NewContactButton onClick={() => {}} />
	</div>
{:else}
	No contacts added yet!
{/if}

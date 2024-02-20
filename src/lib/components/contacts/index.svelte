<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';

	export let contactsList: ContactsList;
</script>

{#if contactsList.length > 0}
	<div class="flex flex-row max-h-screen">
		<div class="flex w-1/4">
			<ContactsExplorer {contactsList} />
		</div>

		<!-- TODO: change contact based on the selected -->
		<div class="grow"><ContactInformation contact={contactsList[0]} /></div>
	</div>
{:else}
	No contacts added yet!
{/if}

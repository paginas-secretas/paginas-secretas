<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';
	import { NewContactButton } from '../button';

	export let contactsList: ContactsList;
	export let onNewContactClick: () => void;

	$: contactSelected = contactsList[0];
</script>

<div class="flex flex-row max-h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer {contactsList} onContactSelected={(contact) => (contactSelected = contact)} />
	</div>

	<div class="grow"><ContactInformation contact={contactSelected} /></div>

	<NewContactButton onClick={onNewContactClick} />
</div>

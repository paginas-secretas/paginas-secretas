<script lang="ts">
	import type { Contact, ContactsList } from '@models';
	import { ContactTile } from '../contact-tile';

	export let contactsList: ContactsList;
	export let onContactSelected: (contact: Contact) => void;
</script>

<ul class="overflow-auto grow">
	{#each contactsList as contact}
		<li class="px-4 py-3">
			<ContactTile {contact} onClick={() => onContactSelected(contact)} />
		</li>
	{/each}
</ul>

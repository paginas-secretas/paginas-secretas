<script lang="ts">
	import { ContactsViewer } from '@components';
	import { ContactsReactor, NewContactsList } from '@stores';

	const contactsReactor = new ContactsReactor();
	contactsReactor.add(NewContactsList());
</script>

{#if $contactsReactor}
	<ContactsViewer {contactsReactor} />
{/if}

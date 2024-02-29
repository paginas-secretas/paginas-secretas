<script lang="ts">
	import { ContactsViewer } from '@components';
	import { ContactsReactor } from '@stores';

	const contactsReactor = new ContactsReactor();
</script>

{#if $contactsReactor}
	<ContactsViewer {contactsReactor} />
{/if}

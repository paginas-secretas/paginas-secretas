<script lang="ts">
	import { ContactsViewer, onNextTick } from '@components';
	import { ContactsReactor, LoadContactsList } from '@stores';
	import { onMount } from 'svelte';

	const contactsReactor = new ContactsReactor();
	onMount(() => contactsReactor.add(LoadContactsList()));
</script>

{#if $contactsReactor}
	<ContactsViewer {contactsReactor} />
{/if}

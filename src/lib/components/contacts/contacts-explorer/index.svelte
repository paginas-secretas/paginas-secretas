<script lang="ts">
	import type { ContactsList } from '@models';
	import { SearchBar } from './search-bar';
	import { ContactList } from './contact-list';

	export let contactsList: ContactsList;

	$: searchValue = '';
	$: contacts = contactsList.filter((c) => c.name.includes(searchValue));
</script>

<div class="flex flex-col grow gap-4 my-4">
	<SearchBar bind:value={searchValue} />
	<ContactList contactsList={contacts} />
</div>

<div class="divider divider-vertical w-min" />

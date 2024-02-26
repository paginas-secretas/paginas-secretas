<script lang="ts">
	import type { Contact, ContactsList } from '@models';
	import { SearchBar } from './search-bar';
	import { ContactList } from './contact-list';
	import { OptionsButton } from '@components';
	import { LL } from '@i18n';

	export let contactsList: ContactsList;
	export let onContactSelected: (contact: Contact) => void;
	export let onShareSelected: () => void;
	export let onGenerateKeyPairSelected: () => void;

	const options = new Map([
		[$LL.share().toString(), onShareSelected],
		[$LL.generateKeyPair().toString(), onGenerateKeyPairSelected]
	]);

	$: searchValue = '';
	$: regex = new RegExp(searchValue, 'i');
	$: contacts = contactsList.filter((c) => regex.test(c.name));
</script>

<div class="flex flex-col grow gap-4 my-4">
	<div class="flex flex-row justify-between items-center">
		<div class="flex-grow mx-4">
			<SearchBar bind:value={searchValue} />
		</div>
		<OptionsButton values={[...options.keys()]} onClick={(value) => options.get(value)?.()} />
	</div>
	<ContactList contactsList={contacts} {onContactSelected} />
</div>

<div class="divider divider-vertical w-min" />

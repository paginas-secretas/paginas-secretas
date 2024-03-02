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

	$: searchValue = '';
	$: regex = new RegExp(searchValue, 'i');
	$: contacts = contactsList.filter((c) => regex.test(c.name));
	$: disabled = contactsList.length === 0;
	$: options = [
		{
			option: $LL.share().toString(),
			callback: onShareSelected,
			disabled: disabled
		},
		{
			option: $LL.generateKeyPair().toString(),
			callback: onGenerateKeyPairSelected,
			disabled: false
		}
	];
</script>

<div class="flex flex-col grow gap-4 my-4">
	<div class="flex flex-row justify-between items-center">
		<div class="flex-grow mx-4">
			<SearchBar bind:value={searchValue} {disabled} />
		</div>
		<OptionsButton
			values={options.filter((x) => !x.disabled).map((x) => x.option) }
			onClick={(value) => options.find((x) => x.option === value)?.callback()} />
	</div>
	<ContactList contactsList={contacts} {onContactSelected} />
</div>

<div class="divider divider-vertical w-min" />

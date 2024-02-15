<script lang="ts">
	import { LL } from '@i18n';
	import type { ContactsList } from '@models';
	import Table from './table.svelte';

	export let contactsList: ContactsList;
	const labels = $LL.form.newContact.labels;

	const headers = [
		labels.name(),
		labels.birthday(),
		labels.email(),
		labels.phoneNumber(),
		labels.gender()
	];

	$: content = contactsList.map((value) => [
		value.name,
		value.birthDate?.toDateString() ?? '-',
		value.email,
		// temp
		value.phoneNumbers.at(0)?.value,
		value.gender
	]);
</script>

<Table {headers} {content} />

<script lang="ts">
	import type { ContactsList } from '@models';
	import Table from './table.svelte';

	export let contactsList: ContactsList;

	// TODO: improve this
	const headers = ['name', 'birthDate', 'email', 'phonenumber', 'gender'];
	const content: string[][] = contactsList.map((value) => [
		value.name,
		value.birthDate.toISOString(),
		value.email,
		value.phoneNumber.value,
		value.gender
	]);
</script>

<Table {headers} {content} />

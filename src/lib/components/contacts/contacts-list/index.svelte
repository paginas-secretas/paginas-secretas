<script lang="ts">
	import { ContactsListButton } from '@components';
	import type { ContactsListId } from '@models';

	export let contactsList: ContactsListId[];

	const firstElement = contactsList[0];
	$: contactListSelected = firstElement;
	$: renameList = false;
</script>

<div class="flex flex-row justify-between items-center">
	<div class="flex-grow mx-4">
		<input
			class="input border-0"
			type="text"
			bind:value={contactListSelected.name}
			on:dblclick={() => (renameList = true)}
			readonly={!renameList}
		/>
	</div>

	<ContactsListButton
		values={contactsList}
		onClick={(value) => {
			console.log('clicked in list element');
			contactListSelected = value;
		}}
	/>
</div>

<script lang="ts">
	import { ContactsListViewer, CreateContactsListButton, NewContactButton } from '@components';
	import { ContactsListStore } from '@stores';
	const store = ContactsListStore;

	const triggerCreateContactsList = function () {
		console.log('Button clicked');
		store.triggerCreateList();
	};
</script>

<div class="flex flex-col items-center">
	{#if $store.success}
		<div>
			<ContactsListViewer />
			<NewContactButton onClick={() => console.log('hey')} />
		</div>
	{:else}
		<CreateContactsListButton onClick={triggerCreateContactsList} />
	{/if}
</div>

<script lang="ts">
	import { CreateContactsListButton } from '@components';
	import { ContactsListStore } from '@stores';
	const store = ContactsListStore;

	function triggerCreateContactsList(): void {
		console.log('Button clicked');
		store.triggerCreateList();
	}
</script>

<div class="flex flex-col items-center">
	<CreateContactsListButton onClick={triggerCreateContactsList} />
</div>

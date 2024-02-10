<script lang="ts">
	import { Heading, CreateContactsListButton } from '@components';
	import { ContactsListStore } from '@stores';
	const store = ContactsListStore;

	function triggerCreateContactsList(): void {
		console.log('Button clicked');
		store.triggerCreateList();
	}
</script>

<Heading value="paginas-secretas" />
<CreateContactsListButton onClick={triggerCreateContactsList} />

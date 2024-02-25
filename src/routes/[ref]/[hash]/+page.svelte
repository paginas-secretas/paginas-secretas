<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, ModalForm } from '@components';
	import { createLoadSharedContactsListStore } from '@stores';
	import { onMount } from 'svelte';
	import LL from '../../../i18n/i18n-svelte';

	const { ref, hash } = $page.params;
	const contactsListStore = createLoadSharedContactsListStore();

	$: showDecryptContactsListForm =
		!!$contactsListStore.value?.encrypted && !$contactsListStore.value?.decrypted;

	onMount(() => contactsListStore.load(ref, hash));
</script>

{#if showDecryptContactsListForm}
	<ModalForm
		form={{
			id: 'aa',
			name: $LL.form.decryptContacts.name(),
			description: $LL.form.decryptContacts.description(),
			required: [
				{
					id: '0asdasdasd',
					label: $LL.form.decryptContacts.labels.publicKey(),
					description: $LL.form.decryptContacts.descriptions.publicKey(),
					placeholder: $LL.form.decryptContacts.placeholders.publicKey(),
					type: 'area'
				}
			],
			additional: [],
			control: {
				id: 'asdasd',
				label: $LL.form.decryptContacts.labels.control(),
				type: 'button'
			}
		}}
		onSubmit={(submission) => {
			showDecryptContactsListForm = false;
			contactsListStore.decrypt(submission);
		}}
	/>
{/if}
{#if $contactsListStore.value?.decrypted}
	<ContactsViewer
		contactsList={$contactsListStore.value.decrypted}
		onNewContactClick={console.log}
		onSaveContactsClick={console.log}
	/>
{/if}

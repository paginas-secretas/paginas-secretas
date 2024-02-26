<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, ModalForm } from '@components';
	import {
		ContactsListStore,
		createLoadSharedContactsForm,
		createLoadSharedContactsListStore
	} from '@stores';
	import { onMount } from 'svelte';
	import { LL } from '@i18n';

	const { ref, hash } = $page.params;

	const contactsListStore = ContactsListStore;
	const loadSharedContactsListStore = createLoadSharedContactsListStore();

	$: showDecryptContactsListForm =
		!!$loadSharedContactsListStore.value?.encrypted &&
		!$loadSharedContactsListStore.value?.decrypted;

	$: {
		if ($loadSharedContactsListStore.value?.decrypted) {
			contactsListStore.onContactsLoad(
				$loadSharedContactsListStore.value?.decrypted.keyPair,
				$loadSharedContactsListStore.value?.decrypted.symmetricKey,
				$loadSharedContactsListStore.value?.decrypted.contactsList
			);
		}
	}

	onMount(() => loadSharedContactsListStore.load(ref, hash));
</script>

{#if showDecryptContactsListForm}
	<ModalForm
		form={createLoadSharedContactsForm($LL)}
		onSubmit={(submission) => {
			showDecryptContactsListForm = false;
			loadSharedContactsListStore.decrypt(submission);
		}}
	/>
{/if}

{#if $loadSharedContactsListStore.value?.decrypted}
	<ContactsViewer />
{/if}

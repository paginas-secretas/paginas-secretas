<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, ModalForm } from '@components';
	import { createLoadSharedContactsForm, createLoadSharedContactsListStore } from '@stores';
	import { onMount } from 'svelte';
	import LL from '../../../i18n/i18n-svelte';

	const { ref, hash } = $page.params;
	const loadSharedContactsListStore = createLoadSharedContactsListStore();

	$: showDecryptContactsListForm =
		!!$loadSharedContactsListStore.value?.encrypted &&
		!$loadSharedContactsListStore.value?.decrypted;

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
	<ContactsViewer contactsList={$loadSharedContactsListStore.value.decrypted} />
{/if}

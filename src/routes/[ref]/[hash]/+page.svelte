<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, ModalForm } from '@components';
	import { onMount } from 'svelte';
	import { LL } from '@i18n';
	import { ContactsReactor, ImportContactsFormReactor } from '@stores';
	import { ReactorListener } from '@core';

	const { ref, hash } = $page.params;

	const contactsReactor = new ContactsReactor();
	const importContactsReactor = new ImportContactsFormReactor($LL);

	onMount(() => importContactsReactor.add({}));
</script>

<ReactorListener
	reactor={importContactsReactor}
	listener={(state) => {
		if ('submission' in state) {
			contactsReactor.add({ ref: ref, hash: hash, submission: state.submission });
		}
	}}
>
	{#if $importContactsReactor.status === 'in progress'}
		<ModalForm
			form={$importContactsReactor.value}
			onSubmit={(result) => {
				importContactsReactor.add(result);
			}}
		/>
	{/if}
</ReactorListener>

{#if $contactsReactor.value.length > 0}
	<ContactsViewer {contactsReactor} />
{/if}

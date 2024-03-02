<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, ModalForm } from '@components';
	import { onMount } from 'svelte';
	import { LL } from '@i18n';
	import {
		ContactsReactor,
		DecryptContacts,
		FormStarted,
		FormSubmitted,
		ImportContactsFormReactor,
		isFormFinish,
		isFormInProgress
	} from '@stores';
	import { ReactorListener } from '@core';

	const { ref, hash } = $page.params;

	const contactsReactor = new ContactsReactor();
	const importContactsReactor = new ImportContactsFormReactor($LL);

	onMount(() => importContactsReactor.add(FormStarted()));
</script>

<ReactorListener
	reactor={importContactsReactor}
	listener={(state) => {
		if (isFormFinish(state)) {
			contactsReactor.add(DecryptContacts(ref, hash, state.submission));
		}
	}}
>
	{#if isFormInProgress($importContactsReactor)}
		<ModalForm
			form={$importContactsReactor.value}
			onSubmit={(result) => {
				importContactsReactor.add(FormSubmitted(result));
			}}
		/>
	{/if}
</ReactorListener>

{#if $contactsReactor.value.length > 0}
	<ContactsViewer {contactsReactor} />
{/if}

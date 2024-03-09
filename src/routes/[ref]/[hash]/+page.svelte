<script lang="ts">
	import { page } from '$app/stores';
	import { ContactsViewer, EncryptedContacts, ModalForm } from '@components';
	import { onMount } from 'svelte';
	import { LL } from '@i18n';
	import {
		ContactsReactor,
		DecryptContacts,
		FormStarted,
		FormSubmitted,
		ImportContactsFormReactor,
		isDecryptContactsFailed,
		isFormFinish,
		isFormInProgress,
		NotificationsReactor,
		ShowErrorNotification
	} from '@stores';
	import { ReactorListener, resolve } from '@core';

	const { ref, hash } = $page.params;

	const contactsReactor = new ContactsReactor();
	const importContactsReactor = new ImportContactsFormReactor($LL);
	const notificationsReactor = resolve(NotificationsReactor);

	const decryptFailedTranslations = $LL.notification.decryptFailed;

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

<ReactorListener
	reactor={contactsReactor}
	listener={(state) => {
		if (isDecryptContactsFailed(state)) {
			notificationsReactor.add(
				ShowErrorNotification(
					decryptFailedTranslations.title(),
					decryptFailedTranslations.message()
				)
			);
		}
	}}
>
	{#if $contactsReactor.value.length > 0}
		<ContactsViewer {contactsReactor} />
	{:else}
		<div class="flex flex-col justify-center h-screen">
			<EncryptedContacts />
		</div>
	{/if}
</ReactorListener>

<script lang="ts">
	import { ModalForm, SimpleAlert, onNextTick } from '@components';
	import { ReactorListener } from '@core';
	import { LL } from '@i18n';
	import {
		ContactsReactor,
		CryptoReactor,
		NewContactFormReactor,
		ShareContactsFormReactor
	} from '@stores';
	import { NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';

	export let contactsReactor: ContactsReactor;

	const shareContactsReactor = new ShareContactsFormReactor($LL);
	const newContactReactor = new NewContactFormReactor($LL);
	const cryptoReactor = new CryptoReactor();

	const generateKeyPairTranslations = $LL.alert.generatePublicKey;
	const sharedContactsListTranslations = $LL.alert.sharedContactsList;

	$: contactSelected = contactsList.at(-1);
	$: unsavedChanges = true;

	$: contactsList = $contactsReactor.value;
</script>

<div class="flex flex-row h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer
			{contactsList}
			onContactSelected={(contact) => (contactSelected = contact)}
			onShareSelected={() => {
				shareContactsReactor.reset();

				onNextTick(() => shareContactsReactor.add({}));
			}}
			onGenerateKeyPairSelected={() => {
				cryptoReactor.reset();

				onNextTick(() => cryptoReactor.add({}));
			}}
		/>
	</div>

	{#if contactSelected}
		<ContactInformation contact={contactSelected} />
	{:else}
		<NoContactRecords />
	{/if}

	<ReactorListener
		reactor={shareContactsReactor}
		listener={(state) => {
			if ('submission' in state) {
				contactsReactor.add(state.submission);
			}
		}}
	>
		{#if $shareContactsReactor.status === 'in progress'}
			<ModalForm
				form={$shareContactsReactor.value}
				onSubmit={(result) => {
					shareContactsReactor.add(result);
				}}
			/>
		{:else if $shareContactsReactor.status === 'finished' && 'url' in $contactsReactor}
			<SimpleAlert
				value={{
					title: sharedContactsListTranslations.title(),
					subtitle: sharedContactsListTranslations.subtitle(),
					message: $contactsReactor.url.toString(),
					action: [
						sharedContactsListTranslations.action(),
						() => {
							shareContactsReactor.reset();
						}
					]
				}}
			/>
		{/if}
	</ReactorListener>

	<ReactorListener reactor={cryptoReactor}>
		{#if 'public' in $cryptoReactor}
			<SimpleAlert
				value={{
					title: generateKeyPairTranslations.title(),
					subtitle: generateKeyPairTranslations.subtitle(),
					message: $cryptoReactor.public.toString(),
					action: [
						generateKeyPairTranslations.action(),
						() => {
							cryptoReactor.reset();
						}
					]
				}}
			/>
		{/if}
	</ReactorListener>

	<ReactorListener
		reactor={newContactReactor}
		listener={(state) => {
			if ('submission' in state) {
				contactsReactor.add(state.submission);
			}
		}}
	>
		{#if $newContactReactor.status === 'in progress'}
			<ModalForm
				form={$newContactReactor.value}
				onSubmit={(result) => {
					newContactReactor.add(result);
				}}
			/>
		{/if}
	</ReactorListener>

	<div class="flex flex-col fixed bottom-10 right-8 gap-3">
		<NewContactButton
			onClick={() => {
				newContactReactor.add({});
			}}
		/>
		{#if unsavedChanges}
			<SaveContactsListButton onClick={() => contactsReactor.add({})} />
		{/if}
	</div>
</div>

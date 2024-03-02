<script lang="ts">
	import { ModalForm, onNextTick, SimpleAlert } from '@components';
	import { ReactorListener } from '@core';
	import { LL } from '@i18n';
	import {
		AddContact,
		ContactsReactor,
		CryptoReactor,
		FormStarted,
		FormSubmitted,
		isContactsSaved,
		isContactsShared,
		isFormFinish,
		isFormInProgress,
		isGenerationSuccess,
		NewContactFormReactor,
		NewKeyPair,
		SaveContacts,
		ShareContacts,
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

	$: contactsList = $contactsReactor.value;
	$: contactSelected = contactsList.at(-1);
	$: unsavedChanges =
		!isContactsSaved($contactsReactor) &&
		!isContactsShared($contactsReactor) &&
		$contactsReactor.value.length > 0;
</script>

<div class="flex flex-row h-screen">
	<div class="flex w-1/4">
		<ContactsExplorer
			{contactsList}
			onContactSelected={(contact) => (contactSelected = contact)}
			onShareSelected={() => {
				shareContactsReactor.reset();

				onNextTick(() => shareContactsReactor.add(FormStarted()));
			}}
			onGenerateKeyPairSelected={() => {
				cryptoReactor.reset();

				onNextTick(() => cryptoReactor.add(NewKeyPair()));
			}}
		/>
	</div>

	{#if contactSelected}
		<ContactInformation contact={contactSelected} />
	{:else}
		<div class="flex grow items-center justify-center">
			<NoContactRecords />
		</div>
	{/if}

	<ReactorListener
		reactor={shareContactsReactor}
		listener={(state) => {
			if (isFormFinish(state)) {
				contactsReactor.add(ShareContacts(state.submission));
			}
		}}
	>
		{#if isFormInProgress($shareContactsReactor)}
			<ModalForm
				form={$shareContactsReactor.value}
				onSubmit={(result) => {
					shareContactsReactor.add(FormSubmitted(result));
				}}
			/>
		{:else if isFormFinish($shareContactsReactor) && isContactsShared($contactsReactor)}
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
		{#if isGenerationSuccess($cryptoReactor)}
			<SimpleAlert
				value={{
					title: generateKeyPairTranslations.title(),
					subtitle: generateKeyPairTranslations.subtitle(),
					message: $cryptoReactor.value.public.toString(),
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
			if (isFormFinish(state)) {
				contactsReactor.add(AddContact(state.submission));
			}
		}}
	>
		{#if isFormInProgress($newContactReactor)}
			<ModalForm
				form={$newContactReactor.value}
				onSubmit={(result) => {
					newContactReactor.add(FormSubmitted(result));
				}}
			/>
		{/if}
	</ReactorListener>

	<div class="flex flex-col fixed bottom-10 right-8 gap-3">
		<NewContactButton
			onClick={() => {
				newContactReactor.add(FormStarted());
			}}
		/>
		{#if unsavedChanges}
			<SaveContactsListButton onClick={() => contactsReactor.add(SaveContacts())} />
		{/if}
	</div>
</div>

<script lang="ts">
	import {
		FailureAlert,
		KeyGenerationFailure,
		MessageAlert,
		ModalForm,
		onNextTick,
		TabbedAlert
	} from '@components';
	import { ReactorListener, resolve } from '@core';
	import { LL } from '@i18n';
	import {
		AddContact,
		ContactsReactor,
		CryptoReactor,
		FormStarted,
		FormSubmitted,
		isContactsDecrypted,
		isContactsInitializationFailed,
		isContactsSaved,
		isContactsShared,
		isFormFinish,
		isFormInProgress,
		isGenerationFailure,
		isGenerationSuccess,
		isSaveContactsFailed,
		isShareContactsFailed,
		NewContactFormReactor,
		NewKeyPair,
		NotificationsReactor,
		SaveContacts,
		ShareContacts,
		ShareContactsFormReactor,
		ShowErrorNotification,
		ShowWarningNotification
	} from '@stores';
	import { AddPublicKeyButton, NewContactButton, SaveContactsListButton } from '../button';
	import { NoContactRecords } from '../illustrations';
	import { ContactInformation } from './contact-information';
	import { ContactsExplorer } from './contacts-explorer';

	export let contactsReactor: ContactsReactor;

	const shareContactsReactor = new ShareContactsFormReactor($LL);
	const newContactReactor = new NewContactFormReactor($LL);
	const cryptoReactor = new CryptoReactor();
	const notificationsReactor = resolve(NotificationsReactor);

	const generateKeyPairTranslations = $LL.alert.generateKeyPair;
	const generateKeyPairFailureTranslation = $LL.alert.generatePublicKeyFailure;
	const sharedContactsListTranslations = $LL.alert.sharedContactsList;
	const initializeContactsFailureTranslations = $LL.alert.initializationFailure;
	const saveContactsFailureTranslations = $LL.notification.saveFailed;
	const shareContactsFailureTranslations = $LL.notification.shareFailed;
	const missingPublicKeyTranslations = $LL.notification.missingPublicKey;

	$: contactsList = $contactsReactor.value;
	$: contactSelected = contactsList.at(-1);
	$: unsavedChanges =
		!isContactsSaved($contactsReactor) &&
		!isContactsShared($contactsReactor) &&
		$contactsReactor.value.length > 0;
</script>

<ReactorListener
	reactor={contactsReactor}
	listener={(state) => {
		if (isSaveContactsFailed(state)) {
			notificationsReactor.add(
				ShowErrorNotification(
					saveContactsFailureTranslations.title(),
					saveContactsFailureTranslations.message()
				)
			);
		} else if (isShareContactsFailed(state)) {
			notificationsReactor.add(
				ShowErrorNotification(
					shareContactsFailureTranslations.title(),
					shareContactsFailureTranslations.message()
				)
			);
		} else if (isContactsDecrypted(state) && state.isMissingPublicKey) {
			notificationsReactor.add(
				ShowWarningNotification(
					missingPublicKeyTranslations.title(),
					missingPublicKeyTranslations.message()
				)
			);
		}
	}}
>
	<div class="flex flex-row h-screen">
		<div class="flex w-1/4">
			<ContactsExplorer
				{contactsList}
				readonly={$contactsReactor.readonly}
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

		{#if isContactsInitializationFailed($contactsReactor)}
			<FailureAlert
				value={{
					title: initializeContactsFailureTranslations.title(),
					subtitle: initializeContactsFailureTranslations.subtitle(),
					action: [
						initializeContactsFailureTranslations.action(),
						() => {
							contactsReactor.reset();
						}
					],
					error: $contactsReactor.error
				}}
			/>
		{/if}

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
				<MessageAlert
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
				<TabbedAlert
					value={{
						title: generateKeyPairTranslations.title(),
						subtitle: generateKeyPairTranslations.subtitle(),
						tabs: [
							{
								tab: generateKeyPairTranslations.tabs.public(),
								value: $cryptoReactor.value.public.toString()
							},
							{
								tab: generateKeyPairTranslations.tabs.private(),
								value: $cryptoReactor.value.private.toString()
							}
						],
						action: [
							generateKeyPairTranslations.action(),
							() => {
								cryptoReactor.reset();
							}
						]
					}}
				/>
			{:else if isGenerationFailure($cryptoReactor)}
				<FailureAlert
					value={{
						title: generateKeyPairFailureTranslation.title(),
						subtitle: generateKeyPairFailureTranslation.subtitle(),
						action: [
							generateKeyPairFailureTranslation.action(),
							() => {
								cryptoReactor.reset();
							}
						],
						error: $cryptoReactor.value
					}}
				>
					<KeyGenerationFailure />
				</FailureAlert>
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
			{#if !$contactsReactor.readonly}
				<NewContactButton
					onClick={() => {
						newContactReactor.add(FormStarted());
					}}
				/>
				{#if unsavedChanges}
					<SaveContactsListButton onClick={() => contactsReactor.add(SaveContacts())} />
				{/if}
			{:else}
				<AddPublicKeyButton
					onClick={() => {
						newContactReactor.add(FormStarted());
					}}
				/>
			{/if}
		</div>
	</div>
</ReactorListener>

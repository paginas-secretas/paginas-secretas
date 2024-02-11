<script lang="ts">
	import {
		ContactsListViewer,
		CreateContactsListButton,
		NewContactButton,
		type Form,
		type FormInput,
		ModalForm
	} from '@components';
	import { ContactsListStore } from '@stores';
	import LL from '../i18n/i18n-svelte';
	const store = ContactsListStore;

	const triggerCreateContactsList = function () {
		console.log('Button clicked');
		store.triggerCreateList();
	};

	$: showNewContactModalForm = false;

	const form = <Form>{
		id: 'new-contact',
		name: $LL.form.newContact.name(),
		description: $LL.form.newContact.description(),
		required: [
			{
				id: 'name',
				description: $LL.form.newContact.descriptions.name(),
				label: $LL.form.newContact.labels.name(),
				placeholder: $LL.form.newContact.placeholders.name(),
				type: 'raw'
			},
			{
				id: 'email',
				description: $LL.form.newContact.descriptions.email(),
				label: $LL.form.newContact.labels.email(),
				placeholder: $LL.form.newContact.placeholders.email(),
				type: 'email'
			}
		] satisfies FormInput[],
		additional: [
			{
				id: 'phone-number',
				description: $LL.form.newContact.descriptions.phoneNumber(),
				label: $LL.form.newContact.labels.phoneNumber(),
				placeholder: $LL.form.newContact.placeholders.phoneNumber(),
				type: 'phone-number'
			},
			{
				id: 'gender',
				description: $LL.form.newContact.descriptions.gender(),
				label: $LL.form.newContact.labels.gender(),
				placeholder: $LL.form.newContact.placeholders.gender(),
				type: 'list',
				values: Object.values($LL.form.newContact.values.gender).map((ls) => ls())
			}
		] satisfies FormInput[],
		control: {
			id: 'new-contact-control',
			label: $LL.form.newContact.labels.control(),
			type: 'button'
		}
	};
</script>

<div class="flex flex-col items-center">
	{#if $store.success}
		<div class="flex flex-col items-center">
			<ContactsListViewer />
			<NewContactButton
				onClick={() => {
					showNewContactModalForm = true;
				}}
			/>
		</div>
		{#if showNewContactModalForm}
			<ModalForm id="modal-{form.id}" {form} onSubmit={() => (showNewContactModalForm = false)} />
		{/if}
	{:else}
		<CreateContactsListButton onClick={triggerCreateContactsList} />
	{/if}
</div>

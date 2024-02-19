<script lang="ts">
	import type { Contact } from '@models';

	export let contact: Contact;
</script>

<!-- TODO: change string to constants defined in LL  -->
<div>
	<div class="py-10">
		<h1>Personal Information</h1>
		<div class="divider divider-horizontal" />

		<div id="personal-info" class="flex flex-row gap-4 px-5">
			<div id="email" class="flex flex-row gap-2">
				<div>
					<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							fill-rule="evenodd"
							d="M14.95 3.684L8.637 8.912a1 1 0 0 1-1.276 0l-6.31-5.228A.999.999 0 0 0 1 4v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a.999.999 0 0 0-.05-.316M2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m-.21 1l5.576 4.603a1 1 0 0 0 1.27.003L14.268 3z"
						/>
					</svg>
				</div>
				<div class="flex flex-col">
					<p><b>{contact.email}</b></p>
				</div>
			</div>
			<div id="birthDate" class="flex flex-row gap-2">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M6.998 1.998h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004zM9 5v5h2V5h2v5h2V5h2v5h4v10h2v2H1v-2h2V10h4V5zm-4 7v3h1.162L9 15.946l3-1l3 1L17.838 15H19v-3zm14 5h-.838L15 18.054l-3-1l-3 1L5.838 17H5v3h14z"
						/>
					</svg>
				</div>
				<div class="flex flex-col">
					<p><b>{contact.birthDate?.toDateString() ?? '-'}</b></p>
					<p>Birthday</p>
				</div>
			</div>
		</div>
	</div>

	<div class="py-10">
		<h1>Phone Numbers</h1>
		<div class="divider divider-horizontal" />

		<div id="phone-numbers" class="flex flex-col gap-4 px-5">
			<div class="flex flex-row gap-2">
				<div>
					<svg width="24" height="24" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M39.156 50.934c4.078 0 6.774-1.102 9.164-3.774c.188-.187.352-.398.54-.586c1.406-1.57 2.062-3.117 2.062-4.593c0-1.688-.984-3.258-3.07-4.712l-6.82-4.734c-2.11-1.453-4.571-1.617-6.54.328l-1.804 1.805c-.54.539-1.008.563-1.547.234c-1.242-.797-3.797-3.023-5.532-4.757c-1.828-1.805-3.609-3.82-4.523-5.297c-.328-.54-.281-.985.258-1.524l1.781-1.805c1.969-1.968 1.805-4.453.352-6.538l-4.758-6.82c-1.43-2.087-3-3.048-4.688-3.071c-1.476-.024-3.023.656-4.593 2.062c-.211.188-.399.352-.61.516c-2.648 2.39-3.75 5.086-3.75 9.14c0 6.704 4.125 14.86 11.696 22.43c7.523 7.524 15.703 11.696 22.382 11.696m.024-3.61c-5.977.117-13.64-4.476-19.711-10.523c-6.117-6.094-10.922-14.016-10.805-19.992c.047-2.579.938-4.805 2.79-6.399c.14-.14.28-.258.444-.375c.68-.61 1.454-.937 2.11-.937c.703 0 1.312.257 1.758.96l4.547 6.82c.492.727.539 1.548-.188 2.274l-2.062 2.063c-1.641 1.617-1.5 3.586-.328 5.156c1.335 1.805 3.656 4.43 5.437 6.211c1.805 1.805 4.64 4.336 6.445 5.695c1.57 1.172 3.563 1.29 5.18-.328l2.062-2.062c.727-.727 1.524-.68 2.25-.211l6.82 4.547c.704.468.985 1.054.985 1.758c0 .68-.328 1.43-.96 2.132a5.82 5.82 0 0 1-.352.446c-1.617 1.828-3.844 2.718-6.422 2.765"
						/>
					</svg>
				</div>
				<div class="flex flex-col gap-3">
					{#each contact.phoneNumbers as phone}
						<div id="phone">
							<div class="flex flex-col">
								<p><b>{phone.value}</b></p>
								<p>{phone.type}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="py-10">
		<h1>Addresses</h1>
		<div class="divider divider-horizontal" />

		<div id="addresses" class="flex flex-col gap-4 px-5">
			<div id="email" class="flex flex-row gap-2">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="currentColor"
							d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26.158 26.158 0 0 0 12 20.758a26.14 26.14 0 0 0 3.262-2.994C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7m0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053a25.34 25.34 0 0 1-1.214-.94a28.157 28.157 0 0 1-2.853-2.698C5.218 16.876 3 13.637 3 10a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28.145 28.145 0 0 1-3.796 3.44a16.794 16.794 0 0 1-.345.251l-.021.014l-.006.005l-.002.001zM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0"
						/>
					</svg>
				</div>
				<div class="flex flex-col">
					<p><b>TODO</b></p>
					<p>TODO</p>
				</div>
			</div>
		</div>
	</div>
</div>

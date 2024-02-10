<script>
	import {
		CardNoImage,
		CardWithImage,
		Heading,
		RedBall,
		CreateContactsListButton
	} from '@components';
	import { LL } from '@i18n';

	function triggerCreateContactsList() {
		console.log('Button clicked');
	}
</script>

<Heading value="paginas-secretas" />
<CreateContactsListButton onClick={triggerCreateContactsList} />

<div class="flex flex-row justify-evenly">
	<CardNoImage />
	<CardWithImage />
</div>
<div class="flex flex-col justify-center">
	<RedBall />
	<p class="text-center">{$LL.greetings()}</p>
</div>

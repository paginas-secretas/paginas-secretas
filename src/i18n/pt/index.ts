import type { Translation } from '@i18n';
import type { AlertTranslation, FormTranslation } from '../types';

const pt = {
	createList: 'Criar lista de contactos',
	new: 'Novo',
	saveList: 'Guardar',
	share: 'Partilhar',
	generateKeyPair: 'Gerar chaves',
	states: {
		emptyContactList: 'Ainda não adicionaste contactos.',
		encryptedContacts: 'Precisas de uma chave privada para aceder a esta lista de contactos.'
	},
	form: {
		newContact: {
			name: 'Detalhes do Contacto',
			description: 'Preenche toda a informação necessária do contacto',
			labels: {
				name: 'Nome',
				email: 'E-mail',
				phoneNumber: 'Número de telefone',
				phoneNumberType: 'Tipo do número de telefone',
				gender: 'Género',
				control: 'Submeter',
				birthday: 'Aniversário'
			},
			descriptions: {
				name: 'Nome do contacto',
				email: 'Endereço de e-mail do contacto',
				phoneNumber: 'Número de telefone do contacto',
				phoneNumberType: 'Tipo do número de telefone do contacto',
				gender: 'Género',
				birthday: 'Aniversário do contacto'
			},
			placeholders: {
				name: 'Preenche aqui',
				email: 'Preenche aqui',
				phoneNumber: 'Preenche aqui',
				phoneNumberType: 'Selecione aqui',
				gender: 'Preenche aqui',
				birthday: 'Preenche aqui'
			},
			values: {
				gender: ['Feminino', 'Masculino', 'Nenhum', 'Outro', 'Desconhecido'],
				phoneNumberType: ['Casa', 'Trabalho', 'Movél', 'Outro', 'Voz'],
				address: ['Casa', 'Trabalho']
			}
		},
		shareContacts: {
			name: 'Partilha os Contactos',
			description:
				'Preenche toda a informação necessária para poder partilhar a sua lista de contactos',
			labels: {
				publicKey: 'Chave pública (assimétrica) do utilizador',
				control: 'Submeter'
			},
			descriptions: {
				publicKey: 'A chave pública (assimétrica) do utilizador'
			},
			placeholders: {
				publicKey: 'Preenche aqui'
			},
			values: {}
		},
		decryptContacts: {
			name: 'Decifrar Contactos',
			description: 'Preenche toda a informação necessária para poder decifrar a lista de contactos',
			labels: {
				publicKey: 'Chave privada (assimétrica) do utilizador',
				control: 'Submeter'
			},
			descriptions: {
				publicKey:
					'A chave privada (assimétrica) do utilizador que permite decifrar a lista de contactos'
			},
			placeholders: {
				publicKey: 'Preenche aqui'
			},
			values: {}
		} satisfies FormTranslation
	},
	alert: {
		generatePublicKey: {
			title: 'Chave Pública',
			subtitle:
				'Aqui tens uma nova chave pública. Partilha-a apenas com quem te vai partilhar a lista de contactos.',
			action: 'Confirmar'
		},
		sharedContactsList: {
			title: 'Lista de Contactos',
			subtitle:
				'Aqui está o URL para aceder à lista de contactos. Envia este link a quem te partilhou a chave pública.',
			action: 'Confirmar'
		},
		generatePublicKeyFailure: {
			title: '',
			subtitle: 'An unexpected error has occurred when generating your public key.',
			action: 'Confirm'
		} satisfies AlertTranslation
	},
	contactInformation: {
		personalInformation: 'Informação Pessoal',
		birthday: 'Aniversário',
		phoneNumbers: 'Números de telefone',
		addresses: 'Moradas'
	},
	searchBarPlaceholder: 'Procure contacto',
	copyAction: 'Copiar para a área de trabalho',
	copiedAction: 'Copiado!'
} satisfies Translation;

export default pt;

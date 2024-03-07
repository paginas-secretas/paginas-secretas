import type { Translation } from '@i18n';
import type {
	AlertTranslation,
	FormTranslation,
	NotificationTranslation,
	TabbedAlertTranslation
} from '../types';

const pt = {
	createList: 'Criar lista de contactos',
	new: 'Novo',
	saveList: 'Guardar',
	addPublicKey: 'Adicionar Chave Pública',
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
		} satisfies FormTranslation,
		importPublicKey: {
			name: 'Import Chave Pública',
			description:
				'Preenche toda a informação necessária para poder importar a chave pública da lista de contactos',
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
		} satisfies FormTranslation
	},
	alert: {
		generateKeyPair: {
			title: 'Par de Chaves',
			subtitle:
				'Aqui tens um novo par de chaves. Partilha apenas a chave pública com quem te vai partilhar a lista de contactos',
			tabs: {
				public: 'Pública',
				private: 'Privada'
			},
			action: 'Confirmar'
		} satisfies TabbedAlertTranslation,
		sharedContactsList: {
			title: 'Lista de Contactos',
			subtitle:
				'Aqui está o URL para aceder à lista de contactos. Envia este link a quem te partilhou a chave pública.',
			action: 'Confirmar'
		},
		generatePublicKeyFailure: {
			title: 'Criação da Chave Pública',
			subtitle: 'Ocorreu um erro inesperado ao criar a chave pública.',
			action: 'Confirm'
		} satisfies AlertTranslation,
		initializationFailure: {
			title: 'Inicialização dos Contactos',
			subtitle: 'Ocorreu um erro ao inicializar a lista de contactos.',
			action: 'Confirm'
		} satisfies AlertTranslation
	},
	notification: {
		decryptFailed: {
			title: 'Chave Incorreta',
			message: 'A chave fornecida não pode ser usada para decifrar a lista de contactos.'
		} satisfies NotificationTranslation,
		saveFailed: {
			title: 'Guardar Contactos',
			message: 'Ocorreu um erro ao guardar a lista de contactos. Por favor tenta de novo.'
		} satisfies NotificationTranslation,
		shareFailed: {
			title: 'Partilha de Contactos',
			message: 'Ocorreu um erro ao partilhar a lista de contactos. Por favor tenta de novo.'
		} satisfies NotificationTranslation,
		missingPublicKey: {
			title: 'Chave Pública Indisponível',
			message: 'Não é possível atualizar a lista de contactos até a chave pública ser fornecida.'
		} satisfies NotificationTranslation,
		importPublicKeyFailed: {
			title: 'Importar Chave Pública',
			message: 'A chave pública fornecida não corresponde à chave privada.'
		} satisfies NotificationTranslation
	},
	contactInformation: {
		personalInformation: 'Informação Pessoal',
		birthday: 'Aniversário',
		phoneNumbers: 'Números de telefone',
		addresses: 'Moradas'
	},
	searchBarPlaceholder: 'Procure contacto',
	copyAction: 'Copiar para a área de trabalho',
	copiedAction: 'Copiado!',
	downloadAction: 'Transferir',
	downloadedAction: 'Transferido!'
} satisfies Translation;

export default pt;

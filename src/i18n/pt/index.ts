import type { Translation } from '../i18n-types';

const pt = {
	createList: 'Criar lista de contactos',
	new: 'Novo',
	form: {
		newContact: {
			name: 'Detalhes do Contacto',
			description: 'Preenche toda a informação necessária do contacto',
			labels: {
				name: 'Nome',
				email: 'E-mail',
				phoneNumber: 'Número de telefone',
				gender: 'Género',
				control: 'Submeter'
			},
			descriptions: {
				name: 'Nome do contacto',
				email: 'Endereço de e-mail do contacto',
				phoneNumber: 'Número de telefone do contacto',
				gender: 'Género'
			},
			placeholders: {
				name: 'Preenche aqui',
				email: 'Preenche aqui',
				phoneNumber: 'Preenche aqui',
				gender: 'Preenche aqui'
			},
			values: {
				gender: ['Feminino', 'Masculino', 'Nenhum', 'Outro', 'Desconhecido'],
				phoneNumber: ['Casa', 'Trabalho', 'Movél', 'Outro', 'Voz'],
				address: ['Casa', 'Trabalho']
			}
		}
	}
} satisfies Translation;

export default pt;

import Knex from 'knex';

export async function seed(knex : Knex) {
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'items/lampadas.svg'  },
        { title: 'Pilhas e Baterias', image: 'items/baterias.svg'  },
        { title: 'Papéis e Papelão', image: 'items/papeis-papelao.svg'  },
        { title: 'Resíduos Eletrônicos', image: 'items/eletronicos.svg'  },
        { title: 'Resíduos Orgânicos', image: 'items/organicos.svg'  },
        { title: 'Óleo de Cozinha', image: 'items/oleo.svg'  }
    ]);
}
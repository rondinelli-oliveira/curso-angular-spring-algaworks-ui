export class Pessoa {
  id?: number;
}

export class Categoria {
  id?: number;
}

export class Lancamento {
  id?: number;
  type = 'RECEITA';
  description?: string;
  dueDate?: Date;
  payday?: Date;
  value?: number;
  note?: string;
  person = new Pessoa();
  category = new Categoria();
}

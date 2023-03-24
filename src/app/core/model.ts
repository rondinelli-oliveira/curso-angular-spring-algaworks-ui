export class Endereco {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
}

export class Pessoa {
  id?: number;
  nome?: string;
  endereco = new Endereco();
  ativo = true;
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

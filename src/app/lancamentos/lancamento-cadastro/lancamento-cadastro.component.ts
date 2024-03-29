import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamento: Lancamento = new Lancamento();

  categorias: any[] = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ]

  pessoas: any []= [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idLancamento = this.route.snapshot.params['id'];

    this.title.setTitle('Novo de lançamentos')

    if (idLancamento && idLancamento !== 'novo') {
      this.carregarLancamento(idLancamento)
    }

    this.carregarCategorias()
    this.carregarPessoas()
  }

  get editando() {
    return Boolean(this.lancamento.id)
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      },
        erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form)
    } else {
      this.adicionarLancamento(form)
    }
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then((lancamento: Lancamento) => {
        this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
        this.atualizarTituloEdicao();
      }
      ).catch(erro => this.errorHandler.handle(erro))
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado  => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        this.router.navigate(['/lancamentos', lancamentoAdicionado.id])
      }
      ).catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.description}`);
  }

}

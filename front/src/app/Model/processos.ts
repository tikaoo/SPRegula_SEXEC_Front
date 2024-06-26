export interface IProcessosSexec {
  idProcesso?:number,
  SEI: string,
  requerente: string,
  setor_requerente: string,
  data_entrada_regula: Date,
  data_entrada_sexec: Date,
  unidade_destino: string,
  objeto: string,
  tipo_solicitacao: string,
  descricao_solicitacao: string,
  ponto_sei_enviado_interno: string,
  data_envio_interno: Date,
  prazo_resposta?: Date,
  tm_encaminhamento: number,
  dias_vencer: number,
  situacao: string,
  data_retorno: Date,
  tm_resposta: number,
  status: string,
  informacoes_tecnicas: string,
  ponto_sei_enviado_externo: string,
  data_envio_externo: Date,
  data_preenchimento: Date,
  observacao: string
}

export interface DataRecord {
  prazoResposta: Date | undefined;
  status: string;
  dataHoje: Date;
  dataEnvioInterno: Date;
}

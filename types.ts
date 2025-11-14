
export type View = 'home' | 'rights' | 'card' | 'simulator' | 'library';

export interface Article {
  title: string;
  article: string;
  legalText: string;
  explanation: string;
  category: 'Derechos Fundamentales' | 'Detenciones' | 'Obligaciones del Servidor Público';
}

export interface LegalResource {
    title: string;
    content: string;
    type: 'Jurisprudencia' | 'Caso Documentado' | 'Procedimiento de Denuncia';
}

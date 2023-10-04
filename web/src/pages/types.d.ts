declare global {
  namespace LocacaoProps {
    interface Locacao {
      id: number;
      area: string;
      automovelId: number;
      concessionariaId: number;
      quantidade: number;
      automovel: Automovel;
      concessionaria: Concessionaria;
    }
  }

  namespace AutomovelProps {
    interface Automovel {
      id: number;
      modelo: string;
      preco: number;
    }
  }
  namespace ConcessionariaProps {
    interface Concessionaria {
      id: number;
      concessionaria: string;
    }
  }
  namespace VendaProps {
    interface Cliente {
      id: number;
      nome: string;
    }
  }
}
export interface LocacaoProps extends LocacaoProps.Locacao {}
export interface AutomovelProps extends AutomovelProps.Automovel {}
export interface ConcessionariaProps
  extends ConcessionariaProps.Concessionaria {}
export interface VendaProps extends VendaProps.Cliente {}

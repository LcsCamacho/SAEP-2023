import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import axios from "axios";
import { LocacaoProps, AutomovelProps, ConcessionariaProps } from "./types";
import Head from "next/head";
import { Button, Combobox, Modal } from "nextjs-components";
import { ChevronLeft, ChevronDown } from "nextjs-components/src/icons";
import { AutomovelItem } from "../components/automoveis";
import { useAxios } from "@/hooks/useAxios";
import { Clientes, Concessionarias } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get<LocacaoProps[]>(
    "http://localhost:3777/alocacao",
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer 123456`,
      },
    }
  );
  const locacoes = res.data;
  return {
    props: {
      locacoes,
    },
  };
};

interface HomeProps {
  locacoes: LocacaoProps[];
}

const arrAte11 = Array.from({ length: 11 }, (_, i) => i + 1);

export default function Home({ locacoes }: HomeProps) {
  const [locacao, setLocacao] = useState<LocacaoProps[]>(locacoes);
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showVendasStep, setShowVendasStep] = useState(false);
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [clientesSelected, setClientesSelected] = useState<
    Clientes | undefined
  >(undefined);
  const [concessionarias, setConcessionarias] = useState<Concessionarias[]>([]);
  const [concessionariaSelected, setConcessionariaSelected] = useState<
    Concessionarias | undefined
  >(undefined);
  const [locSelected, setLocSelected] = useState<LocacaoProps>(
    {} as LocacaoProps
  );

  const { api } = useAxios();

  const fetchLocacao = async () => {
    const res = await api.get<LocacaoProps[]>("/alocacao");
    return res.data;
  };

  useEffect(() => {
    arrAte11.forEach((n) => {
      locacoes.forEach((loc) => {
        if (loc.area === String(n)) {
          const area = document.querySelector(`.area${n}`);
          area?.classList.remove("bg-slate-50");
          area?.classList.add("bg-[#0000FF]");
          area?.classList.remove("hover:bg-zinc-100");
          area?.classList.add("hover:bg-[#6969ff]");
        }
      });
    });
  }, [locacoes]);

  const handleClickArea = async (e: React.SyntheticEvent<HTMLDivElement>) => {
    const a = e.currentTarget.innerHTML;
    setSelectedArea((st) => {
      if (a.includes("span")) return 5;
      return Number(a);
    });
    setIsOpen((st) => !st);
    const data = await fetchLocacao();
    setLocacao(() => data.filter((loc) => loc.area === a));
  };

  useEffect(() => {
    (async () => {
      const responseConsessionarias = await api.get("/concessionarias");
      setConcessionarias(responseConsessionarias.data);
      console.log(responseConsessionarias.data);
      setClientes((await api.get("/clientes")).data);
    })();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowVendasStep(false);
  };

  const handleClickVender = async (loc: LocacaoProps) => {
    const res = await api.post("/alocacao", {
      quantidade: loc.quantidade,
      id: loc.id,
    });
    const res2 = await api.post("vendas", {
      clienteId: clientesSelected?.id,
      alocacaoId: locSelected.id,
    });
    console.log(res);
    console.log(res2);
    res.status === 200 && (await fetchLocacao());
    handleClose();
    setLocSelected({} as LocacaoProps);
    setClientesSelected(undefined);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={`relative ${inter.className} w-[100vw] h-[100vh]`}>
        <Modal.Modal active={modalIsOpen} onClickOutside={handleClose}>
          <Modal.Body
            style={{
              padding: 1,
            }}
          >
            <Modal.Header>
              <Modal.Title>Automóveis</Modal.Title>
              <Modal.Subtitle> Area {selectedArea}</Modal.Subtitle>
            </Modal.Header>

            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full">
                {!showVendasStep && (
                  <div className="flex flex-col w-full">
                    {locacao.length === 0 && (
                      <div className="flex items-center gap-1 justify-center w-full p-3">
                        <span className="text-2xl">
                          Nenhum Veiculo nessa area
                        </span>
                      </div>
                    )}
                    {locacao.map((loc: LocacaoProps, index) => {
                      return (
                        <AutomovelItem
                          key={index}
                          loc={loc}
                          setNextStep={setShowVendasStep}
                          setLocSelected={setLocSelected}
                        />
                      );
                    })}
                  </div>
                )}
                {showVendasStep && (
                  <div className="flex flex-col w-full gap-3 py-3">
                    <Combobox
                      placeholder="Clientes..."
                      value={clientesSelected?.nome}
                      onChange={(value) => {
                        setClientesSelected(
                          clientes.find((c) => String(c.id) === value)
                        );
                      }}
                    >
                      <Combobox.Input />
                      <Combobox.List>
                        {clientes.map((c) => {
                          return (
                            <Combobox.Option key={c.id} value={String(c.id)}>
                              {c.nome}
                            </Combobox.Option>
                          );
                        })}
                      </Combobox.List>
                    </Combobox>
                    <Combobox
                      placeholder="Concessionarias..."
                      value={concessionariaSelected?.concessionaria}
                      onChange={(value) => {
                        setConcessionariaSelected(
                          concessionarias.find(
                            (c) => c.concessionaria === value
                          )
                        );
                      }}
                    >
                      <Combobox.Input />
                      <Combobox.List>
                        {concessionarias.map((c) => {
                          return (
                            <Combobox.Option key={c.id} value={String(c.id)}>
                              {c.concessionaria}
                            </Combobox.Option>
                          );
                        })}
                      </Combobox.List>
                    </Combobox>
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Modal.Action onClick={handleClose}>Fechar</Modal.Action>
            {showVendasStep && (
              <Modal.Action
                style={{ background: "#111111", color: "#fff" }}
                onClick={() => handleClickVender(locSelected)}
              >
                Vender
              </Modal.Action>
            )}
          </Modal.Actions>
        </Modal.Modal>

        <div
          onClick={handleClickArea}
          className={`
          area1 area  z-30 flex items-center justify-center border cursor-pointer absolute bottom-[25vh] left-14 w-[20vw] h-[25vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          1
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area2 area z-30 flex items-center justify-center border cursor-pointer absolute bottom-[26vh] left-[34vw] w-[5vw] h-[15vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          2
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area3 area z-20 flex items-center justify-center border cursor-pointer absolute bottom-[10vh] left-[15vw] w-[25vw] h-[33vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          3
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area4 area z-50 flex items-center justify-center border cursor-pointer absolute bottom-[40vh] left-[20vw] w-[12vw] h-[14vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          4
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area5 area z-10 flex items-center justify-end border cursor-pointer absolute bottom-[10vh] left-[15vw] w-[45vw] h-[40vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          <span className="mr-32">5</span>
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area6 area z-10 flex items-center justify-center border cursor-pointer absolute top-[5vh] right-[5vw] w-[8vw] h-[5vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          6
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area7 area z-50 flex items-center justify-center border cursor-pointer absolute bottom-[50vh] left-[32vw] w-[10vw] h-[8vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          7
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area8 area z-50 flex items-center justify-center border cursor-pointer absolute top-[20vh] left-[20vw] w-[9vw] h-[9vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          8
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area9 area z-50 flex items-center justify-center border cursor-pointer absolute top-[19vh] left-[29vw] w-[12vw] h-[12vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          9
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area10 area z-00 flex items-center justify-center border cursor-pointer absolute top-[5vh] right-[5vw] w-[40vw] h-[80vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          10
        </div>
        <div
          onClick={handleClickArea}
          className={`
          area11 area z-50 flex items-center justify-center border cursor-pointer absolute top-[5vh] left-[27vw] w-[5vw] h-[12vh] bg-slate-50
           hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
        >
          11
        </div>
      </main>
    </>
  );
}

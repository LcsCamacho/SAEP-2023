import {
  Clientes,
  Concessionarias,
} from "../../../api/node_modules/.prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Combobox, Modal } from "nextjs-components";
import { useCallback, useEffect, useState } from "react";
import { AutomovelItem } from "../components/automoveis";
import { LocacaoProps } from "./types";
import { useServices } from "../hooks/useServices";
import { SkeletonAreas } from "@/components/skeleton";
const inter = Inter({ subsets: ["latin"] });

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
  return {
    props: {
      locacoes: res.data,
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
  const [concessionariasByVeiculo, setConcessionariasByVeiculo] = useState<
    Concessionarias[]
  >([]);
  const [loading, setLoading] = useState(true);

  const {
    getClientes,
    getConcessionarias,
    getLocacao,
    efetuarVenda,
    getConcessionariasByVeiculo,
  } = useServices();

  useEffect(() => {
    if (!locSelected.automovelId) return;
    (async () => {
      const concessionariasPorVeiculo = await getConcessionariasByVeiculo(
        locSelected.automovelId
      );
      setConcessionariasByVeiculo(concessionariasPorVeiculo);
      setConcessionariaSelected(concessionariasPorVeiculo[0]);
    })();
  }, [locSelected]);

  const verificarAreasOcupadas = useCallback(async () => {
    if (loading) return;
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
  }, [locacoes, loading]);

  const handleClickArea = async (e: React.SyntheticEvent<HTMLDivElement>) => {
    const a = e.currentTarget.innerHTML;
    setSelectedArea((st) => {
      if (a.includes("span")) return 5;
      return Number(a);
    });
    setIsOpen((st) => !st);
    const data = await getLocacao();
    setLocacao(() => data.filter((loc) => loc.area === a));
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowVendasStep(false);
  };

  const handleClickVender = async (loc: LocacaoProps) => {
    setLoading(true);
    const data = {
      quantidade: loc.quantidade,
      locacaoId: loc.id,
      clienteId: clientesSelected?.id,
    };
    try {
      await efetuarVenda(data);
      await getLocacao();
    } catch (error) {
      console.log(error);
    } finally {
      setLocSelected({} as LocacaoProps);
      setClientesSelected(undefined);
      setLoading(false);
      handleClose();
    }
  };

  useEffect(() => {
    verificarAreasOcupadas();
  }, [verificarAreasOcupadas]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setConcessionarias(await getConcessionarias());
      setClientes(await getClientes());
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })();
  }, []);

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
                      showMenuButton
                      size="large"
                      placeholder="Clientes..."
                      value={clientesSelected?.nome || ""}
                      onChange={(value) => {
                        setClientesSelected(
                          clientes.find((c) => String(c.id) === value)
                        );
                      }}
                    >
                      <Combobox.Input loading={loading} />
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
                      showMenuButton
                      size="large"
                      placeholder="Concessionarias..."
                      value={concessionariaSelected?.concessionaria || ""}
                      onChange={(value) => {
                        setConcessionariaSelected(
                          concessionarias.find(
                            (c) => c.concessionaria === value
                          )
                        );
                      }}
                    >
                      <Combobox.Input loading={loading} />
                      <Combobox.List>
                        {concessionariasByVeiculo.map((c) => {
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
        {loading && <SkeletonAreas />}
        {!loading && (
          <>
            <div
              onClick={handleClickArea}
              className={`area1 area z-30 flex items-center justify-center border cursor-pointer absolute bottom-[25vh] left-14 w-[20vw] h-[25vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              1
            </div>
            <div
              onClick={handleClickArea}
              className={`area2 area z-30 flex items-center justify-center border cursor-pointer absolute bottom-[26vh] left-[34vw] w-[5vw] h-[15vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              2
            </div>
            <div
              onClick={handleClickArea}
              className={`area3 area z-20 flex items-center justify-center border cursor-pointer absolute bottom-[10vh] left-[15vw] w-[25vw] h-[33vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              3
            </div>
            <div
              onClick={handleClickArea}
              className={`area4 area z-50 flex items-center justify-center border cursor-pointer absolute bottom-[40vh] left-[20vw] w-[12vw] h-[14vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              4
            </div>
            <div
              onClick={handleClickArea}
              className={`area5 area z-10 flex items-center justify-end border cursor-pointer absolute bottom-[10vh] left-[15vw] w-[45vw] h-[40vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              <span className="mr-32">5</span>
            </div>
            <div
              onClick={handleClickArea}
              className={`area6 area z-10 flex items-center justify-center border cursor-pointer absolute top-[5vh] right-[5vw] w-[8vw] h-[5vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              6
            </div>
            <div
              onClick={handleClickArea}
              className={`area7 area z-50 flex items-center justify-center border cursor-pointer absolute bottom-[50vh] left-[32vw] w-[10vw] h-[8vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              7
            </div>
            <div
              onClick={handleClickArea}
              className={`area8 area z-50 flex items-center justify-center border cursor-pointer absolute top-[20vh] left-[20vw] w-[9vw] h-[9vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              8
            </div>
            <div
              onClick={handleClickArea}
              className={`area9 area z-50 flex items-center justify-center border cursor-pointer absolute top-[19vh] left-[29vw] w-[12vw] h-[12vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              9
            </div>
            <div
              onClick={handleClickArea}
              className={`area10 area z-00 flex items-center justify-center border cursor-pointer absolute top-[5vh] right-[5vw] w-[40vw] h-[80vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              10
            </div>
            <div
              onClick={handleClickArea}
              className={`area11 area z-50 flex items-center justify-center border cursor-pointer absolute top-[5vh] left-[27vw] w-[5vw] h-[12vh] bg-slate-50 hover:text-black hover:border-violet-500 hover:bg-zinc-100 transition-all`}
            >
              11
            </div>
          </>
        )}
      </main>
    </>
  );
}

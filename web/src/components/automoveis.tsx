import { ChevronDown, ChevronLeft } from "nextjs-components/src/icons";
import { Button } from "nextjs-components";
import { useState } from "react";
import { AutomovelProps, LocacaoProps } from "../pages/types";

const AutomovelItem = ({
  loc,
  setNextStep,
  setLocSelected,
}: {
  loc: LocacaoProps;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setLocSelected: React.Dispatch<React.SetStateAction<LocacaoProps>>;
}) => {
  const formatBRL = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleClickVender = () => {
    setNextStep(true);
    setLocSelected(loc);
  };
  return (
    <div
      className={`
  flex items-center flex-col gap-2  p-3 border cursor-pointer 
 hover:text-black  hover:bg-zinc-100 transition-all`}
    >
      <div className="flex justify-between w-full gap-1">
        <div className="flex  w-max">{loc.automovel.modelo}</div>
        <div className="flex ml-auto mr-2">Quantidade: {loc.quantidade}</div>
        <div className="flex ml-auto mr-2">
          {formatBRL(loc.automovel.preco)}
        </div>
        <div className="flex">
          <Button onClick={handleClickVender}>Vender</Button>
        </div>
      </div>
    </div>
  );
};

export { AutomovelItem };

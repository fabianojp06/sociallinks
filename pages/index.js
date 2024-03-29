import React from "react";
import Prismic from "prismic-javascript";
import Head from "next/head";

const Index = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: data.corfundo,
        color: data.cortexto,
      }}
    >
      <Head>
        <title>{data.pagetitle}</title>
      </Head>
      <div className="w-1/2 mx-auto text-center">
        <h1 className="font-bold text-4xl p-8">{data.title}</h1>
        <img
          src={data.logob.url}
          className="mx-auto rounded-full shadow-2xl w-1/4"
        />

        {data.body.map((item) => {
          if (item.slice_type === "secao") {
            return (
              <h2 className="font-bold text-2xl pt-4">{item.primary.nome}</h2>
            );
          }
          if (item.slice_type === "link") {
            return (
              <div>
                <a
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block
                  border border-light-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
                  
                  href={item.primary.destino.url}
                >
                  {item.primary.texto_do_botao}
                </a>
              </div>
            );
          }
         // if (item.slice_type === "imagem") {
           // return <img src={item.primary.imagem.url} className="mx-auto" />;
          //}
          return null;
        })}
        <div className="text-center py-4">
          Todos os direitos reservados do{" "}
          <a href="https://lugartechonline.minhalojanouol.com.br/">Lugar Tech</a>
          <br />
          Código-fonte disponível em:{" "}
          <a href="https://lugartechonline.minhalojanouol.com.br/">
            Lugar Tech
          </a>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("server");
  const client = Prismic.client("https://fgarcia.cdn.prismic.io/api/v2");
  const centralLinks = await client.getSingle("centrallinks");
  console.log(centralLinks);
  return {
    props: {
      data: centralLinks.data,
    },
  };
}

export default Index;

import React from "react";
import Prismic from "prismic-javascript";
import Head from 'next/head';

const Index = ({ data }) => {
    return(
         <div
            className="w-1/2 mx-auto text-center box-border md:box-content"
            style={{
                backgroundColor: data.corfundo,
                color: data.cortexto,
            }}
        >
            <head>
                <title>{data.pagetitle}</title>
            </head>
        <h1 className="font-bold text-4xl p-4">{data.title}</h1>
        <img src={data.logo.url} className="mx-auto rounded-full shadow-4xl w-1/4"/>
        
            {data.body.map((item) => {
                if(item.slice_type === 'secao'){
                return <h2 className="font-bold text-4x1 pt-4">{item.primary.nome}</h2> 
                }
                if(item.slice_type === 'link'){
                return (
                    <div >
                    <a
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2 inline-block"
                    href={item.primary.destino.url}>
                        {item.primary.texto_do_botao}</a>
                    </div>
                );
             }
             //if(item.slice_type === 'imagem'){
            //     return <img src={item.primary.imagem.url}/>
            // }
            //return<pre>{JSON.stringify()}</pre>;
                return null;
            })}
            <div className="py-6">
            Projeto criado por Fabiano Garcia<a href='http://www.fsgitconsultoria.com.br/'><p>Acesse meu site</p></a></div>
            </div>
        );
};

//<pre>{JSON.stringify(data, null, 2)}</pre>


export async function getServerSideProps() {
    console.log("server");
    const client = Prismic.client("https://fgarcia.cdn.prismic.io/api/v2");
    const centralLinks = await client.getSingle("centrallinks");
    console.log(centralLinks);
    return{ 
        props: {
            data: centralLinks.data
        } }; 
}

export default Index;

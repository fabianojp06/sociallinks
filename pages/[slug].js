
import React, { useEffect } from "react";
import Prismic from 'prismic-javascript';
import { useRouter } from 'next/router';
import Head from 'next/head';

const RedirectTo = () => {
    const router = useRouter();
    useEffect(() =>{
        setTimeout (() =>{
         router.push("/")
        }, 2000);
    },[]);
    return(
        <div className="w-1/2 mx-auto text-center py-4">
            <head>
                <title>Página não encontrada</title>
            </head>
            <h1 className="font-bold text-4xl ">Destino não encontrado.</h1>
            <p>Você será redirecionado para a Central de Links...</p>
            </div>
        );   
};

export async function getServerSideProps( { params, res } ) {
    const client = Prismic.client("https://fgarcia.cdn.prismic.io/api/v2");
    const link = await client.getByUID("shorlink", params.slug);
    if(link){
        res.statusCode = 301 //conteudo movido permanentemente
        res.setHeader("Location", link.data.destino.url) //redireciona
        res.end();
        return;
    }
    console.log(link)
    return{
        props:{}
    };
}

    export default RedirectTo;
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzcyMzkzMCwiZXhwIjoxOTU5Mjk5OTMwfQ.HqEuO75DtVWNLYQqTgQeGH6_9YOQH1qoEP7z-w8t1uk';
const SUPABASE_URL      = 'https://xeymffvvmdykuesqktir.supabase.co';
const supabaseClient    = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            // console.log('Houve uma nova mensagem');
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

// fetch(`${SUPABASE_URL}/rest/v1/messages?select=*`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'apikey': SUPABASE_ANON_KEY,
//         'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
//     }
// })
//     .then((res) => {
//         return res.json();
//     })
//     .then((response) => {
//         console.log(response);
//     });
// mesma coisa que isso \/, só q simplificado
// const dadosDoSupabase = supabaseClient
// .from('mensagens')
// .select('*')
// .then((dados) => {
//     console.log('Dados da consulta: ', dados);
// });

// React.useEffect(() => {
//     supabaseClient
//         .from('mensagens')
//         .select('*')
//         .then( ({data}) => {
//             console.log('Dados da consulta: ', data);
//         });
// }, [listaDeMensagens]); 
// console.log(dadosDoSupabase);

export default function ChatPage() {
    // // Usuário
    // - Usuário digita no campo textarea
    // - Aperta enter para enviar
    // - Tem que adicionar o texto na listagem
    // //Dev
    // - [X] Campo criado
    // - Vamos usar o onChange usa o useState (ter if para caso seja enter pra limpar a variável)
    // - Lista de mensagens 
    // pra teste: (mas daí tirar o  setListaDeMensagens(data); do useEffect do supabaseClient )
    // const [listaDeMensagens, setListaDeMensagens] = React.useState([
    //     {
    //         id: 1,
    //         de: 'amandasabrina',
    //         texto: ':sticker: http://2.bp.blogspot.com/-d21tffsTIQo/U_H9QjC69gI/AAAAAAAAKqM/wnvOyUr6a_I/s1600/Pikachu%2B2.gif'
    //     }
    // ]);

    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    // console.log('userLogado: ', usuarioLogado, '\nrouter query: ', roteamento.query);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta: ', data);
                setListaDeMensagens(data);
            });

            escutaMensagensEmTempoReal((novaMensagem) => {
                console.log('Nova mensagem ', novaMensagem);
                // setListaDeMensagens([
                //     novaMensagem,
                //     ...listaDeMensagens
                // ]);
                // teve q fazer essa mudança pq, pra vc garantir que vc vai ter a lista de mensagem atualizada, ao invés de passar o array, colocar no return pois o react tirou uma 'foto' inicial e o array tava vazio inicialmente
                // Caso quiser reusar um valor de referencia (objeto/array), passar uma função pro setState
                setListaDeMensagens((valorAtualDaLista) => {
                    return [
                        novaMensagem,
                        ...valorAtualDaLista
                    ]
                })
            });
    }, []); 
    // ele fica observando essa variavel passada no array. assim q ela mudar, roda oq ta dentro do useEffect

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            // de: 'amandasabrina',
            de: usuarioLogado,
            texto: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([
                // tem que ser um objeto com os MESMOS CAMPOS q vc escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                // setListaDeMensagens([
                //     data[0],
                //     ...listaDeMensagens
                // ]);
            });

        // setListaDeMensagens([
        //     mensagem,
        //     ...listaDeMensagens
        // ]);

        setMensagem('');
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >


                    <MessageList mensagens={listaDeMensagens} />
                    {/* Lista de msgs: {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const novoValor = event.target.value;
                                setMensagem(novoValor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/* CallBack - chamada de retorno - ou seja, quando alguma coisa q vc queria terminou, ele vai executar a função q vc passou */}
                        <ButtonSendSticker 
                            // \/ chama-se interceptação, significa prover pra quem ta usando o seu componente (ex, se vc instala algo, vc n precisa saber o código dele)
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(`:sticker: ${sticker}`);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* {mensagem.texto} */}

                        {/* Condicional: ou seja, retornará um booleano*/}
                        {/* {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {/* {mensagem.texto.startsWith(':sticker:')
                        ? (
                            "É sticker"
                        )
                        : (
                            mensagem.texto
                        )} */}

                        {mensagem.texto.startsWith(':sticker')
                        ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')} />
                        )
                        : (
                            mensagem.texto
                        )}
                    </Text>
                );
            })}

        </Box>
    )
}
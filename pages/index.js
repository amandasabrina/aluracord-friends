import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import React from 'react';


function Titulo(props) {
    // console.log(props);
    const Tag = props.tag ||'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary['1100']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}

async function buscaApiGithub(username, setCreated) {
    await fetch(`https://api.github.com/users/${username}`).then(r => r.json()).then(r=>{
        if(!r.message) { //se tiver param message é q n achou user, "not found" de retorno
            setCreated(new Date(r.created_at).toLocaleDateString());
        } else {
            setCreated('');
        }
    });
}

// Componente React
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }

// export default HomePage

// export default function PaginaInicial() {
//     const username = 'peas';
  
//     return (
//       <>
//         <GlobalStyle />
//         <Box
//           styleSheet={{
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             backgroundColor: appConfig.theme.colors.primary[500],
//             backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
//             backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
//           }}
//         >
//           <Box
//             styleSheet={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexDirection: {
//                 xs: 'column',
//                 sm: 'row',
//               },
//               width: '100%', maxWidth: '700px',
//               borderRadius: '5px', padding: '32px', margin: '16px',
//               boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
//               backgroundColor: appConfig.theme.colors.neutrals[700],
//             }}
//           >
//             {/* Formulário */}
//             <Box
//               as="form"
//               styleSheet={{
//                 display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                 width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
//               }}
//             >
//               <Titulo tag="h2">Boas vindas de volta!</Titulo>
//               <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
//                 {appConfig.name}
//               </Text>
  
//               <TextField
//                 fullWidth
//                 textFieldColors={{
//                   neutral: {
//                     textColor: appConfig.theme.colors.neutrals[200],
//                     mainColor: appConfig.theme.colors.neutrals[900],
//                     mainColorHighlight: appConfig.theme.colors.primary[500],
//                     backgroundColor: appConfig.theme.colors.neutrals[800],
//                   },
//                 }}
//               />
//               <Button
//                 type='submit'
//                 label='Entrar'
//                 fullWidth
//                 buttonColors={{
//                   contrastColor: appConfig.theme.colors.neutrals["000"],
//                   mainColor: appConfig.theme.colors.primary[500],
//                   mainColorLight: appConfig.theme.colors.primary[400],
//                   mainColorStrong: appConfig.theme.colors.primary[600],
//                 }}
//               />
//             </Box>
//             {/* Formulário */}
  
  
//             {/* Photo Area */}
//             <Box
//               styleSheet={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 maxWidth: '200px',
//                 padding: '16px',
//                 backgroundColor: appConfig.theme.colors.neutrals[800],
//                 border: '1px solid',
//                 borderColor: appConfig.theme.colors.neutrals[999],
//                 borderRadius: '10px',
//                 flex: 1,
//                 minHeight: '240px',
//               }}
//             >
//               <Image
//                 styleSheet={{
//                   borderRadius: '50%',
//                   marginBottom: '16px',
//                 }}
//                 src={`https://github.com/${username}.png`}
//               />
//               <Text
//                 variant="body4"
//                 styleSheet={{
//                   color: appConfig.theme.colors.neutrals[200],
//                   backgroundColor: appConfig.theme.colors.neutrals[900],
//                   padding: '3px 10px',
//                   borderRadius: '1000px'
//                 }}
//               >
//                 {username}
//               </Text>
//             </Box>
//             {/* Photo Area */}
//           </Box>
//         </Box>
//       </>
//     );
//   }

export default function PaginaInicial() {
    // const username = 'amandasabrina';
    const [username, setUsername] = React.useState('amandasabrina');
    const roteamento = useRouter();
    const [disabled, setDisabled] = React.useState(false);
    const [created, setCreated] = React.useState('');
    let espera = null;
    // console.log(roteamento);

    // "2019-10-22T14:29:26Z"
    // buscaApiGithub(username, setCreated);
    
    return (
        <>
            <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingTop: '65px',
                backgroundColor: appConfig.theme.colors.primary['050'],
                // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                backgroundImage: 'url(https://wallpapercave.com/wp/wp8896750.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: {
                    xs: 'column',
                    sm: 'row',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }}
            >
            {/* Formulário */}
            <Box
                as="form"
                onSubmit={function(event) {
                    event.preventDefault();
                    roteamento.push('/chat');
                    // window.location.href = '/chat';
                }}
                styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                }}
            >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
            </Text>

            {/* <input 
                type="text"
                value={username}
                id="texte"
                onChange={function handler(event) {
                    console.log('user digitou: ', event.target.value);
                    //onde ta o valor?
                    const valor = event.target.value;
                    // trocar o valor da variavel
                    // através do React e avise quem precisa
                    setUsername(valor);
                }}
            /> */}
            <TextField
                fullWidth
                styleSheet={{
                    fontWeight: 'bold'
                }}
                textFieldColors={{
                    neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary["1100"],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    },
                }}
                value={username}
                onChange={function handler(event) {
                    // console.log('user digitou: ', event.target.value);
                    //onde ta o valor?
                    const novoUsername = event.target.value;
                    // trocar o valor da variavel
                    // através do React e avise quem precisa
                    novoUsername.length < 2 ? setDisabled(true) : setDisabled(false);
                    setUsername(novoUsername);
                    clearTimeout(espera);
                    espera = setTimeout(() => {
                        buscaApiGithub(novoUsername, setCreated);
                    }, 1000);
                }}
            />
            <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary["1100"],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary["1200"],
                }}
                
            />
            </Box>
            {/* Formulário */}


            {/* Photo Area */}
            <Box
                styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
                }}
            >
            <Image
                styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
            />
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    textAlign: 'center'
                }}
                >
                <p>{username}<br/>{created}</p> 
                
            </Text>
            </Box>
                {/* Photo Area */}
            </Box>
        </Box>
        </>
    );
}
  

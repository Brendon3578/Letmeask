<!-- Tutorial feito a partir do projeto: https://github.com/EddyPBR/letmeask/tree/main/.github/firebase  -->

<h2 align="center">
    <img src="../firebase_icon.svg" width="32px">
    Configurações do Firebase
</h2>

---

É necessário fazer as seguintes configurações dentro do **Firebase** para iniciar a nossa aplicação:

---

Depois que você fizer o login siga os passos a seguir:

## Passo-a-passo
- No menu superior clique em "ir para o console", vai carregar uma nova página;
- Agora clique em "adicionar projeto", e informe o nome (Ex.: letmeask), e continue;
- Desative o google analitcs e clique em "criar projeto", aguarde e continue, aguarde mais uma vez e você será redirecionado;
- No menu lateral esquerdo na parte de "criação" clique em "authentication";
- Agora vá na aba "Sign-in method" e selecione "Google", agora clique no botão de ativar, informe seu email (pode ser o que você fez login) e salve;
- No menu lateral esquerdo novamente vá em "Realtime database";
- Agora clique em "criar banco de dados", será carregada uma box, agora clique em proxima, deixe a opção "modo bloqueado" ativado e clique em ativar e aguarde;
- No menu lateral esquerdo clique em "Visão geral do projeto", agora nos botões do banner clique em "web", na nova caixa de texto coloque o nome do projeto (Ex.: letmeask-web) deixe a opção "firebase hosting" desativada e clique em "Registrar app" e aguarde;
- Será mostrada uma box com códigos, copie os valores dos campos que estão dentro da variavel "firebaseConfig" e no arquivo ".env.example" do seu projeto;
- Depois renomeie `.env.example` para `.env.local`

Pronto, seu firebase esta configurado.

## Configuração do Realtime Database

Por fim, é necessário apenas configurar as permissões e regras do banco de dados do firebase. No menu lateral do firebase a esquerda clique em **Realtime Database**, agora selecione a aba **Regras**, dentro box com o JSON das regras copie e cole o seguinte:

```json
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"  
          }
        }
      }
    },
  	"userRooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"
      }
    }
  }
}
```

Agora, apenas inicie o projeto com `npm start` ou `yarn start` e faça bom proveito do projeto. 🎉🎉✨

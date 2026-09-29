import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  ImperialScript_400Regular,
} from "@expo-google-fonts/imperial-script";
import {useAudioPlayer} from "expo-audio";


/*opção 1 de array*/
const frasesMotivacionais = [
  "Grandes coisas começam com pequenos passos.",
  "Hoje pode ser o começo de algo incrível.",
  "Confie mais no seu processo.",
  "Persistência vence o talento quando o talento desiste.",
  "Uma boa oportunidade está mais perto do que parece.",
  "Seu esforço de hoje será seu resultado amanhã.",
  "Nem todo bug é um problema. Às vezes é uma feature.",
  "Continue. Até o código perfeito começou com um erro.",
  "A sorte ajuda quem também faz o commit.",
  "Respire. Salve. Teste de novo.",
];

/*opção 2 de array*/
const frasesDesmotivacionais = [
  "Jamais pense em desistir, desista antes de pensar.",
  "A vida te derruba hoje preparando para a queda de amanhã.",
  "É hora de esquecer os erros do passado e começar a planejar os erros do futuro.",
  "Você é único. Igual a todo mundo.",
  "Trabalhe enquanto eles dormem e descubra que eles acordaram mais ricos que você.",
];

export default function App() {
  /*so pra definir fontes*/
  const [fontesCarregadas] = useFonts({
    ImperialScript_400Regular,
  });

  /*useStates*/
  const [modo, setModo] = useState("motivacional");
  const [frase, setFrase] = useState("");
  const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState(false);
  const somQuebra= useAudioPlayer (require("./assets/crack_0_5s.mp3"))

  /*so pra definir fonte*/
  if (!fontesCarregadas) {
    return null;
  }

  /*funcao pra abrir o biscoito de acordo com o modo dele*/
  function abrirBiscoito() {
    const frases =
      modo === "motivacional" ? frasesMotivacionais : frasesDesmotivacionais;

      /*se n tiver nada de indice no array, da erro*/
    if (frases.length === 0) {
      setErro(true);
      return;
    }

    const indice = Math.floor(Math.random() * frases.length);
    const fraseSorteada = frases[indice];
    frases.splice(indice, 1); /*remover a frase dps de usar*/

    somQuebra.seekTo(0);
    somQuebra.play();
    setFrase(fraseSorteada);
    setAberto(true);
    setErro(false);
  }

  /*funcao pra fechar ele dnv*/
  function voltarBiscoito() {
    setFrase("");
    setAberto(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Biscoito da Sorte</Text>

      <View style={styles.modos}>
        <Pressable
          style={[styles.modo, modo === "motivacional" && styles.modoAtivo]}
          onPress={() => {
            setModo("motivacional");
            setAberto(false);
          }}
        >
          <Text
            style={[
              styles.textoModo,
              modo === "motivacional" && styles.textoModoAtivo,
            ]}
          >
            Motivacionais
          </Text>
        </Pressable>

        <Pressable
          style={[styles.modo, modo === "desmotivacional" && styles.modoAtivo]}
          onPress={() => {
            setModo("desmotivacional");
            setAberto(false);
          }}
        >
          <Text
            style={[
              styles.textoModo,
              modo === "desmotivacional" && styles.textoModoAtivo,
            ]}
          >
            Desmotivacionais
          </Text>
        </Pressable>
      </View>

      {!aberto ? (
        <>
          <Pressable onPress={abrirBiscoito}>
            <Image
              source={require("./assets/biscoito.svg")}
              style={styles.imagem}
            />
          </Pressable>

 {/* 2 opções de mensagens- se o erro estiver como true, mensagem de erro. se estiver como false, aparece pra quebrar o biscoito */}
          {erro ? (
            <Text style={styles.erro}>As mensagens acabaram</Text>
          ) : (
            <Text style={styles.instrucao}>Toque no biscoito para quebrar</Text>
          )}
        </>
      ) : (
        <>
          <Image
            source={require("./assets/biscoito-quebrado.svg.png")}
            style={styles.imagem}
            resizeMode="contain"
          />

          <View style={styles.caixaFrase}>
            <Text style={styles.frase}>"{frase}"</Text>
          </View>

          <Pressable style={styles.botao} onPress={voltarBiscoito}>
            <Text style={styles.textoBotao}> Voltar</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#feb1ed",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  titulo: {
    fontSize: 55,
    fontFamily: "ImperialScript_400Regular",
    color: "#910242",
    marginBottom: 30,
  },

  modos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  modo: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#910242",
  },

  modoAtivo: {
    backgroundColor: "#910242",
  },

  textoModo: {
    color: "#910242",
    fontWeight: "bold",
  },

  textoModoAtivo: {
    color: "#ffffff",
  },

  imagem: {
    width: 250,
    height: 250,
  },

  instrucao: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    padding: 10,
    width: "120%",
    borderWidth: 3,
    borderColor: "#910242",
    marginHorizontal: 0,
    textAlign: "center",
    color: "#910242",
    marginTop: 100,
  },

  erro: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    padding: 10,
    borderWidth: 3,
    borderColor: "#910242",
    color: "#910242",
    marginTop: 100,
  },

  caixaFrase: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#910242",
  },

  frase: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    fontStyle: "italic",
  },

  botao: {
    backgroundColor: "#910242",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#ffffff",
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
});

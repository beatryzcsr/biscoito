import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// controla e exibe os itens da lista de compras.
function ListaDeItens() {
  const [itens, setItens] = useState(["Maçã", "Banana"]);
  // novoItem acompanha o texto digitado no campo.
  const [novoItem, setNovoItem] = useState("");

  // Remove espaços no começo e no fim e adiciona o produto se não estiver vazio.
  const adicionarItem = () => {
    const item = novoItem.trim();
    if (!item) return;

    // Cria uma nova lista com o produto no final e limpa o campo de texto.
    setItens((itensAtuais) => [...itensAtuais, item]);
    setNovoItem("");
  };

  // Remove da lista o produto que está na posição informada.
  const removerItem = (indiceRemover) => {
    setItens((itensAtuais) =>
      itensAtuais.filter((_, indice) => indice !== indiceRemover),
    );
  };

  return (
    // Permite rolar a tela caso a lista fique maior que o espaço disponível.
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>LISTA DE COMPRAS</Text>

      <View style={styles.main}>
        <Image
          source={require("./assets/elemento.png")}
          style={styles.imagem}
        />
        <View style={styles.top}>
          <Text style={styles.topper}>
            {" "}
            O jeito mais inteligente de fazer supermercado. Suas listas
            personalizadas, organizadas e sempre com você. Pronto para
            começar?{" "}
          </Text>
        </View>

        <View style={styles.add}>
          <Text style={styles.subtitulo}>Adicione seus itens!</Text>
          <View style={styles.adicionar}>
            {/* Campo controlado: seu valor acompanha o estado `novoItem`. */}
            <TextInput
              style={styles.input}
              placeholder="Ex.: Leite"
              value={novoItem}
              onChangeText={setNovoItem}
              onSubmitEditing={adicionarItem}
            />

            {/* Adiciona o produto */}
            <Pressable
              style={styles.btnadd}
              onPress={adicionarItem}
              accessibilityRole="button"
            >
              <Text style={styles.textoBotao}>Adicionar</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.lista}>
          {/* Cria uma linha e um botão de remoção */}
          {itens.map((item, indice) => (
            <View style={styles.linha} key={`${item}-${indice}`}>
              <Text style={styles.item}>{item}</Text>
              <Pressable
                style={styles.btnremover}
                onPress={() => removerItem(indice)}
              >
                {/* Ícone de X para remover o produto. */}
                <FontAwesome6 name="xmark" size={30} color="red" />
              </Pressable>
            </View>
          ))}

          {/* Mostra um aviso quando todos os produtos forem removidos. */}
          {itens.length === 0 && (
            <Text style={styles.vazio}>Sua lista está vazia.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(148, 173, 206, 0.65)",
  },

  titulo: {
    padding: 10,
    margin: 0,
    color: "#183a2b",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
  },

  main: {
    flex: 1,
    margin: 0,
  },

  imagem: {
    width: 160,
    height: 160,
    alignSelf: "center",
    resizeMode: "contain",
  },

  add: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "stretch",
  },

  subtitulo: {
    color: "#183a2b",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  top: {
    margin: 10,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "rgba(143, 182, 232, 0.69)",
    borderWidth: 10,
    borderColor: "#7659eb",
  },
  topper: {
    color: "#383636",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  adicionar: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  input: {
    margin: 10,
    padding: 10,
    minWidth: 0,
    flex: 1,
    height: 50,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "#7e80fc",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#183a2b",
    fontSize: 16,
  },
  btnadd: {
    minHeight: 50,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#292863",
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  lista: {
    gap: 10,
    margin: 10,
  },
  linha: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: "#e0e7df",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  item: {
    flex: 1,
    color: "#26372d",
    fontSize: 17,
  },
  btnremover: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  vazio: {
    paddingVertical: 18,
    color: "#64756a",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ListaDeItens;

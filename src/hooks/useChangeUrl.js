import { useDispatch } from "react-redux";
import { setFilterPockemons } from "../slices/filterArr";
import { useGetPokemonsQuery } from "../api/pokemonApi";

export default function useChangeUrl(type, nameUrl) {
  const dispatch = useDispatch();
  // if (type == "def") {
  //   cahngeNmaeTypeUrl("");
  //   changeNameUrl("item");
  //   return;
  // }
  // cahngeNmaeTypeUrl(type);
  // changeNameUrl(nameUrl);
  const { data: items, isLoading: isItemsLoading } = useGetPokemonsQuery({
    limit: 20,
    offset: 0,
    nameUrl: nameUrl,
    name: type,
  });
  if (nameUrl == "ability") {
    if (!isItemsLoading) {
      let pokemonArr = [];
      items.pokemon.map((elem) => {
        pokemonArr.push(elem.pokemon);
      });
      dispatch(
        setFilterPockemons({
          data: { results: pokemonArr },
          isFilter: true,
          count: pokemonArr.lenght,
        })
      );
    }
  }

  if (nameUrl == "item-category") {
    if (!isItemsLoading) {
      dispatch(
        setFilterPockemons({
          data: { results: items.item },
          isFilter: true,
          count: items.item.lenght,
        })
      );
    }
  }
}

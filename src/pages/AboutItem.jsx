import { useGetPokemonsQuery } from "../api/pokemonApi";
import { useSelector } from "react-redux";

function AboutItem() {
  const itemUrl = useSelector((state) => state.item);

  const { data: item, isLoading } = useGetPokemonsQuery({
    limit: 400,
    offset: 0,
    nameUrl: itemUrl,
    name: "",
  });

  if (isLoading || !item) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  const isPokemon = item?.sprites && item?.stats;

  const isCatalogItem = item?.cost !== undefined;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-6">
        {isPokemon && item.sprites?.front_default && (
          <img
            src={item.sprites.front_default}
            alt={item.name}
            className="w-24 h-24 object-contain"
          />
        )}
        <h1 className="text-4xl font-bold capitalize text-gray-900">
          {item.name}
        </h1>
      </div>

      {isCatalogItem && (
        <>
          <p>
            <strong>Category:</strong> {item.category?.name ?? "N/A"}
          </p>
          <p>
            <strong>Cost:</strong> {item.cost ?? "N/A"}
          </p>
        </>
      )}

      {isCatalogItem && item.attributes?.length > 0 && (
        <InfoSection
          title="Attributes"
          list={item.attributes.map((a) => a.name)}
        />
      )}

      {item.flavor_text_entries && (
        <InfoSection
          title="Flavor Text"
          list={item.flavor_text_entries
            .filter((f) => f.language.name === "en")
            .map((f) => f.text)}
        />
      )}

      {item.effect_entries && (
        <InfoSection
          title="Effects"
          list={item.effect_entries
            .filter((e) => e.language.name === "en")
            .map((e) => e.short_effect)}
        />
      )}

      {item.pokemon && (
        <InfoSection
          title="Pokémon with this ability"
          list={item.pokemon.map((p) => p.pokemon.name)}
        />
      )}

      {item.held_by_pokemon && (
        <InfoSection
          title="Pokémon holding this item"
          list={item.held_by_pokemon.map((p) => p.pokemon.name)}
        />
      )}

      {isPokemon && (
        <InfoSection
          title="Stats"
          list={item.stats.map((s) => `${s.stat.name}: ${s.base_stat}`)}
        />
      )}

      {isPokemon && (
        <InfoSection title="Types" list={item.types.map((t) => t.type.name)} />
      )}
    </div>
  );
}

function InfoSection({ title, list }) {
  if (!list || list.length === 0) return null;
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="p-3 bg-gray-100 rounded-md shadow-inner space-y-1">
        {list.map((text, i) => (
          <p key={i} className="text-gray-700 capitalize">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AboutItem;

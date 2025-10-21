import { useEffect, useState } from "react";
import useGetData from "../hooks/useGateData";

function AboutItem({ href, cesh, setCesh }) {
  const data = useGetData(href, cesh, setCesh);
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    if (data != null) {
      setServerData(data);
    }
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {!serverData ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold capitalize text-center">
            {serverData.name}
          </h1>

          {serverData.flavor_text_entries.find((f) => f.language.name === "en")
            ?.flavor_text && (
            <p className="text-gray-700 text-lg italic border-l-4 border-blue-400 pl-4">
              {
                serverData.flavor_text_entries.find(
                  (f) => f.language.name === "en"
                ).flavor_text
              }
            </p>
          )}
          {serverData.effect_entries.find((e) => e.language.name === "en")
            ?.short_effect && (
            <div className="bg-blue-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-2">Effect</h2>
              <p className="text-gray-800">
                {
                  serverData.effect_entries.find(
                    (e) => e.language.name === "en"
                  ).short_effect
                }
              </p>
            </div>
          )}

          {serverData.pokemon && serverData.pokemon.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Pokémon with this ability
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {serverData.pokemon.map((p, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow p-2 flex flex-col items-center text-center hover:shadow-lg transition"
                  >
                    <span className="font-medium capitalize">
                      {p.pokemon.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      Slot: {p.slot} {p.is_hidden && "(Hidden)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No Pokémon with this ability
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default AboutItem;

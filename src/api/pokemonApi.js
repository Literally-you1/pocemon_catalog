import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pockemonApi = createApi({
  reducerPath: "pockemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (build) => ({
    getPokemons: build.query({
      query: ({ nameUrl, limit, offset, name }) =>
        `${nameUrl}${
          name ? "/" + name + "?" : "?"
        }limit=${limit}&offset=${offset}`,
    }),
    getAllСategoty: build.query({
      query: () => `item-category?limit=4000`,
    }),
    getAllAbility: build.query({
      query: () => `ability?limit=4000`,
    }),
    getAllPokemons: build.query({
      query: () => `item?limit=4000&offset-0`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetAllPokemonsQuery,
  useGetAllСategotyQuery,
  useGetAllAbilityQuery,
} = pockemonApi;

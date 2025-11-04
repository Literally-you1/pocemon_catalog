import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const pockemonApi = createApi({
  reducerPath: "pockemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  tagTypes: ["Pokemon", "Ability", "Category"],
  endpoints: (build) => ({
    getPokemons: build.query({
      query: ({ nameUrl, limit, offset, name }) =>
        `${nameUrl}${
          name ? "/" + name + "?" : "?"
        }limit=${limit}&offset=${offset}`,
      providesTags: ["Pokemon"],
    }),
    getAllСategoty: build.query({
      query: () => `item-category?limit=4000`,
      providesTags: ["Category"],
    }),
    getAllAbility: build.query({
      query: () => `ability?limit=4000`,
      providesTags: ["Ability"],
    }),
    getAllPokemons: build.query({
      query: () => `item?limit=4000&offset-0`,
      providesTags: ["Pokemon"],
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetAllPokemonsQuery,
  useGetAllСategotyQuery,
  useGetAllAbilityQuery,
} = pockemonApi;

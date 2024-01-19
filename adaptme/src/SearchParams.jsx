import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBreedList from "../useBreedList";
import Results from "./Results";
import AdaptedPetContext from "./AdaptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "Reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adaptedPet] = useContext(AdaptedPetContext);

  const [requestsParams, setRequestsParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const results = useQuery(["search", requestsParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? [],
            breed: formData.get("breed") ?? [],
            location: formData.get("location") ?? [],
          };
          setRequestsParams(obj);
        }}
      >
        {adaptedPet ? (
          <div className="pet image-container">
            <img src={adaptedPet.images[0]} alt={adaptedPet.name}></img>
          </div>
        ) : null}
        <label htmlFor="location">
          Location:
          <input name="location" placeholder="location" id="location" />
        </label>
        <label htmlFor="animal">
          Animal:
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            value={animal}
            id="animal"
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed:
          <select disabled={!breeds.length} id="breed" name="">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

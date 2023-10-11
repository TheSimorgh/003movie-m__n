import React, { useState } from "react";

import Label from "../form/Label";
import { renderItem } from "../../utils/helper";
import LiveSearch from "../global/LiveSearch";
import { useSearch } from "../../hooks";
import { search_actor } from "../../api/actor";

const WriterSelector = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const {handleSearch,resetSearch}=useSearch()

  const handleOnSelect = (profile) => {
    setValue("")
    onSelect(profile);
    setProfiles([])
    resetSearch();
  };
  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(search_actor,value,setProfiles)
  };
  return (
    <div>
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        value={value}
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default WriterSelector;

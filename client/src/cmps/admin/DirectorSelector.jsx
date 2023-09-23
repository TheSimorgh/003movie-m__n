import React, { useState } from "react";

import Label from "../form/Label";
import { renderItem } from "../../utils/helper";
import LiveSearch from "../global/LiveSearch";

const DirectorSelector = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleOnSelect = (profile) => {
    onSelect(profile);
  };
  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
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

export default DirectorSelector;

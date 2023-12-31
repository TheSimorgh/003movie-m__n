import React, { useEffect, useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../global/LiveSearch";
// import { results } from "./MovieForm";
import { useNotification, useSearch } from "../../hooks";
import Input from "../form/Input";
import Btn from "../global/Btn";
import { renderItem } from "../../utils/helper";
import { search_actor } from "../../api/actor";

// const cast = [{ actor: id, roleAs: "", leadActor: true }];
const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch } = useSearch();

  const { leadActor, profile, roleAs } = castInfo;


  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")return setCastInfo({ ...castInfo, leadActor: checked });
    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };
  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(search_actor, value, setProfiles);
  };

  const handleSubmit = () => {
    console.log(castInfo);
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing!");
    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    resetSearch();
  };
  // useEffect(() => {
  //   console.log(leadActor);
  // }, [leadActor]);
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        title="Set as lead actor"
        onChange={handleOnChange}
        checked={leadActor}
      />
      <LiveSearch
        // results={results}
        placeholder="Search Profile"
        results={profiles}
        value={profile.name}
        onChange={handleProfileChange}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-gow">
        <Input
          type="text"
          placeholder="Role as"
          name="roleAs"
          className={`${commonInputClasses}  rounded p-1 text-lg border-2`}
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>
      <Btn
        onClick={handleSubmit}
        className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
      >
        Add
      </Btn>
    </div>
  );
};

export default CastForm;

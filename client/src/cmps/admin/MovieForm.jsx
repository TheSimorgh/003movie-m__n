/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import { useNotification } from "../../hooks";
import {
  TagsInput,
  Label,
  Input,
  CastForm,
  ViewAll_Btn,
  LiveSearch,
  LabelWithBadge,
  Submit_Btn,
  DirectorSelector,
  GenresSelector,
  PosterSelector,
  GenresModal,
  CastModal,
  WritersModal,
  Selector,
} from "../../cmps";
import {typeOptions,statusOptions,languageOptions} from "../../utils/options"
export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];
export const renderItem = (result) => {
  return (
    <div key={result.name} className=" flex space-x-2 rounded overflow-hidden ">
      <img src={result.avatar} alt={result.name} className="w-16 h-16" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};
export const img_accept_files = "image/jpg, image/jpeg, image/png";
const MovieForm = ({ busy, onSubmit }) => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);

  const { updateNotification } = useNotification();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };
  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    return setSelectedPosterForUI(url);
  };
  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      // setSelectedPoster(URL.createObjectURL(poster))
      updatePosterForUI(poster);
      console.log(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
  };
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWrites = (profile) => {
    const { writes } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This profile is already selected!"
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;

    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };
  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) setShowWritersModal(false);
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = writers.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) setShowCastModal(false);
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  // const renderItem = (result) => {
  //   return (
  //     <div
  //       key={result.name}
  //       className=" flex space-x-2 rounded overflow-hidden "
  //     >
  //       <img src={result.avatar} alt={result.name} className="w-16 h-16" />
  //       <p className="dark:text-white font-semibold">{result.name}</p>
  //     </div>
  //   );
  // };

  const {
    title,
    storyLine,
    writers,
    cast,
    tags,
    releseDate,
    genres,
    type,
    language,
    director,
    status,
  } = movieInfo;


  const hideWritersModal = () => {
    setShowWritersModal(false);
  };

  const displayWritersModal = () => {
    setShowWritersModal(true);
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };
  // const toggleWritersModal = () => {
  //   setShowWritersModal((prev) => !prev);
  // };

  // const toggleCastModal = () => {
  //   setShowCastModal((prev) => !prev);
  // };
  // const toggleGenresModal = () => {
  //   setShowGenresModal((prev) => !prev);
  // };

  return (
    <>
      <div onSubmit={handleSubmit} className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
              className={`border-b-2 font-semibold text-xl ${commonInputClasses}`}
              placeholder="Title"
            />
          </div>
          <div>
            <Label htmlFor="storyLine">Story line</Label>
            <textarea
              value={storyLine}
              onChange={handleChange}
              name="storyLine"
              id="storyLine"
              className={commonInputClasses + " border-b-2 resize-none h-24"}
              placeholder="Movie storyline..."
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          {/* <DirectorSelector  /> */}
          <div>
            <Label htmlFor="director">Director</Label>

            <LiveSearch
              name="director"
              value={director.name}
              results={results}
              placeholder="Search director profile"
              renderItem={renderItem}
              onSelect={updateDirector}
            />
          </div>

          <div className="">
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>

              <ViewAll_Btn
                // onClick={toggleWritersModal}
                onClick={displayWritersModal}


                visible={writers.length}
              >
                View All
              </ViewAll_Btn>
            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search writers profile"
              renderItem={renderItem}
              onSelect={updateWrites}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAll_Btn 
              onClick={displayCastModal}
              // onClick={toggleCastModal}
               visible={cast.length}>
                View All
              </ViewAll_Btn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>

          {/* 
          <div className="">
            <div className="flex justify-between">
            <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>          
                </div>
          </div> */}
          <div>
            <Label>LiveSearch Cmp test</Label>
            <LiveSearch
              placeholder="Search Profile"
              results={results}
              renderItem={renderItem}
              onSelect={(result) => console.log(result)}
            />
          </div>
          <Input
            name="releseDate"
            value={releseDate}
            onChange={handleChange}
            type="date"
            className={commonInputClasses + " border-2 rounded p-1 w-aut"}
          />

          <Submit_Btn
            type="button"
            busy={busy}
            value={"Upload"}
            onClick={handleSubmit}
          />
        </div>
        <div className="w-[30%] space-y-5 ">
          <PosterSelector
            label="Select poster"
            accept={img_accept_files}
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
          />
          <GenresSelector badge={genres.length}
          //  onClick={toggleGenresModal}
          onClick={displayGenresModal}
           />
          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
        </div>
      </div>
      <WritersModal
        visible={showWritersModal}
        profiles={writers}
        // onClose={()=>setShowWritersModal(false)}
        // onClose={toggleWritersModal}
        onClose={hideWritersModal}
        onRemoveClick={handleWriterRemove}
      />
      <CastModal
        visible={showCastModal}
        casts={cast}
        // onClose={toggleCastModal}
        onClose={hideCastModal}

        onRemoveClick={handleCastRemove}
      />
      <GenresModal
        onSubmit={updateGenres}
         previousSelection={genres}
        visible={showGenresModal}
        // onClose={toggleGenresModal}
        onClose={hideGenresModal}
        onClick={showGenresModal}
      />
      
    </>
  );
};

export default MovieForm;

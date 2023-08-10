const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");
const cloud = require("../config/cloud");
const { sendError } = require("../utils/helpers");
const movie = require("../models/movie");

exports.upload_trailer = async (req, res) => {
  const { file } = req;
  if (!file) return sendError(res, "Video file is missing!");

  const data = await cloud.uploader.upload(file.path, {
    resource_type: "video",
  });
  // console.log(data);
  const { secure_url: url, public_id } = data;
  res.status(201).json({ url, public_id });
};

exports.create_movie = async (req, res) => {
  const { file, body } = req;

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = body;

  const newMovie = new Movie({
    title,
    storyLine,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    newMovie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }

    newMovie.writers = writers;
  }
  console.log(body);
  // const data= await cloud.uploader.upload(file.path,)
  // console.log(data);
  // responsive_breakpoints:[ {
  //   create_derived: true,
  //   max_width: 640,
  //   max_images: 3,
  // }],
  // let data;
  if (file) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloud.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const finalPoster = { url, public_id, responsive: [] };

    const { breakpoints } = responsive_breakpoints[0];
    // console.log(responsive_breakpoints);
    // console.log(responsive_breakpoints.map(e=>console.log(e)));
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        finalPoster.responsive.push(secure_url);
      }
    }
    newMovie.poster = finalPoster;
  }

  await newMovie.save();

  res.status(201).json({
    movie: {
      id: newMovie._id,
      title,
    },
  });
};

exports.update_movie_without_poster = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie Not Found!", 404);

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releseDate = releseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    movie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }

    movie.writers = writers;
  }

  await movie.save();

  res.json({ message: "Movie is updated", movie });
};

exports.update_movie = async (req, res) => {
  const { movieId } = req.params;
  const { file } = req;
  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");
  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie Not Found!", 404);

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title ? title : movie.title;
  movie.storyLine = storyLine ? title : movie.title;
  movie.tags = tags ? tags : movie.tags;
  movie.releseDate = releseDate ? releseDate : movie.releseDate;
  movie.status = status ? status : movie.status;
  movie.type = type ? type : movie.type;
  movie.genres = genres ? genres : movie.genres;
  movie.cast = cast ? cast : movie.cast;
  movie.language = language ? language : movie.language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    movie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }

    movie.writers = writers;
  }
  // update poster
  if (file) {
    // removing poster from cloud if there is any.
    const posterID = movie.poster?.public_id;
    if (posterID) {
      const { result } = await cloud.uploader.destroy(posterID);
      if (result !== "ok") {
        return sendError(res, "Could not update poster at the moment!");
      }
      // uploading poster
      const {
        secure_url: url,
        public_id,
        responsive_breakpoints,
      } = await cloud.uploader.upload(req.file.path, {
        transformation: {
          width: 1280,
          height: 720,
        },
        responsive_breakpoints: {
          create_derived: true,
          max_width: 640,
          max_images: 3,
        },
      });

      const finalPoster = { url, public_id, responsive: [] };

      const { breakpoints } = responsive_breakpoints[0];
      if (breakpoints.length) {
        for (let imgObj of breakpoints) {
          const { secure_url } = imgObj;
          finalPoster.responsive.push(secure_url);
        }
      }

      movie.poster = finalPoster;
    }
  }

  await movie.save();

  res.json({
    message: "Movie is updated",
    movie: {
      id: movie._id,
      title: movie.title,
      poster: movie.poster?.url,
      genres: movie.genres,
      status: movie.status,
    },
    updated_movie:movie
  });
};
exports.delete_movie = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.get_movies = async (req, res) => {
  const movies = await Movie.find({});
  res.json({
    movies,
  });
};
exports.get_movie_update = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.search_movies = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.get_latest_uploads = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.get_single_movie = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.get_related_movies = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.get_top_rated_movies = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};
exports.search_public_movies = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};

exports.test = async (req, res) => {
  console.log(req.body);
  res.json({
    message: 1,
  });
};

// DB has been connected

//req.body
// [Object: null prototype] {
//   tags: [ 'time', 'blood', 'voyage' ],
//   trailer: {
//     url: 'https://res.cloudinary.com/dr9jdotgu/video/upload/v1691473852/kb3xax0khhkf9bjzh0bn.mp4',
//     public_id: 'kb3xax0khhkf9bjzh0bn'
//   },
//   writers: [ '64d02a443855c3dd4f540080', '64d02a4c3855c3dd4f540082' ],
//   genres: [ 'Action', 'Drama' ],
//   storyLine: '12 34 45 4554 454 sds s s dsadsasa s sa das',
//   language: 'english',
//   releseDate: '2022-06-17',
//   status: 'public',
//   type: 'movie',
//   title: '1123',
//   cast: [
//     {
//       actor: '64d00c18d9fc731d7fc3d792',
//       roleAs: 'AABB AABB',
//       leadActor: true
//     }
//   ]
// }
// poster url
// {
//   asset_id: '7900dfe1ea3b6424c06c70740e670cc5',
//   public_id: 'hxkyy8ks2c1pavh4mxng',
//   version: 1691647421,
//   version_id: '532e7eeee9da9fe343579f245b32fb49',
//   signature: '7948315c44b715416898534266939caba977d1da',
//   width: 1280,
//   height: 720,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2023-08-10T06:03:41Z',
//   tags: [],
//   bytes: 112275,
//   type: 'upload',
//   etag: '0be8d6a6c4673b22ad53835a5ebf2a1c',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dr9jdotgu/image/upload/v1691647421/hxkyy8ks2c1pavh4mxng.jpg',
//   secure_url: 'https://res.cloudinary.com/dr9jdotgu/image/upload/v1691647421/hxkyy8ks2c1pavh4mxng.jpg',
//   folder: '',
//   original_filename: '3d7cfc9b24790af82d7530474b99e30a',
//   responsive_breakpoints: [ { breakpoints: [Array] } ],
//   api_key: '264797687512169'
// }

// console.log(responsive_breakpoints);
// console.log(responsive_breakpoints.map(e=>console.log(e)));

// [Object: null prototype] {
//   tags: [ 'time', 'blood', 'voyage' ],
//   trailer: {
//     url: 'https://res.cloudinary.com/dr9jdotgu/video/upload/v1691473852/kb3xax0khhkf9bjzh0bn.mp4',
//     public_id: 'kb3xax0khhkf9bjzh0bn'
//   },
//   writers: [ '64d02a443855c3dd4f540080', '64d02a4c3855c3dd4f540082' ],
//   genres: [ 'Action', 'Drama' ],
//   storyLine: '12 34 45 4554 454 sds s s dsadsasa s sa das',
//   language: 'english',
//   releseDate: '2022-06-17',
//   status: 'public',
//   type: 'movie',
//   title: '1123',
//   cast: [
//     {
//       actor: '64d00c18d9fc731d7fc3d792',
//       roleAs: 'AABB AABB',
//       leadActor: true
//     }
//   ]
// }
// [ { breakpoints: [ [Object], [Object], [Object] ] } ]
// {
//   breakpoints: [
//     {
//       width: 640,
//       height: 360,
//       bytes: 52630,
//       url: 'http://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_640/v1691661799/bztdnje4ohqtc4p2sxpg.jpg',
//       secure_url: 'https://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_640/v1691661799/bztdnje4ohqtc4p2sxpg.jpg'
//     },
//     {
//       width: 541,
//       height: 304,
//       bytes: 26191,
//       url: 'http://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_541/v1691661799/bztdnje4ohqtc4p2sxpg.jpg',
//       secure_url: 'https://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_541/v1691661799/bztdnje4ohqtc4p2sxpg.jpg'
//     },
//     {
//       width: 50,
//       height: 28,
//       bytes: 824,
//       url: 'http://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_50/v1691661799/bztdnje4ohqtc4p2sxpg.jpg',
//       secure_url: 'https://res.cloudinary.com/dr9jdotgu/image/upload/c_scale,w_50/v1691661799/bztdnje4ohqtc4p2sxpg.jpg'
//     }
//   ]
// }
// [ undefined ]

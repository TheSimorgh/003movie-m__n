const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actor");
const { uploadImageToCloud, sendError, formatActor } = require("../utils/helpers");
const cloudinary = require("../config/cloud");
exports.all_actor = async (req, res) => {
    const { pageNo, limit } = req.query;

    const actors=await Actor.find()
    // .sort({createdAt:-1})
    // .skip(parseInt(pageNo)*parseInt(limit))
    // .limit(parseInt(limit));

    res.json({
        actors
      });  
};

exports.single_actor = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendError(res, "Invalid request!");
  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request, actor not found!", 404);
  res.json({ actor: formatActor(actor) });
};

exports.create_actor = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
    // console.log( name, about, gender);
  // console.log(file);
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });
  if(file){
    const {url,public_id}=await uploadImageToCloud(file.path)
    newActor.avatar = { url, public_id };
}

  await newActor.save();
  res.status(201).json({ actor: formatActor(newActor) });
  };




exports.update_actor = async (req, res) => {
  const {name,about,gender}=req.body;
  const {file}=req;
  const {actorId}=req.params;
  if(!isValidObjectId(actorId)) return sendError(res,"Invalid request! ")
  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found!");
  const public_id = actor?.avatar?.public_id;
  if(public_id && file){
    const {result}=await cloudinary.uploader.destroy(public_id)
   if(result !==ok){ return sendError(res,"Could not remove image from cloud!"); }
  }
  if(file){
    const {url,public_id}=await uploadImageToCloud(file.path)
    actor.avatar={ url, public_id };
  }

  actor.name =name ? name : actor.name;
  actor.about =about ? about  :actor.about;
  actor.gender =gender ? gender : actor.gender;

  await actor.save();
  res.status(201).json({ actor: formatActor(actor) });
};
exports.delete_actor = async (req, res) => {
  const { actorId } = req.params;
  if (!isValidObjectId(actorId)) return sendError(res, "Invalid request!");

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found!");
  const public_id = actor.avatar?.public_id;
    // remove old image if there was one!
    if (public_id) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result !== "ok") {
        return sendError(res, "Could not remove image from cloud!");
      }
    }

    await Actor.findByIdAndDelete(actorId);

    res.json({ message: "Record removed successfully.",actor });

};

exports.search_actor = async (req, res) => {
  const { name } = req.query;
  // const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  if (!name.trim()) return sendError(res, "Invalid request!");
  const result = await Actor.find({
    name: { $regex: name, $options: "i" },
  });

  const actors = result.map((actor) => formatActor(actor));
  res.json({ results: actors });
  };
  
  exports.latest_actors = async (req, res) => {
    const result = await Actor.find().sort({ createdAt: "-1" }).limit(12);

    const actors = result.map((actor) => formatActor(actor));
  
    res.json(actors);
  };
  exports.test = async (req, res) => {
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

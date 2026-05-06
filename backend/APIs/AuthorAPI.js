import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorApp=exp.Router()

//Write article (protected route)
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  
//Get articleObj from client
  const articleObj = req.body;
  
//Get user from decoded token
  //console.log(req.user);
  let userEmail = req.user?.email;
  
//Check author
  let author = await UserModel.findById(articleObj.author);
  
//Cross check emails
  if (author.email != userEmail) {
    console.log("authoremail:",author.email)
    console.log("User email:",userEmail)
    return res.status(403).json({ message: "You are not authorized" });
  }
  if (!author) {
    return res.status(404).json({ message: "Invalid author" });
  }

//Create article Document
  const articleDoc = new ArticleModel(articleObj);
  
//Save
  await articleDoc.save();
  
//Send res
  res.status(201).json({ message: "Article published successfully" });
});

//Read own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
  
//Get author id from decoded token
  const authorIdOfToken = req.user?.id;

//Get articles by author id
  const articlesList = await ArticleModel.find({ author: authorIdOfToken });

//Send res
  res.status(200).json({ message: "articles", payload: articlesList });
});

//Edit article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  
//Get author id from decoded token
  const authorIdOfToken = req.user?.id;
  
//Get modified article from client
  const { articleId, title, category, content } = req.body; // {artcileId,title,category,content}
  const modifiedArticle = await ArticleModel.findOneAndUpdate(
    { _id: articleId, author: authorIdOfToken },
    { $set: { title, category, content } },
    { new: true },
  );

//If either artcile id or author not correct
  if (!modifiedArticle) {
    return res.status(403).json({ message: "Not authorized to edit artcile" });
  }
//Send res
  res.status(200).json({ message: "Article modified", payload: modifiedArticle });
});

//Delete article(soft delete)
authorApp.patch("/articles", verifyToken("AUTHOR"), async (req, res) => {
  
//Get author id from decoded token
  const authorIdOfToken = req.user?.id;
  
//Get modified article from client
  const { articleId, isArticleActive } = req.body;
  
//Get article by id
  const articleOfDB = await ArticleModel.findOne({ _id: articleId, author: authorIdOfToken });
  
//Check status
  if (isArticleActive === articleOfDB.isArticleActive) {
    return res.status(200).json({ message: "Article already in the same state" });
  }

  articleOfDB.isArticleActive = isArticleActive;
  await articleOfDB.save();
  
//Send response
  res.status(200).json({ message: "Artcile modified", payload: articleOfDB });
});
const Book = require("../model/Book")

const getAllBooks = async(req,res,next)=>{
    let books;
    try {
        books =  await Book.find();
    } catch (err) {
        console.log(err);
    }
    
    if(!books){
        return res.status(404).json({message:"Book not found"})
    }
    return res.status(200).json({books})

}


const createBook = async(req,res,next)=>{
    const {name, author, description, price, available,image} = req.body
    let book;
    try {
        book = new Book({
            name:name,
            author:author,
            description:description,
            price:price,
            available:available,
            image:image
        });
        await book.save();
    } catch (err) {
        console.log(err);
    }

    if (!book){
        res.status(500).json({message:"Unable to create the book"})
    }
    return res.status(200).json({book})
}

const getBook = async(req,res,next)=>{
    const id =req.params.id
    let book;
    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err);
    }

     if (!book){
        res.status(500).json({message:"Book not found"})
    }
    return res.status(200).json({book})

}

const updateBook = async(req,res,next)=>{
  const id = req.params.id;
  const {name,author,description,price,available,image}=req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id,{
        name:name,
        author:author,
        description:description,
        price:price,
        available:available,
        image:image
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  
  if (!book){
        res.status(404).json({message:"Unable to Update By This Id"})
    }
    return res.status(200).json({book})
}

const deleteBook = async (req,res,next)=>{
    const id  = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id)  
    } catch (err) {
        console.log(err);
    }
    if (!book){
        res.status(404).json({message:"Unable to Delete By This Id"})
    }
    return res.status(200).json({message:"Product successfully deleted"})
}


exports.getAllBooks = getAllBooks;
exports.createBook = createBook;
exports.getBook = getBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
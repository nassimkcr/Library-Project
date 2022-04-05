function findAuthorById(authors, id) {
const result = authors.find(author => author["id"]=== id);
return result
}

function findBookById(books, id) {
  for(let book of books){
    const bookId = book.id;
    if(bookId === id){return book}
  }
}

function partitionBooksByBorrowedStatus(books) {
  const firstArr = []
  const secondArr = []
  for(let book of books){
    const borrowArr = book.borrows
    const statue = borrowArr[0]["returned"]
    if(statue){ firstArr.push(book) }
    else{secondArr.push(book)}
  }
  const result = [secondArr, firstArr]
  return result
 
}

function getBorrowersForBook(book, accounts) {
  const result = []
  const borrows = book["borrows"]
  let counter = 0;
  for(let borrow of borrows){
    for(let account of accounts){
      const statue = borrow["returned"]
      if(account["id"] === borrow["id"] && counter < 10){counter += 1 ;
      account["returned"] = statue
      result.push(account)}
  }
    }
    
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

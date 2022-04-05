function findAccountById(accounts, id) {
const result = accounts.find(account => account["id"] === id);
return result
}

function sortAccountsByLastName(accounts) {
  accounts.sort(function(a, b){
    const lastA = a.name.last.toUpperCase();
    const lastB = b.name.last.toUpperCase();

    return lastA < lastB ? -1 : 1;
     
  })
return accounts;
  
}

function getTotalNumberOfBorrows(account, books) {
  const borrows = books.map( book => book.borrows);
  const accountId = account["id"];
  let total = 0;
  borrows.forEach(borrow => {
    for(obj in borrow){
      if(borrow[obj]["id"] === accountId){total+= 1}
    }
  })

  return total
  
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account["id"]
  
  const booksById = booksBorrowedByAccount(accountId, books);
  
  
  for(let book in booksById){
    for(let author in authors){
      
      if (authors[author]["id"] === booksById[book]["authorId"]){
        const matchingAuthor = {};
        matchingAuthor["author"] = authors[author]
        booksById[book] = {...booksById[book], ...matchingAuthor}
      }
    }
  }
return booksById
  
}
//helper fucntion
const booksBorrowedByAccount = function(accountId, books){
  const booksById = []

  const filtered = books.forEach(book => {
    const borrows = book["borrows"]
    for(let borrow in borrows){
      const id = borrows[borrow]["id"]
      const statue = borrows[borrow]["returned"]
      if(id === accountId && statue === false){booksById.push(book)}
    }
  })

  return booksById
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

function getTotalBooksCount(books) {
  let total = 0;
   books.forEach(book => total += 1)
  return total;
}

function getTotalAccountsCount(accounts) {
  const total = accounts.reduce((sum, account)=> {return sum += 1}, 0)

  return total;

}


function getBooksBorrowedCount(books) {
  let total = 0
  books.forEach(book => {
    let statue = book["borrows"][0]["returned"]
    if(!statue){total += 1}
  })

  return total
}

function getMostCommonGenres(books) {
  let genreArr = []
  
  for(let book in books){
    const genre = books[book]["genre"]
    
    const objKeys = Object.keys(genreArr)

    if(objKeys.includes(genre)){genreArr[genre] += 1}
    else{genreArr[genre] = 1 }
  }

  let sortable = [];

  

  for(let genre in genreArr){
    sortable.push([genre, genreArr[genre]])
  }

  sortable.sort(function(a, b) {
    return  b[1] - a[1] ;
});

let result = []
 for(let sort in sortable){
  if(result.length < 5){
    const obj = {}
    obj["name"] = sortable[sort][0] 
    obj["count"] = sortable[sort][1]
  
    result.push(obj)
  }
  

}

return result


}

function getMostPopularBooks(books) {
  result = []
  for(let book in books){
    const borrows = books[book]["borrows"]
    const length = borrows.length
    
    const obj = {}
    obj["name"] = books[book]["title"]
    obj["count"] = length
    result.push(obj)
  }

  result.sort((a, b)=>{
    return b["count"] - a["count"]
  })

  while(result.length > 5){
    result.pop()
  }

  return result;
}

function getMostPopularAuthors(books, authors) {
  let result = []
  for(let author in authors){
    
    const authorId = authors[author]["id"]
    let counter = 0
    for(let book in books){
      if(books[book]["authorId"] === authorId){
        const borrows = books[book]["borrows"]
        counter = borrows.length;
        const obj = {}
        const name = authors[author]["name"]['first'] + " " + authors[author]["name"]['last']
        obj["name"] = name
        obj["count"] = counter
        result.push(obj)
      }
    }
  }
  result.sort((a, b)=> {
    return b["count"] - a["count"]
  })
  
 result = result.filter((obj, index) => index < 5)
  return result
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

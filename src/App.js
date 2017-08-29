import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBookList from './SearchBookList'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
      books:[]
      
     
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books})
      })
  }
  
  updateBook = (book, shelf) => {
     
      const books = this.state.books
      
      this.setState({ books })
      console.log(books)

      BooksAPI.update(book, shelf)
          .then((books) => {
              let updatedBook = this.state.books.map(b => {
                  if (b.id === book.id)
                      b.shelf = shelf
                  console.log(books)
                  return b
              })
              this.setState({ books: updatedBook })
              console.log(books)
          })
         
          .catch((err) => (
              console.log(err)))

      
  }

 


    


  render() {

      const { books } = this.state
     
     


      return (
          <div>
              <Route exact path='/' render={() => (
                  <div>
                      <div className="list-books">
                          <div className="list-books-title">
                              <h1>MyReads</h1>
                          </div>
                          < BookShelf
                              title='Currently Reading'
                              updateBook={this.updateBook}                    
                          books={books.filter((book) =>  book.shelf  === 'currentlyReading')}
                      />
                      < BookShelf
                              title='Wants To Read'
                              updateBook={this.updateBook}
                          books={books.filter((book) => book.shelf === 'wantToRead')}
                      />
                      < BookShelf
                              title='Read'
                              updateBook={this.updateBook}
                          books={books.filter((book) => book.shelf === 'read')}
                      />
                          </div>
                  </div>
              ) } />
              <Route path='/search' render={() => (
                  <SearchBookList
                     updateBook={this.updateBook}
                      
                />
              )} />
          </div>
      )
  }
}

export default BooksApp

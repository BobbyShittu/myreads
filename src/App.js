import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBookList from './SearchBookList'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
      books:[],
      searchedBooks:[]
     
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books})
      })
  }

  searchQuery = (event) => {
      if (event.target.value !== '') {
          BooksAPI.search(event.target.value).then(
              searchedBooks => {
                  this.setState({ searchedBooks })

                  let idMatch = this.state.books.map(a => this.state.searchedBooks.map(b => {
                      if (b.id === a.id) {
                          b.shelf = a.shelf
                      }

                      return b
                  }))
                  this.setState({ searchedBooks })

                  console.log(this.state.searchedBooks.length);
              })

      }
  }

  updateBook = (book, shelf) => {

      const booksInState = this.state.searchedBooks.map(b => {
          if (b.id === book.id)
              b.shelf = shelf
          return b
      })
      console.log('state after updating')
      console.log(this.state);
      this.setState({ searchedBooks : booksInState })


      let books = this.state.books.map(b => {
          if (b.id === book.id)
              b.shelf = shelf
          return b
      });

      this.setState({ books })

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
       this.setState({ books })
  }

 


    


  render() {

      const { books } = this.state
      const { searchedBooks } = this.state
     


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
                              books={books.filter((book) => book.shelf === 'currentlyReading')}
                              searchedBooks={searchedBooks}
                      />
                      < BookShelf
                              title='Wants To Read'
                              updateBook={this.updateBook}
                              books={books.filter((book) => book.shelf === 'wantToRead')}
                              searchedBooks={searchedBooks}
                      />
                      < BookShelf
                              title='Read'
                              updateBook={this.updateBook}
                              books={books.filter((book) => book.shelf === 'read')}
                              searchedBooks={searchedBooks}
                      />
                          </div>
                  </div>
              ) } />
              <Route path='/search' render={() => (
                  <SearchBookList
                      updateBook={this.updateBook}
                      searchQuery={this.searchQuery}
                      searchedBooks={searchedBooks}
                      books={books}
                      
                />
              )} />
          </div>
      )
  }
}

export default BooksApp

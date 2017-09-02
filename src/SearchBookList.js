import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
//import * as BooksAPI from './BooksAPI'




class SearchBookList extends Component {
  


    handleChange(book, event) {
        this.props.updateBook(book, event)
        console.log(event)
        
    }

    render() {
       
        const {  searchedBooks } = this.props
        const { searchQuery } = this.props
       

        return (
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <a href="/" className="close-search"> Close </a> 
                        <div className="search-books-input-wrapper">
                            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <DebounceInput
                                debounceTimeout={325}
                                element="input"
                                type="text"
                                placeholder="Search by title or author"
                                value={searchedBooks.string}
                                onChange={searchQuery}
                            />

                        </div>
                    </div>
                    <div className="search-books-results">
                        {searchedBooks !== undefined && (
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {searchedBooks.map(book =>
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}
                                                    >
                                                    </div>
                                                    <div className="book-shelf-changer">
                                                        <select value={book.shelf || ""} onChange={(event) => this.handleChange(book, event.target.value)}  >
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value=" ">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>)}
                                </ol>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default SearchBookList
import React, { Component } from 'react'
import { Link } from 'react-router-dom'




class BookShelf extends Component {
   
    
    

    handleChange(book, event) {
        this.props.updateBook(book, event)
        console.log(book)
    }

   




    render() {

        const { books } = this.props
        const { title } = this.props
       

        return (
            <div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select value={book.shelf || ""}   onChange={(event) => this.handleChange(book, event.target.value)}  >
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
                                        </li>))}
                                </ol>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div>
                    <Link
                        to='/search'
                        className="open-search"
                    >Add a book</Link>
                </div>
            </div>
        )
    }




} 



export default BookShelf
import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    query: '',
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
            .then(books => {
              this.setState(() => ({
                books
              }))
            })
  }

  handleChange(book, event) {
    const books = [...this.state.books];

    books.filter(b => b === book)
         .map(book => book.shelf = event.target.value);

    this.setState({
      books
    })
  }

  searchBooks = (query) => {
    this.setState(() => ({
      query: query.trim()
    }));

    if (query !== '') {
      BooksAPI.search(query).then(searchedBooks => {
        console.log(searchedBooks);
          this.setState(() => ({
            searchedBooks
          }))
      }).catch(err => console.log("err: " + err));
    }
  }


  render() {
    const { query, books, showSearchPage, searchedBooks } = this.state;

    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.searchBooks(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchedBooks.map((book, i) => (
                    <div className="bookshelf-books" key={i}>
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                        { book.imageLinks !== undefined && (
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        )}
                        <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  ))
                  }
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  {books.map((book, i) => {
                    return book.shelf === "currentlyReading" && (
                    <div className="bookshelf-books" key={i}>
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  )
                  })}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  {books.map((book, i) => {
                    return book.shelf === "wantToRead" && (
                    <div className="bookshelf-books" key={i}>
                    <ol className="books-grid">
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  )
                  })}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  {books.map((book, i) => {
                    return book.shelf === "read" && (
                    <div className="bookshelf-books" key={i}>
                    <ol className="books-grid">
                      <li >
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  )
                  })}
                </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

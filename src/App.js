import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfList from "./components/BookShelfList";
import BookShelf from './components/BookShelf'
import * as BooksAPI from './utils/BooksAPI'
import SearchBook from "./components/SearchBook";
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    Books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({Books: books})
    });
  }

  changeShelf = (event) => {
    BooksAPI.update({id: event.target.id}, event.target.value).then((response) => {
       BooksAPI.getAll().then((books) => {
        this.setState({Books: books})
      });
    });
  }

  render() {
    const { Books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title='Currently Reading' books={Books.filter((book) => book.shelf === 'currentlyReading')} onChangeShelf={this.changeShelf} />
                <Bookshelf title='Want to Read' books={Books.filter((book) => book.shelf === 'wantToRead')} onChangeShelf={this.changeShelf} />
                <Bookshelf title='Read' books={Books.filter((book) => book.shelf === 'read')} onChangeShelf={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path='/search' render={({history})=>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}
export default BooksApp


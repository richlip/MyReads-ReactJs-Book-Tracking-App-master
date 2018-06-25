import React from 'react'
import * as BooksAPI from './components/BooksAPI'
import './App.css'
//import BookShelfList from "./components/BookShelfList"
import Bookshelf from './components/BookShelf'
import SearchBook from './components/SearchBook'
import {Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {Books: []}

//Load books
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

        /**check category - maybe refinement
        /*Login for saving "myreads"
        /*api to book directory - https://developers.google.com/books/docs/v1/using
        /* api key *************x2K62xXut9MUql1savyawBES43ao
        **/

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
              <Link to='/SearchBook'>Add a book</Link>
            </div>
          </div>
        )}
        />
        
        <Route path='/SearchBook' render={({history})=>(
         <SearchBook onShelfSelect={(event)=>{
            this.changeShelf(event)
            history.push('/')
          }}/>        
          )}
        />
      </div>
    )
  }
}
export default BooksApp


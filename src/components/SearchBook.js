import React, {
    Component
} from 'react'
import {
    Link
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {

    state = {
        searchedBooks: []
    }

    search = (event) => {
        if (event.target.value.length < 1) {
            return true;
        }

        BooksAPI.search(event.target.value, 25).then((books) => {
            if (books.error === undefined) {
                this.setState({
                    searchedBooks: books
                });
            } else {
                this.setState({
                    searchedBooks: []
                });
            }
        });
    }

    render() {
        const {
            searchedBooks
        } = this.state;
        return ( <
            div className = "search-books" >
            <
            div className = "search-books-bar" >
            <
            Link className = "close-search"
            to = "/" > Close < /Link> <
            div className = "search-books-input-wrapper" >
            <
            input type = "text"
            placeholder = "Search by title or author"
            onChange = {
                this.search
            }
            /> <
            /div> <
            /div> <
            div className = "search-books-results" >
            <
            ol className = "books-grid" > {
                searchedBooks.map((book) => ( <
                    Book key = {
                        book.id
                    }
                    book = {
                        book
                    }
                    onChangeShelf = {
                        this.props.onShelfSelect
                    }
                    />
                ))
            } <
            /ol> <
            /div> <
            /div>
        )
    }
}
export default SearchBook